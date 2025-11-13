'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, AdminEditJobHeroSection, AdminEditJobFormSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import { getJobByIdUseCase, jobMasterDataCompleteUseCase } from '@/use-cases';
import type { AdminJob } from '@/models/admin/job.model';
import type { ExperienceLevel, JobTag } from '@/models/master/job-master-data-complete.model';

export default function AdminEditJobPage() {
  const params = useParams<{ id: string }>();
  const [job, setJob] = useState<AdminJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([]);
  const [jobTags, setJobTags] = useState<JobTag[]>([]);
  const [isLoadingMasterData, setIsLoadingMasterData] = useState(true);

  // Cargar datos maestros (experience levels y tags)
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setIsLoadingMasterData(true);
        const response = await jobMasterDataCompleteUseCase.execute();
        if (response.success && response.data) {
          setExperienceLevels(response.data.experience_levels || []);
          setJobTags(response.data.tags || []);
        }
      } catch (error) {
        console.error('Error fetching master data:', error);
      } finally {
        setIsLoadingMasterData(false);
      }
    };

    fetchMasterData();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const jobId = params?.id ?? '';
        if (!jobId) {
          throw new Error('El ID del trabajo es requerido');
        }

        const jobData = await getJobByIdUseCase.execute(jobId);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar el trabajo');
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);
  
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <AdminEditJobHeroSection />

      {/* Job Form Section - Pre-populated with existing data */}
      <AdminEditJobFormSection 
        job={job}
        isLoading={isLoading}
        error={error}
        experienceLevels={experienceLevels}
        jobTags={jobTags}
        isLoadingMasterData={isLoadingMasterData}
      />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
