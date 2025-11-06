'use client';
import React from 'react';
import { AdminPostedByCard } from './AdminPostedByCard';
import { AdminLocationCard } from './AdminLocationCard';
import { AdminKeywordsCard } from './AdminKeywordsCard';
import { AdminShareInCard } from './AdminShareInCard';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminJobDetailSidebarProps {
  job: AdminJob;
}

export const AdminJobDetailSidebar: React.FC<AdminJobDetailSidebarProps> = ({ job }) => {
  return (
    <div className="lg:col-span-1">
      <AdminPostedByCard job={job} />
      <AdminLocationCard job={job} />
      <AdminKeywordsCard job={job} />
      <AdminShareInCard />
    </div>
  );
};

