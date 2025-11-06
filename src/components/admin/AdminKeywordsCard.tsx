'use client';
import React from 'react';
import { colors } from '@/lib/colors';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminKeywordsCardProps {
  job: AdminJob;
}

export const AdminKeywordsCard: React.FC<AdminKeywordsCardProps> = ({ job }) => {
  // Por ahora, los tags no están disponibles en AdminJob, así que usamos datos placeholder
  // En el futuro, cuando los tags estén disponibles, se pueden mapear aquí
  const keywords = [
    job.job_type,
    job.experience_level,
    job.status,
    job.visibility
  ].filter(Boolean);

  if (keywords.length === 0) {
    keywords.push('Sin palabras clave');
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Palabras Clave</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="px-3 py-1 text-slate-800 text-sm font-medium rounded-md text-center cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              border: `1px dashed ${colors.gray[300]}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
              e.currentTarget.style.borderColor = colors.mainGreen;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = colors.gray[300];
              e.currentTarget.style.color = colors.gray[800];
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

