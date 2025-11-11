'use client';
import Image from 'next/image';
import { colors } from '@/lib/colors';
import type {
  AdminJobApplication,
  JobApplicationStatus,
} from '@/models/admin/job-applicants.model';

interface AdminApplicantInfoCardProps {
  application: AdminJobApplication | null;
  isLoading: boolean;
  error: string | null;
}

const STATUS_LABELS: Record<JobApplicationStatus, string> = {
  APPLIED: 'Aplicado',
  SHORTLISTED: 'Preseleccionado',
  INTERVIEW: 'Entrevista',
  OFFERED: 'Oferta',
  REJECTED: 'Rechazado',
  WITHDRAWN: 'Retirado',
  HIRED: 'Contratado',
};

const STATUS_COLORS: Record<JobApplicationStatus, string> = {
  APPLIED: 'bg-blue-100 text-blue-800',
  SHORTLISTED: 'bg-indigo-100 text-indigo-800',
  INTERVIEW: 'bg-amber-100 text-amber-800',
  OFFERED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  WITHDRAWN: 'bg-gray-200 text-gray-700',
  HIRED: 'bg-green-100 text-green-800',
};

export const AdminApplicantInfoCard = ({
  application,
  isLoading,
  error,
}: AdminApplicantInfoCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">Cargando candidato...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">Error al cargar</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No se encontró la información del candidato.</p>
      </div>
    );
  }

  const name =
    application.applicant?.full_name?.trim() ||
    application.employee_profile_id ||
    'Candidato sin nombre';
  const title = application.job?.title || 'Sin cargo definido';
  const status = application.status;
  const statusLabel = STATUS_LABELS[status];
  const statusColor = STATUS_COLORS[status];
  const location =
    [application.applicant?.city, application.applicant?.region, application.applicant?.country]
      .filter(Boolean)
      .join(', ') || application.job?.location || 'Ubicación no disponible';
  const email = application.applicant?.email || 'Correo no disponible';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=0D8ABC&color=fff&size=300`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Foto de perfil */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
        <p className="text-lg text-gray-600">{title}</p>
        <div className="mt-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            Estado: {statusLabel}
          </span>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 flex items-center justify-center" style={{ color: colors.mainGreen }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <span className="text-gray-700">{location}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 flex items-center justify-center" style={{ color: colors.mainGreen }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <span className="text-gray-700 break-all">{email}</span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="space-y-4 text-sm text-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 flex items-center justify-center" style={{ color: colors.mainGreen }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">Fecha de aplicación</span>
            <span className="text-gray-800">
              {new Date(application.created_at).toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

