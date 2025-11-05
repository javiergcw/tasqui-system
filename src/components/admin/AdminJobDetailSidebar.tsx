'use client';
import React from 'react';
import { AdminPostedByCard } from './AdminPostedByCard';
import { AdminLocationCard } from './AdminLocationCard';
import { AdminKeywordsCard } from './AdminKeywordsCard';
import { AdminShareInCard } from './AdminShareInCard';

export const AdminJobDetailSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <AdminPostedByCard />
      <AdminLocationCard />
      <AdminKeywordsCard />
      <AdminShareInCard />
    </div>
  );
};

