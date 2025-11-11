'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobDetailHeroSection, JobDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { isAuthenticated, getUser } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';
import type { PublicJob } from '@/models/public-web/public-jobs.model';
import { createEmployeeJobApplicationUseCase, checkEmployeeJobApplicationUseCase, publicJobDetailUseCase } from '@/use-cases';
import type { CreateEmployeeJobApplicationRequest } from '@/models/employee/job-application.model';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<LoginUser | null>(null);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [job, setJob] = useState<PublicJob | null>(null);
  const [isJobLoading, setIsJobLoading] = useState<boolean>(true);
  const [jobError, setJobError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar autenticación
    const authenticated = isAuthenticated();
    const currentUser = getUser();
    
    setUser(currentUser);
    
    if (authenticated && currentUser) {
      // Verificar si el usuario ya aplicó a este trabajo
      checkIfApplied(params.id);
    } else {
      setIsChecking(false);
    }

    fetchJobDetails(params.id);
  }, [params.id]);

  const checkIfApplied = async (jobId: string) => {
    try {
      const response = await checkEmployeeJobApplicationUseCase.execute(jobId);
      setHasApplied(response.hasApplied);
    } catch (error) {
      console.error('Error checking application:', error);
      setHasApplied(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleApplyClick = async () => {
    if (!isAuthenticated()) {
      // Redirigir a registro con el rol de empleado
      router.push('/register?role=employee');
      return;
    }

    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'EMPLOYEE') {
      // Si no es empleado, redirigir a registro como empleado
      router.push('/register?role=employee');
      return;
    }

    // Si ya aplicó, no hacer nada (el componente mostrará el mensaje)
    if (hasApplied || isSubmitting) {
      return;
    }

    const payload: CreateEmployeeJobApplicationRequest = {
      job_id: params.id,
      cover_letter: undefined,
    };

    try {
      setIsSubmitting(true);
      await createEmployeeJobApplicationUseCase.execute(payload);
      setHasApplied(true);
    } catch (error) {
      console.error('Error al enviar la postulación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchJobDetails = async (jobId: string) => {
    try {
      setIsJobLoading(true);
      setJobError(null);
      const response = await publicJobDetailUseCase.execute(jobId);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error al obtener el detalle del empleo público:', error);
      setJob(null);
      setJobError('No fue posible cargar la información del empleo.');
    } finally {
      setIsJobLoading(false);
    }
  };

  const heroJobTitle = useMemo(() => {
    if (isJobLoading) {
      return 'Cargando detalles del trabajo...';
    }
    if (jobError || !job) {
      return 'Detalles del Trabajo';
    }
    return job.title || 'Cargo sin título';
  }, [isJobLoading, jobError, job]);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <JobDetailHeroSection
        jobTitle={heroJobTitle}
        companyName={job?.company?.legal_name ?? null}
        location={job?.location ?? null}
      />
      
      {/* Main Content Section */}
      <JobDetailMainSection 
        jobId={params.id}
        user={user}
        hasApplied={hasApplied}
        isChecking={isChecking}
        onApplyClick={handleApplyClick}
        job={job}
        isJobLoading={isJobLoading}
        jobError={jobError}
      />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
