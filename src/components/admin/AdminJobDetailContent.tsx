'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { colors, colorClasses } from '@/lib/colors';
import { formatCurrency, formatSalary } from '@/utils/format';
import { AdminJobDetailHeader } from './AdminJobDetailHeader';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminJobDetailContentProps {
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

// Mapear experience_level a texto legible
const mapExperienceLevel = (level: string): string => {
  const mapping: Record<string, string> = {
    'ENTRY_LEVEL': 'Nivel Inicial',
    'MID_LEVEL': 'Nivel Medio',
    'SENIOR': 'Nivel Senior',
    'LEAD': 'Líder/Experto'
  };
  return mapping[level] || level;
};

export const AdminJobDetailContent: React.FC<AdminJobDetailContentProps> = ({ job }) => {
  const router = useRouter();
  
  return (
    <div className="lg:col-span-2">
      <AdminJobDetailHeader job={job} />
      <div className="bg-white p-4 md:p-6 lg:p-8 -mt-4 md:-mt-6 lg:-mt-8">
        {/* Description Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Descripción</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="whitespace-pre-wrap">{job.description || 'No hay descripción disponible.'}</p>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Requisitos</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nivel de experiencia requerido: {mapExperienceLevel(job.experience_level)}
          </p>
          {/* Aquí se podrían agregar más requisitos si están disponibles en el modelo */}
        </div>

        {/* Job Details Section */}
        <div>
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Detalles del Trabajo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 max-w-2xl">
            <div className="space-y-4">
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Ubicación: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{job.location}</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Tipo de Trabajo: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{mapJobType(job.job_type)}</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Estado: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{job.status}</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Visibilidad: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{job.visibility}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Experiencia: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{mapExperienceLevel(job.experience_level)}</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Salario: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>
                  {formatSalary(job.salary_min, job.salary_max, job.currency)}
                </span>
              </div>
              {job.published_at && (
                <div>
                  <span className={`${colorClasses.text.gray600} font-medium`}>Publicado: </span>
                  <span className={`${colorClasses.text.slate800} font-semibold`}>
                    {new Date(job.published_at).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Aplicaciones: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>{job.applications_count || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/admin/edit-job/${job.id}`)}
            className="py-4 px-8 font-semibold transition-colors duration-200 text-white rounded-lg"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Editar Trabajo
          </button>
          <button
            onClick={() => router.push(`/admin/applicants?jobId=${job.id}`)}
            className="py-4 px-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-colors duration-200 rounded-lg"
          >
            Ver Aplicaciones ({job.applications_count || 0})
          </button>
        </div>
      </div>
    </div>
  );
};

