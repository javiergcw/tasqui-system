'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminProfileHeroSection } from '@/components/admin/AdminProfileHeroSection';
import { AdminProfileMainSection } from '@/components/admin/AdminProfileMainSection';
import { colorClasses } from '@/lib/colors';
import { adminProfileUseCase, getAdminTicketsUseCase, updateTicketStatusUseCase, getAdminStatsUseCase, getAdminLeadsUseCase, sendLeadEmailUseCase } from '@/use-cases';
import type { AdminProfile, AdminTicket, AdminStatsData, AdminLead } from '@/models';
import type { SendAdminLeadEmailRequest } from '@/models/admin/lead.model';
import type { TicketStatus } from '@/models/admin/ticket.model';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch profile
      try {
        const profileData = await adminProfileUseCase.execute();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      } finally {
        setIsLoading(false);
      }

      // Fetch tickets
      try {
        const ticketsData = await getAdminTicketsUseCase.execute();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching admin tickets:', error);
      } finally {
        setIsLoadingTickets(false);
      }

      // Fetch stats
      try {
        const statsData = await getAdminStatsUseCase.execute();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setIsLoadingStats(false);
      }

      // Fetch leads
      try {
        const leadsData = await getAdminLeadsUseCase.execute();
        setLeads(leadsData);
      } catch (error) {
        console.error('Error fetching admin leads:', error);
      } finally {
        setIsLoadingLeads(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (data: { display_name?: string; scope_notes?: string; can_publish_direct?: boolean }) => {
    try {
      const updatedProfile = await adminProfileUseCase.update(data);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating admin profile:', error);
      throw error;
    }
  };

  const handleTicketStatusUpdate = async (ticketId: string, status: TicketStatus) => {
    try {
      const updatedTicket = await updateTicketStatusUseCase.execute(ticketId, status);
      // Actualizar el ticket en la lista local
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId ? updatedTicket : ticket
        )
      );
      return updatedTicket;
    } catch (error) {
      console.error('Error updating ticket status:', error);
      throw error;
    }
  };

  const refreshTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const ticketsData = await getAdminTicketsUseCase.execute();
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error refreshing tickets:', error);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleSendLeadEmail = async (leadId: string, data: SendAdminLeadEmailRequest) => {
    try {
      await sendLeadEmailUseCase.execute(leadId, data);
    } catch (error) {
      console.error('Error sending lead email:', error);
      throw error;
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <AdminProfileHeroSection />
        <AdminProfileMainSection 
          profile={profile} 
          isLoading={isLoading}
          tickets={tickets}
          isLoadingTickets={isLoadingTickets}
          statsData={stats}
          isLoadingStats={isLoadingStats}
          leads={leads}
          isLoadingLeads={isLoadingLeads}
          onProfileUpdate={handleProfileUpdate}
          onTicketStatusUpdate={handleTicketStatusUpdate}
          onRefreshTickets={refreshTickets}
          onSendLeadEmail={handleSendLeadEmail}
        />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
