'use client';
import React, { useMemo } from 'react';
import { colors } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface KeywordsCardProps {
  job: PublicJob | null;
  isLoading?: boolean;
}

export const KeywordsCard: React.FC<KeywordsCardProps> = ({ job, isLoading = false }) => {
  const keywords = useMemo(() => {
    if (!job) {
      return [];
    }

    const tags = new Set<string>();

    if (job.title) {
      job.title.split(' ').forEach((word) => {
        const cleanWord = word.trim().toLowerCase();
        if (cleanWord.length > 3) {
          tags.add(cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1));
        }
      });
    }

    if (job.category?.name) {
      tags.add(job.category.name);
    }

    if (job.job_type) {
      tags.add(job.job_type.replace(/_/g, ' '));
    }

    if (job.experience_level) {
      tags.add(job.experience_level.replace(/_/g, ' '));
    }

    if (job.location) {
      tags.add(job.location);
    }

    return Array.from(tags).slice(0, 10);
  }, [job]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Palabras Clave</h3>
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando palabras clave...</p>
      ) : keywords.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron palabras clave para este empleo.</p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {keywords.map((keyword, index) => (
            <span
              key={`${keyword}-${index}`}
              className="px-3 py-1 text-slate-800 text-sm font-medium rounded-md text-center cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                border: `1px dashed ${colors.gray[300]}`,
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
      )}
    </div>
  );
};
