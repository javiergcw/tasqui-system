'use client';
import { useEffect, useState } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, CompaniesHeroSection, TopCompaniesSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { publicCompaniesUseCase } from '@/use-cases/public-web';
import type { PublicCompanyProfile } from '@/models/public-web/public-companies.model';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<PublicCompanyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await publicCompaniesUseCase.execute();
        setCompanies(response.data.company_profiles);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Error al cargar las empresas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />

      {/* Hero Section */}
      <CompaniesHeroSection />
      <TopCompaniesSection companies={companies} isLoading={isLoading} error={error} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
