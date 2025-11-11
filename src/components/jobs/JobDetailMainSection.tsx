'use client';
import React from 'react';
import { JobDetailContent } from './JobDetailContent';
import { JobDetailSidebar } from './JobDetailSidebar';
import type { LoginUser } from '@/models/auth/login.model';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface JobDetailMainSectionProps {
  jobId: string;
  user: LoginUser | null;
  hasApplied: boolean;
  isChecking: boolean;
  onApplyClick: () => Promise<void> | void;
  job: PublicJob | null;
  isJobLoading: boolean;
  jobError: string | null;
}

export const JobDetailMainSection: React.FC<JobDetailMainSectionProps> = ({
  jobId,
  user,
  hasApplied,
  isChecking,
  onApplyClick,
  job,
  isJobLoading,
  jobError,
}) => {
  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <JobDetailContent 
            jobId={jobId}
            user={user}
            hasApplied={hasApplied}
            isChecking={isChecking}
            onApplyClick={onApplyClick}
            job={job}
            isJobLoading={isJobLoading}
            jobError={jobError}
          />
          <JobDetailSidebar job={job} isLoading={isJobLoading} />
        </div>
      </div>
    </section>
  );
};
