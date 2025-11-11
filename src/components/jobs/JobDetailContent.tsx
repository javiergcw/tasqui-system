'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { colorClasses, colors } from '@/lib/colors';
import { JobDetailHeader } from './JobDetailHeader';
import { JobApplicationModal } from './JobApplicationModal';
import { isAuthenticated, getUser } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface JobDetailContentProps {
  jobId: string;
  user: LoginUser | null;
  hasApplied: boolean;
  isChecking: boolean;
  onApplyClick: () => Promise<void> | void;
  job: PublicJob | null;
  isJobLoading: boolean;
  jobError: string | null;
}

export const JobDetailContent: React.FC<JobDetailContentProps> = ({
  jobId,
  user,
  hasApplied,
  isChecking,
  onApplyClick,
  job,
  isJobLoading,
  jobError,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyNow = () => {
    // Si no está autenticado, redirigir a registro
    if (!isAuthenticated()) {
      router.push('/register?role=employee');
      return;
    }

    // Si no es empleado, redirigir a registro como empleado
    if (!user || user.role !== 'EMPLOYEE') {
      router.push('/register?role=employee');
      return;
    }

    // Si ya aplicó, no hacer nada
    if (hasApplied) {
      return;
    }

    // Abrir modal de aplicación
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitApplication = async () => {
    if (isSubmitting || hasApplied) {
      return;
    }

    const currentUser = user ?? getUser();
    if (!currentUser || currentUser.role !== 'EMPLOYEE') {
      setIsModalOpen(false);
      return;
    }

    try {
      setIsSubmitting(true);
      await onApplyClick();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al enviar la aplicación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobTypeLabels: Record<string, string> = useMemo(
    () => ({
      FULL_TIME: 'Tiempo Completo',
      PART_TIME: 'Medio Tiempo',
      CONTRACT: 'Contrato',
      TEMPORARY: 'Temporal',
      INTERNSHIP: 'Pasantía',
      FREELANCE: 'Freelance',
    }),
    []
  );

  const experienceLevelLabels: Record<string, string> = useMemo(
    () => ({
      ENTRY_LEVEL: 'Nivel Junior',
      MID_LEVEL: 'Nivel Semi Senior',
      SENIOR_LEVEL: 'Nivel Senior',
      EXECUTIVE: 'Nivel Ejecutivo',
    }),
    []
  );

  const salaryLabel = useMemo(() => {
    if (!job) {
      return 'Salario no especificado';
    }

    if (job.salary_min == null && job.salary_max == null) {
      return 'Salario no especificado';
    }

    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: job.currency ?? 'COP',
      maximumFractionDigits: 0,
    });

    if (job.salary_min != null && job.salary_max != null) {
      return `${formatter.format(job.salary_min)} - ${formatter.format(job.salary_max)}`;
    }

    if (job.salary_min != null) {
      return `Desde ${formatter.format(job.salary_min)}`;
    }

    return `Hasta ${formatter.format(job.salary_max as number)}`;
  }, [job]);

  const companyName = job?.company?.legal_name?.trim() || 'Empresa confidencial';
  const contactEmail = job?.company?.contact_email || 'Correo no disponible';
  const experienceLabel =
    (job?.experience_level && experienceLevelLabels[job.experience_level]) || 'Experiencia no especificada';
  const jobTypeLabel = (job?.job_type && jobTypeLabels[job.job_type]) || 'Tipo de trabajo no especificado';

  const descriptionContent = job?.description?.trim() || 'La descripción de este empleo no está disponible.';

  return (
    <div className="lg:col-span-2">
      <JobDetailHeader job={job} isLoading={isJobLoading} />
      <div className="bg-white p-4 md:p-6 lg:p-8 -mt-4 md:-mt-6 lg:-mt-8">
        {isJobLoading ? (
          <div className="py-16 text-center text-gray-600">Cargando información del empleo...</div>
        ) : jobError ? (
          <div className="py-16 text-center text-red-600">{jobError}</div>
        ) : !job ? (
          <div className="py-16 text-center text-gray-600">No se encontró la información del empleo.</div>
        ) : (
          <>
            {/* Description Section */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Descripción</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
                <p>{descriptionContent}</p>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Requisitos</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para ser considerado para esta posición, los candidatos deben cumplir con los siguientes requisitos:
              </p>
              <ul className="space-y-3">
                {[
                  'Experiencia laboral comprobada en diseño',
                  'Habilidades técnicas y blandas relevantes',
                  'Cualidades personales y atributos profesionales',
                  'Capacidad para soportar implementaciones de software en producción',
                  'Capacidad para guiar y mentorizar ingenieros junior. Servir como líder de equipo cuando sea apropiado',
                ].map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Details Section */}
            <div>
              <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Detalles del Trabajo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 max-w-2xl">
                <div className="space-y-4">
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Empresa: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>{companyName}</span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Ubicación: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>
                      {job.location ?? 'Ubicación no especificada'}
                    </span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Tipo de Trabajo: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>{jobTypeLabel}</span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Correo: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>{contactEmail}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Experiencia: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>{experienceLabel}</span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Idioma: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>Español</span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Salario: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>{salaryLabel}</span>
                  </div>
                  <div>
                    <span className={`${colorClasses.text.gray600} font-medium`}>Sitio Web: </span>
                    <span className={`${colorClasses.text.slate800} font-semibold`}>www.empresa.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button / Status Message */}
            {(user === null || user.role === 'EMPLOYEE') && (
              <div className="mt-8">
                {hasApplied && !isChecking && (
                  <div
                    className="mb-4 inline-flex items-center justify-center gap-2 py-3 px-6 font-semibold text-white rounded-lg text-sm mx-auto"
                    style={{ backgroundColor: colors.mainGreen }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Ya has aplicado a esta oferta
                  </div>
                )}
                {!hasApplied && (
                  <button
                    onClick={handleApplyNow}
                    disabled={isChecking || isSubmitting}
                    className="py-4 px-8 font-semibold transition-colors duration-200 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: colors.mainGreen }}
                    onMouseEnter={(e) => {
                      if (!isChecking && !isSubmitting) {
                        e.currentTarget.style.backgroundColor = colors.hoverGreen;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isChecking && !isSubmitting) {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                      }
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : isChecking ? 'Verificando...' : 'Aplicar'}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Job Application Modal */}
      {user && user.role === 'EMPLOYEE' && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitApplication}
          companyName={companyName}
          jobId={jobId}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};
