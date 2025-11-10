import React, { useMemo } from 'react';
import { JobCard } from '../JobCard';
import { colorClasses } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface JobsSectionProps {
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

const formatSalaryRange = (min?: number | null, max?: number | null, currency?: string | null): string => {
  if (min == null && max == null) {
    return 'Salario no especificado';
  }

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency ?? 'COP',
    maximumFractionDigits: 0,
  });

  if (min != null && max != null) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }

  if (min != null) {
    return `Desde ${formatter.format(min)}`;
  }

  return `Hasta ${formatter.format(max as number)}`;
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

export const JobsSection: React.FC<JobsSectionProps> = ({
  jobs = [],
  isLoading = false,
  error = null,
}) => {
  const formattedJobs = useMemo(() => {
    return jobs.map((job) => ({
      id: job.id,
      companyInitial: (job.title?.charAt(0) || 'T').toUpperCase(),
      jobTitle: job.title || 'Cargo sin título',
      jobCategory: experienceLevelLabels[job.experience_level ?? ''] ?? 'Experiencia no especificada',
      salary: formatSalaryRange(job.salary_min, job.salary_max, job.currency),
      location: job.location ?? 'Ubicación no especificada',
      postedTime: formatDateLabel(job.published_at ?? job.updated_at ?? job.created_at),
      jobType: jobTypeLabels[job.job_type ?? ''] ?? 'Modalidad no especificada',
    }));
  }, [jobs]);

  return (
    <section
      className={`${colorClasses.background.gray50} py-12 md:py-20`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Trabajos Que Te Pueden Interesar
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Descubre las mejores oportunidades laborales disponibles en Tasqui. Conectamos profesionales calificados con empresas que buscan talento comprometido y con experiencia.
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
          <div className="space-y-4 md:space-y-6">
            {formattedJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                companyInitial={job.companyInitial}
                jobTitle={job.jobTitle}
                jobCategory={job.jobCategory}
                salary={job.salary}
                location={job.location}
                postedTime={job.postedTime}
                jobType={job.jobType}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
