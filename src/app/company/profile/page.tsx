'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { EmployerProfileHeroSection } from '@/components/employer/EmployerProfileHeroSection';
import { EmployerProfileMainSection } from '@/components/employer/EmployerProfileMainSection';
import { Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { companyProfileUseCase, createTicketUseCase } from '@/use-cases';
import type { CompanyProfile } from '@/models';

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await companyProfileUseCase.execute();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching company profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCreateTicket = async (formData: { title: string; description: string }) => {
    setIsCreatingTicket(true);
    
    try {
      const newTicket = await createTicketUseCase.execute({
        title: formData.title,
        description: formData.description
      });
      
      setToast({
        show: true,
        message: 'Ticket creado exitosamente',
        type: 'success'
      });

      return newTicket;
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al crear el ticket',
        type: 'error'
      });
      throw error;
    } finally {
      setIsCreatingTicket(false);
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <EmployerProfileHeroSection />
        <EmployerProfileMainSection 
          profile={profile} 
          isLoading={isLoading}
          onCreateTicket={handleCreateTicket}
          isCreatingTicket={isCreatingTicket}
        />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
