'use client';
import React, { useMemo } from 'react';
import { JobInterestedCard } from './JobInterestedCard';
import { colorClasses } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface JobsInterestedSectionProps {
  jobs?: PublicJob[];
  isLoading?: boolean;
  error?: string | null;
}

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: 'Tiempo Completo',
  PART_TIME: 'Medio Tiempo',
  CONTRACT: 'Contrato',
  TEMPORARY: 'Temporal',
  INTERNSHIP: 'Pasantía',
  FREELANCE: 'Freelance',
};

const experienceLevelLabels: Record<string, string> = {
  ENTRY_LEVEL: 'Nivel Junior',
  MID_LEVEL: 'Nivel Semi Senior',
  SENIOR_LEVEL: 'Nivel Senior',
  EXECUTIVE: 'Nivel Ejecutivo',
};

const formatDateLabel = (dateString?: string | null): string => {
  if (!dateString) {
    return 'Fecha no disponible';
  }

  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    const formatter = new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'medium',
    });

    return `Actualizado el ${formatter.format(date)}`;
  } catch {
    return 'Fecha no disponible';
  }
};

export const JobsInterestedSection: React.FC<JobsInterestedSectionProps> = ({
  jobs = [],
  isLoading = false,
  error = null,
}) => {
  const formattedJobs = useMemo(() => {
    return jobs.map((job) => ({
      id: job.id,
      jobTitle: job.title || 'Cargo sin título',
      companyName:
        job.company?.legal_name?.trim() ||
        (job.company_id ? `Empresa #${job.company_id.substring(0, 8)}` : 'Empresa confidencial'),
      location: job.location ?? 'Ubicación no especificada',
      category: job.category?.name?.trim() || (job.category_id ? `Categoría #${job.category_id.substring(0, 8)}` : 'Categoría no especificada'),
      jobType: jobTypeLabels[job.job_type ?? ''] ?? 'Modalidad no especificada',
      postedTime: formatDateLabel(job.published_at ?? job.updated_at ?? job.created_at),
      contractType: jobTypeLabels[job.job_type ?? ''] ?? null,
    }));
  }, [jobs]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${colorClasses.text.slate800} mb-4`}>
            Trabajos Que Te Pueden Interesar
          </h2>
          <p className={`text-lg ${colorClasses.text.gray600} max-w-3xl mx-auto`}>
            Descubre oportunidades laborales personalizadas basadas en tu perfil. Encuentra trabajos que se ajusten a tus habilidades y experiencia profesional en Tasqui.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando empleos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : formattedJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No hay empleos disponibles por ahora.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formattedJobs.map((job) => (
              <JobInterestedCard
                key={job.id}
                id={job.id}
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                location={job.location}
                category={job.category}
                jobType={job.jobType}
                postedTime={job.postedTime}
                contractType={job.contractType}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
