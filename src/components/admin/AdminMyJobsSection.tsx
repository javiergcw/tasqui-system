'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MyJobCard } from '../employer/MyJobCard';
import { MyJobsFilter } from '../employer/MyJobsFilter';
import { colorClasses, colors } from '@/lib/colors';
import { formatRelativeTime, formatSalary } from '@/utils/format';
import { Toast } from '@/components/ui/Toast';
import { updateJobStatusUseCase } from '@/use-cases';
import type { AdminJobListItem } from '@/models/admin/job.model';
import type { JobStatus as ApiJobStatus } from '@/models/admin/job.model';

interface FilterData {
  status: string;
  city: string;
  modality: string;
  date: string;
}

type JobStatus = 'Active' | 'Paused' | 'Closed';

interface Job {
  id: string;
  companyInitial: string;
  jobTitle: string;
  jobCategory: string;
  salary: string;
  location: string;
  postedTime: string;
  jobType: string;
  status: JobStatus;
  city: string;
  modality: string;
  postedDate: Date;
}

interface AdminMyJobsSectionProps {
  jobs?: AdminJobListItem[];
  isLoading?: boolean;
  error?: string | null;
}

// Mapear estado del API al formato del componente
const mapApiStatusToComponentStatus = (apiStatus: string): JobStatus => {
  switch (apiStatus.toUpperCase()) {
    case 'OPEN':
      return 'Active';
    case 'PAUSED':
      return 'Paused';
    case 'CLOSED':
    case 'CANCELLED':
      return 'Closed';
    case 'DRAFT':
    default:
      return 'Paused'; // DRAFT se muestra como Paused
  }
};

// Extraer ciudad de la ubicación
const extractCity = (location: string): string => {
  const parts = location.split(',');
  if (parts.length > 0) {
    return parts[0].toLowerCase().trim();
  }
  return '';
};

// Extraer inicial de la empresa del título
const getCompanyInitial = (title: string): string => {
  if (title && title.length > 0) {
    return title.charAt(0).toUpperCase();
  }
  return 'A';
};

// Mapear job_type a formato legible
const mapJobType = (jobType: string): string => {
  const jobTypeMap: Record<string, string> = {
    'FULL_TIME': 'Tiempo Completo',
    'PART_TIME': 'Medio Tiempo',
    'CONTRACT': 'Contrato',
    'TEMPORARY': 'Temporal',
    'INTERNSHIP': 'Pasantía',
    'FREELANCE': 'Freelance',
  };
  return jobTypeMap[jobType] || jobType;
};

