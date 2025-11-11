'use client';
import React from 'react';
import { PostedByCard } from './PostedByCard';
import { LocationCard } from './LocationCard';
import { KeywordsCard } from './KeywordsCard';
import { ShareInCard } from './ShareInCard';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface JobDetailSidebarProps {
  job: PublicJob | null;
  isLoading?: boolean;
}

export const JobDetailSidebar: React.FC<JobDetailSidebarProps> = ({ job, isLoading = false }) => {
  return (
    <div className="lg:col-span-1">
      <PostedByCard job={job} isLoading={isLoading} />
      <LocationCard job={job} isLoading={isLoading} />
      <KeywordsCard job={job} isLoading={isLoading} />
      <ShareInCard />
    </div>
  );
};
