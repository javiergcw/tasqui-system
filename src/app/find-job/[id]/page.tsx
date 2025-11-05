'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobDetailHeroSection, JobDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { isAuthenticated, getUser } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';

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

  useEffect(() => {
    // Verificar autenticación
    const authenticated = isAuthenticated();
    const currentUser = getUser();
    
    setUser(currentUser);
    
    if (authenticated && currentUser) {
      // Verificar si el usuario ya aplicó a este trabajo
      // TODO: Conectar con API real para verificar aplicación
      checkIfApplied(params.id, currentUser.id);
    } else {
      setIsChecking(false);
    }
  }, [params.id]);

  const checkIfApplied = async (jobId: string, userId: string) => {
    try {
      // TODO: Implementar llamada real a la API
      // Por ahora, simulamos que no ha aplicado
      // const response = await checkApplicationUseCase.execute(jobId);
      // setHasApplied(response.hasApplied);
      setHasApplied(false);
    } catch (error) {
      console.error('Error checking application:', error);
      setHasApplied(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleApplyClick = () => {
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
    if (hasApplied) {
      return;
    }

    // El modal se abrirá desde el componente hijo
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <JobDetailHeroSection />
      
      {/* Main Content Section */}
      <JobDetailMainSection 
        jobId={params.id}
        user={user}
        hasApplied={hasApplied}
        isChecking={isChecking}
        onApplyClick={handleApplyClick}
      />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
