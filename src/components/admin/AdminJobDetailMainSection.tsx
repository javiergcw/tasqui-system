'use client';
import React from 'react';
import { AdminJobDetailContent } from './AdminJobDetailContent';
import { AdminJobDetailSidebar } from './AdminJobDetailSidebar';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminJobDetailMainSectionProps {
  job?: AdminJob | null;
  isLoading?: boolean;
  error?: string | null;
}

export const AdminJobDetailMainSection: React.FC<AdminJobDetailMainSectionProps> = ({ 
  job, 
  isLoading = false,
  error = null 
}) => {
  if (isLoading) {
    return (
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Cargando trabajo...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-2">Error al cargar el trabajo</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No se encontró el trabajo</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <AdminJobDetailContent job={job} />
          <AdminJobDetailSidebar job={job} />
        </div>
      </div>
    </section>
  );
};

