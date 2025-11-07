'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MyJobCard } from './MyJobCard';
import { MyJobsFilter } from './MyJobsFilter';
import { colorClasses, colors } from '@/lib/colors';
import type { CompanyJobListItem } from '@/models/company/job.model';

interface FilterData {
  status: string;
  city: string;
  modality: string;
  date: string;
}

type MyJobCardStatus = 'Active' | 'Paused' | 'Closed';

interface DisplayJob {
  id: string;
  companyInitial: string;
  jobTitle: string;
  jobCategory: string;
  salary: string;
  location: string;
  postedTime: string;
  jobType: string;
  status: MyJobCardStatus;
  statusFilterValue: string;
  city: string;
  modality: string;
  postedDate: Date;
}

interface MyJobsSectionProps {
  jobs: CompanyJobListItem[];
}

const normalizeStatusForCard = (status?: string): MyJobCardStatus => {
  const normalized = status?.toUpperCase() ?? 'UNKNOWN';

  switch (normalized) {
    case 'OPEN':
    case 'PUBLISHED':
    case 'ACTIVE':
      return 'Active';
    case 'PAUSED':
    case 'IN_PROGRESS':
    case 'DRAFT':
      return 'Paused';
    default:
      return 'Closed';
  }
};

const getRelativeTime = (dateIso: string): { label: string; date: Date } => {
  const parsedDate = new Date(dateIso);
  if (Number.isNaN(parsedDate.getTime())) {
    return { label: 'Fecha desconocida', date: new Date() };
  }

  const date = parsedDate;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes <= 0) {
        return { label: 'Publicado hace un momento', date };
      }
      return { label: `Hace ${diffMinutes} minuto${diffMinutes === 1 ? '' : 's'}`, date };
    }
    return { label: `Hace ${diffHours} hora${diffHours === 1 ? '' : 's'}`, date };
  }

  if (diffDays === 1) {
    return { label: 'Hace 1 día', date };
  }

  if (diffDays < 7) {
    return { label: `Hace ${diffDays} días`, date };
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return { label: `Hace ${weeks} semana${weeks === 1 ? '' : 's'}`, date };
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return { label: `Hace ${months} mes${months === 1 ? '' : 'es'}`, date };
  }

  const years = Math.floor(diffDays / 365);
  return { label: `Hace ${years} año${years === 1 ? '' : 's'}`, date };
};

const getCityKey = (location: string): string => {
  if (!location) return '';
  const [city] = location.split(',');
  return city?.trim().toLowerCase() || '';
};

const mapJobsToDisplay = (jobs: CompanyJobListItem[]): DisplayJob[] => {
  return jobs.map((job) => {
    const relative = getRelativeTime(job.created_at);
    const statusForCard = normalizeStatusForCard(job.status);
    const rawStatus = job.status ?? 'UNKNOWN';

    return {
      id: job.id,
      companyInitial: job.title?.charAt(0)?.toUpperCase() || 'T',
      jobTitle: job.title || 'Trabajo sin título',
      jobCategory: 'Categoría no especificada',
      salary: 'Salario no especificado',
      location: job.location || 'Ubicación no especificada',
      postedTime: relative.label,
      jobType: 'Tipo no especificado',
      status: statusForCard,
      statusFilterValue: rawStatus.toLowerCase(),
      city: getCityKey(job.location),
      modality: 'unknown',
      postedDate: relative.date,
    };
  });
};

export const MyJobsSection: React.FC<MyJobsSectionProps> = ({ jobs }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    status: '',
    city: '',
    modality: '',
    date: ''
  });
  const jobsPerPage = 4;
  
  const displayJobs = useMemo(() => mapJobsToDisplay(jobs), [jobs]);

  const handleView = (jobId: string) => {
    router.push(`/company/view-job/${jobId}`);
  };

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredJobs = useMemo(() => {
    return displayJobs.filter((job) => {
      if (filters.status && job.statusFilterValue !== filters.status) {
        return false;
      }
      
      if (filters.city && job.city !== filters.city) {
        return false;
      }
      
      if (filters.modality && job.modality !== filters.modality) {
        return false;
      }
      
      if (filters.date) {
        const now = new Date();
        const jobDate = job.postedDate;
        const daysDiff = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.date) {
          case 'today':
            if (daysDiff > 1) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
          case '3months':
            if (daysDiff > 90) return false;
            break;
          case 'year':
            if (daysDiff > 365) return false;
            break;
        }
      }
      
      return true;
    });
  }, [displayJobs, filters]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <section className={`${colorClasses.background.gray50} py-12 md:py-20`} style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Mis Trabajos Publicados
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Gestiona y rastrea todas tus publicaciones de trabajos. Visualiza aplicaciones, edita detalles o cambia el estado de los trabajos.
          </p>
        </div>
        
        <MyJobsFilter onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <MyJobCard
                key={job.id}
                id={job.id}
                companyInitial={job.companyInitial}
                jobTitle={job.jobTitle}
                jobCategory={job.jobCategory}
                salary={job.salary}
                location={job.location}
                postedTime={job.postedTime}
                jobType={job.jobType}
                status={job.status}
                onView={handleView}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No se encontraron trabajos</div>
              <div className="text-gray-400 text-sm">Intenta ajustar tus filtros para ver más resultados</div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                currentPage === 1
                  ? colorClasses.button.paginationDisabled
                  : 'bg-white border border-gray-300 text-white'
              }`}
              style={currentPage !== 1 ? { 
                color: colors.mainGreen,
                borderColor: colors.mainGreen
              } : {}}
              onMouseEnter={(e) => {
                if (currentPage !== 1 && !e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = colors.mainGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1 && !e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = colors.mainGreen;
                  e.currentTarget.style.borderColor = colors.mainGreen;
                }
              }}
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === page
                    ? 'text-white'
                    : 'bg-white border border-gray-300 text-white'
                }`}
                style={currentPage === page ? {
                  backgroundColor: colors.mainGreen,
                  borderColor: colors.mainGreen,
                  color: '#ffffff'
                } : {
                  color: colors.mainGreen,
                  borderColor: colors.mainGreen
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = colors.mainGreen;
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = colors.mainGreen;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = colors.mainGreen;
                    e.currentTarget.style.borderColor = colors.mainGreen;
                  }
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                currentPage === totalPages
                  ? colorClasses.button.paginationDisabled
                  : 'bg-white border border-gray-300 text-white'
              }`}
              style={currentPage !== totalPages ? { 
                color: colors.mainGreen,
                borderColor: colors.mainGreen
              } : {}}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages && !e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = colors.mainGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages && !e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = colors.mainGreen;
                  e.currentTarget.style.borderColor = colors.mainGreen;
                }
              }}
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
