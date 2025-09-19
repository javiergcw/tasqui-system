'use client';
import React from 'react';
import { EmployerPostedByCard } from './EmployerPostedByCard';
import { EmployerLocationCard } from './EmployerLocationCard';
import { EmployerKeywordsCard } from './EmployerKeywordsCard';
import { EmployerShareInCard } from './EmployerShareInCard';

export const EmployerJobDetailSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <EmployerPostedByCard />
      <EmployerLocationCard />
      <EmployerKeywordsCard />
      <EmployerShareInCard />
    </div>
  );
};
