'use client';
import React from 'react';
import { EmployerJobDetailContent } from './EmployerJobDetailContent';
import { EmployerJobDetailSidebar } from './EmployerJobDetailSidebar';

export const EmployerJobDetailMainSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <EmployerJobDetailContent />
          <EmployerJobDetailSidebar />
        </div>
      </div>
    </section>
  );
};