export const AdminMyJobsSection: React.FC<AdminMyJobsSectionProps> = ({ 
  jobs: apiJobs = [], 
  isLoading = false,
  error = null 
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    status: '',
    city: '',
    modality: '',
    date: ''
  });
  const jobsPerPage = 4;
  
  // Mapear los trabajos del API al formato del componente
  const mappedJobs: Job[] = useMemo(() => {
    return apiJobs.map((apiJob): Job => {
      const postedDate = new Date(apiJob.created_at);
      const city = extractCity(apiJob.location);
      
      // Formatear salario
      const salary = apiJob.salary_min && apiJob.salary_max
        ? formatSalary(apiJob.salary_min, apiJob.salary_max, apiJob.currency)
        : 'No especificado';
      
      // Mapear job_type
      const jobType = apiJob.job_type ? mapJobType(apiJob.job_type) : 'No especificado';
      
      return {
        id: apiJob.id,
        companyInitial: getCompanyInitial(apiJob.title),
        jobTitle: apiJob.title,
        jobCategory: 'Sin categoría', // AdminJobListItem no tiene category
        salary: salary,
        location: apiJob.location,
        postedTime: formatRelativeTime(postedDate),
        jobType: jobType,
        status: mapApiStatusToComponentStatus(apiJob.status),
        city: city,
        modality: apiJob.job_type?.toLowerCase() || 'full-time',
        postedDate: postedDate
      };
    });
  }, [apiJobs]);

  const [jobs, setJobs] = useState<Job[]>(mappedJobs);
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Actualizar jobs cuando cambien los datos del API
  useEffect(() => {
    setJobs(mappedJobs);
  }, [mappedJobs]);

  // Mapear estado del componente al estado del API
  const mapComponentStatusToApiStatus = (componentStatus: JobStatus): ApiJobStatus => {
    switch (componentStatus) {
      case 'Active':
        return 'OPEN';
      case 'Paused':
        return 'PAUSED';
      case 'Closed':
        return 'CLOSED';
      default:
        return 'DRAFT';
    }
  };

  const handleView = (jobId: string) => {
    console.log('View job:', jobId);
    router.push(`/admin/view-job/${jobId}`);
  };

  const handleEdit = (jobId: string) => {
    console.log('Edit job:', jobId);
    router.push(`/admin/edit-job/${jobId}`);
  };

  const handleChangeStatus = async (jobId: string, newStatus: JobStatus) => {
    try {
      setUpdatingJobId(jobId);
      const apiStatus = mapComponentStatusToApiStatus(newStatus);
      
      // Actualizar en el servidor
      await updateJobStatusUseCase.execute(jobId, apiStatus);
      
      // Actualizar localmente
      setJobs(prevJobs => 
        prevJobs.map(job => {
          if (job.id === jobId) {
            return {
              ...job,
              status: newStatus
            };
          }
          return job;
        })
      );

      // Actualizar también los datos del API
      const updatedApiJobs = apiJobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: apiStatus
          };
        }
        return job;
      });
      // Esto debería disparar el useEffect que actualiza mappedJobs

      setToast({
        show: true,
        message: 'Estado del trabajo actualizado exitosamente',
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating job status:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al actualizar el estado del trabajo',
        type: 'error'
      });
    } finally {
      setUpdatingJobId(null);
    }
  };

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Status filter
      if (filters.status && job.status.toLowerCase() !== filters.status) {
        return false;
      }
      
      // City filter
      if (filters.city && job.city !== filters.city) {
        return false;
      }
      
      // Modality filter
      if (filters.modality && job.modality !== filters.modality) {
        return false;
      }
      
      // Date filter
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
  }, [jobs, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <section className={`${colorClasses.background.gray50} py-12 md:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Cargando trabajos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`${colorClasses.background.gray50} py-12 md:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-2">Error al cargar los trabajos</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${colorClasses.background.gray50} py-12 md:py-20`} style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Trabajos Administrados
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Gestiona y supervisa todas las publicaciones de trabajos. Visualiza y administra los trabajos publicados en la plataforma.
          </p>
        </div>
        
        {/* Filter Component */}
        <MyJobsFilter onFilterChange={handleFilterChange} />

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <AdminJobCard
                key={index}
                id={job.id}
                companyInitial={job.companyInitial}
                jobTitle={job.jobTitle}
                jobCategory={job.jobCategory}
                salary={job.salary}
                location={job.location}
                postedTime={job.postedTime}
                jobType={job.jobType}
                status={job.status}
                isUpdating={updatingJobId === job.id}
                onView={handleView}
                onEdit={handleEdit}
                onChangeStatus={(jobId, newStatus) => handleChangeStatus(jobId, newStatus as JobStatus)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No se encontraron trabajos</div>
              <div className="text-gray-400 text-sm">Intenta ajustar tus filtros para ver más resultados</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
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

            {/* Page Numbers */}
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

            {/* Next Button */}
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

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
};

// Componente AdminJobCard con select de estados
interface AdminJobCardProps {
  id: string;
  companyInitial: string;
  jobTitle: string;
  jobCategory: string;
  salary: string;
  location: string;
  postedTime: string;
  jobType: string;
  status: JobStatus;
  isUpdating?: boolean;
  onView: (jobId: string) => void;
  onEdit?: (jobId: string) => void;
  onChangeStatus?: (jobId: string, newStatus: string) => void;
}

const AdminJobCard: React.FC<AdminJobCardProps> = ({
  id,
  companyInitial,
  jobTitle,
  jobCategory,
  salary,
  location,
  postedTime,
  jobType,
  status,
  isUpdating = false,
  onView,
  onEdit,
  onChangeStatus
}) => {
  const getStatusLabel = (status: JobStatus): string => {
    switch (status) {
      case 'Active':
        return 'Activo';
      case 'Paused':
        return 'Pausado';
      case 'Closed':
        return 'Cerrado';
      default:
        return status;
    }
  };

  const statusOptions: { value: JobStatus; label: string }[] = [
    { value: 'Active', label: 'Activo' },
    { value: 'Paused', label: 'Pausado' },
    { value: 'Closed', label: 'Cerrado' }
  ];

  const handleStatusSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChangeStatus) {
      onChangeStatus(id, e.target.value);
    }
  };

  return (
    <div
      className="p-6 transition-all duration-300"
      style={{
        backgroundColor: colors.lighterGreen,
        border: `1px dashed ${colors.mainGreen}`,
        borderRadius: '0.5rem',
      }}
    >
      <div className="flex items-start space-x-4">
        {/* Logo Section */}
        <div
          className="flex-shrink-0 w-16 h-16 flex items-center justify-center"
          style={{
            backgroundColor: '#ffffff',
            border: `2px dashed ${colors.mainGreen}`,
            borderRadius: '0.25rem',
          }}
        >
          <span className="text-2xl font-bold text-gray-700">{companyInitial}</span>
        </div>

        {/* Job Details Section */}
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${colorClasses.text.slate800} mb-1`}>
            {jobTitle}
          </h3>
          <p className="font-medium mb-2" style={{ color: colors.sidebarGreen }}>
            {jobCategory}
          </p>

          <div className={`space-y-1 ${colorClasses.text.gray600} text-sm`}>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.564 23.564 0 0112 15c-3.183 0-6.22-1.04-8.755-2.745M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14m0 0a1 1 0 001 1h12a1 1 0 001-1M7 10h6m-6 4h6" />
              </svg>
              <span>{jobType}</span>
            </div>
          </div>
        </div>

        {/* Status/Actions Section */}
        <div className="flex flex-col items-center space-y-4">
          {/* Status Select */}
          <select
            value={status}
            onChange={handleStatusSelectChange}
            disabled={isUpdating}
            className="px-3 py-2 text-xs font-semibold rounded-full border-2 border-dashed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#ffffff',
              color: status === 'Active' 
                ? colors.mainGreen 
                : status === 'Paused'
                ? colors.orange[500]
                : colors.gray[600],
              borderColor: status === 'Active' 
                ? colors.mainGreen 
                : status === 'Paused'
                ? colors.orange[500]
                : colors.gray[600]
            }}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* View Button */}
            <button
              onClick={() => onView(id)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: '#ffffff',
                border: `2px dashed ${colors.ctaGreen}`,
                color: colors.ctaGreen
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.ctaGreen;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = colors.ctaGreen;
              }}
              title="Ver Trabajo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            {/* Edit Button */}
            {onEdit && (
              <button
                onClick={() => onEdit(id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: `2px dashed ${colors.gray[600]}`,
                  color: colors.gray[600]
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.gray[600];
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = colors.gray[600];
                }}
                title="Editar Trabajo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{postedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

