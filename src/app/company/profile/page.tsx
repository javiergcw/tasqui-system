'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { EmployerProfileHeroSection } from '@/components/employer/EmployerProfileHeroSection';
import { EmployerProfileMainSection } from '@/components/employer/EmployerProfileMainSection';
import { colorClasses } from '@/lib/colors';
import { companyProfileUseCase } from '@/use-cases';
import type { CompanyProfile } from '@/models';

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <EmployerProfileHeroSection />
        <EmployerProfileMainSection profile={profile} isLoading={isLoading} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
