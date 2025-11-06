'use client';

import { useEffect, useState } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, MyJobsHeroSection, AdminMyJobsSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { getJobsUseCase } from '@/use-cases';
import type { AdminJobListItem } from '@/models/admin/job.model';

export default function AdminMyJobsPage() {
  const [jobs, setJobs] = useState<AdminJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const jobsData = await getJobsUseCase.execute();
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching admin jobs:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los trabajos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <MyJobsHeroSection />

      {/* Admin My Jobs Section */}
      <AdminMyJobsSection 
        jobs={jobs}
        isLoading={isLoading}
        error={error}
      />
    
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
