'use client';
import { useEffect, useState, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminApplicantDetailHeroSection } from '@/components/admin/AdminApplicantDetailHeroSection';
import { AdminApplicantDetailMainSection } from '@/components/admin/AdminApplicantDetailMainSection';
import { colorClasses } from '@/lib/colors';
import { getJobApplicantsUseCase, updateJobApplicationStatusUseCase } from '@/use-cases';
import type {
  AdminJobApplication,
  JobApplicationStatus,
} from '@/models/admin/job-applicants.model';

interface AdminApplicantDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminApplicantDetailPage({
  params,
}: AdminApplicantDetailPageProps) {
  const { id: applicantId } = use(params);
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('jobId') ?? '';
  const [application, setApplication] = useState<AdminJobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const applicantName =
    application?.applicant?.full_name?.trim() ||
    application?.employee_profile_id ||
    null;
  const jobTitle = application?.job?.title ?? null;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    {
      label: 'Candidatos',
      href: jobId ? `/admin/applicants?jobId=${encodeURIComponent(jobId)}` : '/admin/applicants',
    },
    { label: 'Detalle del Candidato' },
  ];

  useEffect(() => {
    const fetchApplication = async () => {
      if (!jobId) {
        setError('El ID del trabajo es requerido para ver el candidato.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getJobApplicantsUseCase.execute(jobId);
        const foundApplication = response.job_applications.find(
          (app) => app.id === applicantId
        );

        if (!foundApplication) {
          setError('No se encontró la aplicación solicitada.');
          setApplication(null);
          return;
        }

        setApplication(foundApplication);
      } catch (err) {
        console.error('Error fetching job application:', err);
        setError(
          err instanceof Error ? err.message : 'Error al cargar el candidato.'
        );
        setApplication(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [jobId, applicantId]);

  const handleUpdateStatus = async (status: JobApplicationStatus): Promise<boolean> => {
    if (!applicantId) return false;

    try {
      setIsUpdating(true);
      setUpdateError(null);
      const updatedApplication = await updateJobApplicationStatusUseCase.execute(
        applicantId,
        status
      );
      
      // Preservar los datos del trabajador (applicant) y del trabajo (job) 
      // que pueden no venir en la respuesta del update
      setApplication((prevApplication) => {
        if (!prevApplication) return updatedApplication;
        
        return {
          ...updatedApplication,
          // Preservar el applicant si no viene en la respuesta actualizada
          applicant: updatedApplication.applicant ?? prevApplication.applicant,
          // Preservar el job completo si no viene en la respuesta actualizada
          job: updatedApplication.job ?? prevApplication.job,
        };
      });
      
      return true;
    } catch (err) {
      console.error('Error updating job application status:', err);
      setUpdateError(
        err instanceof Error
          ? err.message
          : 'Error al actualizar el estado del candidato.'
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <AdminApplicantDetailHeroSection
          breadcrumbs={breadcrumbs}
          applicantName={applicantName}
          jobTitle={jobTitle}
        />
        <AdminApplicantDetailMainSection
          application={application}
          isLoading={isLoading}
          error={error}
          isUpdating={isUpdating}
          updateError={updateError}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
