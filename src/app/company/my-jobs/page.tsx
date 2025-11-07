'use client';

import { useEffect, useState } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, MyJobsHeroSection, MyJobsSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { getCompanyJobsUseCase } from '@/use-cases';
import type { CompanyJobListItem } from '@/models/company/job.model';

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<CompanyJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getCompanyJobsUseCase.execute();
        setJobs(response);
      } catch (err) {
        console.error('Error fetching company jobs:', err);
        setError('No se pudieron cargar los trabajos. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      <MyJobsHeroSection />

      {isLoading ? (
        <div className="py-20 text-center text-gray-500">Cargando trabajos...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">{error}</div>
      ) : (
        <MyJobsSection jobs={jobs} />
      )}
    
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
