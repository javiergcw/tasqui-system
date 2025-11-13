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
import { getTicketsUseCase as companyGetTicketsUseCase, addTicketNoteUseCase, getCompanyStatsUseCase } from '@/use-cases/company';
import type { CompanyProfile } from '@/models';
import type { Ticket, TicketNote } from '@/models/company/ticket.model';
import type { UpdateCompanyProfileRequest } from '@/models/company/profile.model';
import type { CompanyStatsData } from '@/models/company/stats.model';

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<CompanyStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoadingTickets(true);
        const ticketsData = await companyGetTicketsUseCase.execute();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoadingTickets(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const statsData = await getCompanyStatsUseCase.execute();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleCreateTicket = async (formData: { title: string; description: string }) => {
    setIsCreatingTicket(true);
    
    try {
      const newTicket = await createTicketUseCase.execute({
        title: formData.title,
        description: formData.description
      });
      
      // Actualizar la lista de tickets después de crear uno nuevo
      setTickets([...tickets, newTicket]);
      
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

  const handleRefreshTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const ticketsData = await companyGetTicketsUseCase.execute();
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error refreshing tickets:', error);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleUpdateProfile = async (data: UpdateCompanyProfileRequest): Promise<CompanyProfile> => {
    setIsUpdatingProfile(true);
    
    try {
      const updatedProfile = await companyProfileUseCase.updateProfile(data);
      
      // Actualizar el estado del perfil
      setProfile(updatedProfile);
      
      setToast({
        show: true,
        message: 'Perfil actualizado exitosamente',
        type: 'success'
      });

      return updatedProfile;
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al actualizar el perfil',
        type: 'error'
      });
      throw error;
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleAddTicketNote = async (ticketId: string, note: string): Promise<TicketNote> => {
    setIsAddingNote(true);
    
    try {
      const newNote = await addTicketNoteUseCase.execute(ticketId, { note });
      
      setToast({
        show: true,
        message: 'Nota agregada exitosamente',
        type: 'success'
      });

      // Refrescar la lista de tickets después de agregar una nota
      await handleRefreshTickets();

      return newNote;
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al agregar la nota',
        type: 'error'
      });
      throw error;
    } finally {
      setIsAddingNote(false);
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
          tickets={tickets}
          isLoadingTickets={isLoadingTickets}
          onRefreshTickets={handleRefreshTickets}
          onAddTicketNote={handleAddTicketNote}
          isAddingNote={isAddingNote}
          onUpdateProfile={handleUpdateProfile}
          isUpdatingProfile={isUpdatingProfile}
          stats={stats}
          isLoadingStats={isLoadingStats}
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
