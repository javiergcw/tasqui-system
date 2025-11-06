'use client';

import { useEffect, useState } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, AdminJobDetailHeroSection, AdminJobDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { getJobByIdUseCase } from '@/use-cases';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminViewJobPageProps {
  params: {
    id: string;
  };
}

export default function AdminViewJobPage({ params }: AdminViewJobPageProps) {
  const [job, setJob] = useState<AdminJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const jobData = await getJobByIdUseCase.execute(params.id);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar el trabajo');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);
  
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <AdminJobDetailHeroSection jobTitle={job?.title} />
      
      {/* Main Content Section */}
      <AdminJobDetailMainSection 
        job={job}
        isLoading={isLoading}
        error={error}
      />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
