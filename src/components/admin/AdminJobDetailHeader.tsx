'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminJobDetailHeaderProps {
  job: AdminJob;
}

// Mapear job_type a texto legible
const mapJobType = (jobType: string): string => {
  const mapping: Record<string, string> = {
    'FULL_TIME': 'Tiempo Completo',
    'PART_TIME': 'Medio Tiempo',
    'CONTRACT': 'Por Contrato',
    'REMOTE': 'Remoto',
    'HYBRID': 'Híbrido',
    'INTERNSHIP': 'Práctica'
  };
  return mapping[jobType] || jobType;
};

export const AdminJobDetailHeader: React.FC<AdminJobDetailHeaderProps> = ({ job }) => {
  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-700">
            {job.title.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Job Details Section */}
        <div className="flex-1">
          <h1 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>
            {job.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={colorClasses.text.gray600}>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.564 23.564 0 0112 15c-3.183 0-6.22-1.04-8.755-2.745M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14m0 0a1 1 0 001 1h12a1 1 0 001-1M7 10h6m-6 4h6" />
              </svg>
              <span className={colorClasses.text.gray600}>{mapJobType(job.job_type)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className={colorClasses.text.gray600}>{job.status}</span>
            </div>
          </div>

          {job.published_at && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.mainGreen }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-sm font-medium" style={{ color: colors.mainGreen }}>
                Publicado: {new Date(job.published_at).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

