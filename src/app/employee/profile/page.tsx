'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ProfileHeroSection } from '@/components/aspirante/ProfileHeroSection';
import { ProfileMainSection } from '@/components/aspirante/ProfileMainSection';
import { colorClasses } from '@/lib/colors';
import { employeeProfileUseCase } from '@/use-cases';
import type { EmployeeProfile } from '@/models';

export default function ProfilePage() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await employeeProfileUseCase.execute();
        if (response.success && response.data.employee_profile) {
          setProfile(response.data.employee_profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <ProfileHeroSection />
        <ProfileMainSection profile={profile} isLoading={isLoading} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
