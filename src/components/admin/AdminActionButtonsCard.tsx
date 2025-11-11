'use client';
import { useEffect, useState } from 'react';
import { colors } from '@/lib/colors';
import type { JobApplicationStatus } from '@/models/admin/job-applicants.model';

const STATUS_OPTIONS: JobApplicationStatus[] = [
  'APPLIED',
  'SHORTLISTED',
  'INTERVIEW',
  'OFFERED',
  'REJECTED',
  'WITHDRAWN',
  'HIRED',
];

const STATUS_LABELS: Record<JobApplicationStatus, string> = {
  APPLIED: 'Aplicado',
  SHORTLISTED: 'Preseleccionado',
  INTERVIEW: 'Entrevista',
  OFFERED: 'Oferta',
  REJECTED: 'Rechazado',
  WITHDRAWN: 'Retirado',
  HIRED: 'Contratado',
};

interface AdminActionButtonsCardProps {
  currentStatus: JobApplicationStatus | null;
  isUpdating: boolean;
  error: string | null;
  onUpdateStatus: (status: JobApplicationStatus) => Promise<boolean> | boolean;
}

export const AdminActionButtonsCard = ({
  currentStatus,
  isUpdating,
  error,
  onUpdateStatus,
}: AdminActionButtonsCardProps) => {
  const [selectedStatus, setSelectedStatus] = useState<JobApplicationStatus | ''>(
    currentStatus || ''
  );
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setSelectedStatus(currentStatus || '');
  }, [currentStatus]);

  const handleDownloadCV = () => {
    console.log('Descargar CV');
    // Aquí iría la lógica para descargar el CV
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus || selectedStatus === currentStatus) {
      return;
    }

    setSuccessMessage('');
    try {
      const result = await onUpdateStatus(selectedStatus);
      if (result) {
        setSuccessMessage('Estado actualizado correctamente.');
      }
    } catch (err) {
      console.error('Error inesperado al actualizar el estado:', err);
    }
  };

  const isButtonDisabled =
    isUpdating || !selectedStatus || selectedStatus === currentStatus;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDownloadCV}
            className="w-full px-6 py-3 font-semibold text-white transition-colors duration-200 rounded-lg text-center"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Descargar CV
          </button>
        </div>

        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="application-status" className="text-sm font-medium text-gray-700 mb-1">
              Actualizar estado
            </label>
            <select
              id="application-status"
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value as JobApplicationStatus)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:text-gray-400"
              disabled={isUpdating}
            >
              <option value="">Selecciona un estado</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleUpdateStatus}
            disabled={isButtonDisabled}
            className="w-full px-6 py-3 font-semibold text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            style={{
              backgroundColor: isButtonDisabled
                ? colors.gray[300]
                : colors.mainGreen,
              color: isButtonDisabled ? colors.gray[600] : '#ffffff',
            }}
            onMouseEnter={(e) => {
              if (isButtonDisabled) {
                e.currentTarget.style.backgroundColor = colors.gray[300];
                e.currentTarget.style.color = colors.gray[600];
                return;
              }
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              if (isButtonDisabled) {
                e.currentTarget.style.backgroundColor = colors.gray[300];
                e.currentTarget.style.color = colors.gray[600];
                return;
              }
              e.currentTarget.style.backgroundColor = colors.mainGreen;
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            {isUpdating ? 'Actualizando...' : 'Actualizar estado'}
          </button>
        </div>

        {error && (
          <div className="text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        {successMessage && !error && (
          <div className="text-center text-sm text-green-600 font-medium">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

