'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminProfileHeroSection } from '@/components/admin/AdminProfileHeroSection';
import { AdminProfileMainSection } from '@/components/admin/AdminProfileMainSection';
import { colorClasses } from '@/lib/colors';
import { adminProfileUseCase, getTicketsUseCase } from '@/use-cases';
import type { AdminProfile, AdminTicket } from '@/models';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);

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
        const ticketsData = await getTicketsUseCase.execute();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching admin tickets:', error);
      } finally {
        setIsLoadingTickets(false);
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

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <AdminProfileHeroSection />
        <AdminProfileMainSection 
          profile={profile} 
          isLoading={isLoading}
          tickets={tickets}
          isLoadingTickets={isLoadingTickets}
          onProfileUpdate={handleProfileUpdate}
        />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
