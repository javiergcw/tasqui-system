'use client';
import React, { useMemo, useState } from 'react';
import { colors } from '@/lib/colors';
import type { EmployeeJobApplication } from '@/models/employee/job-application.model';

interface VacantesAplicadasProps {
  applications?: EmployeeJobApplication[] | null;
  isLoading?: boolean;
}

export const VacantesAplicadas: React.FC<VacantesAplicadasProps> = ({
  applications,
  isLoading = false,
}) => {
  const safeApplications = applications ?? [];
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedApplication, setSelectedApplication] = useState<EmployeeJobApplication | null>(null);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    safeApplications.forEach(app => {
      if (app.status) {
        statuses.add(app.status);
      }
    });
    return Array.from(statuses);
  }, [safeApplications]);

  const filteredApplications = useMemo(() => {
    if (statusFilter === 'todos') {
      return safeApplications;
    }
    return safeApplications.filter(app => app.status === statusFilter);
  }, [safeApplications, statusFilter]);

  const getStatusBadge = (status?: string | null) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'INTERVIEW':
        return 'bg-purple-100 text-purple-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'HIRED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (value?: string | null) => {
    if (!value) return 'No indicado';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'No indicado';
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Mis Vacantes Aplicadas
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="todos">Todos los estados</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            {filteredApplications.length} aplicación{filteredApplications.length === 1 ? '' : 'es'}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          Cargando postulaciones...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID de la postulación
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID de la vacante
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de postulación
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última actualización
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map(application => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {application.job_id}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(application.status)}`}>
                      {application.status ?? 'Sin estado'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(application.created_at)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(application.updated_at)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-semibold"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && filteredApplications.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg font-medium">No hay postulaciones</p>
          <p className="text-sm">
            {statusFilter === 'todos'
              ? 'Aún no has aplicado a ninguna vacante.'
              : `No hay postulaciones con estado "${statusFilter}"`}
          </p>
        </div>
      )}

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Detalle de la postulación</h3>
                <p className="text-sm text-gray-500">ID vacante: {selectedApplication.job_id}</p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-sm text-gray-500">Estado</span>
                <div className={`mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(selectedApplication.status)}`}>
                  {selectedApplication.status ?? 'Sin estado'}
                </div>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Fecha de postulación</span>
                <p className="text-gray-800 font-medium">{formatDate(selectedApplication.created_at)}</p>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Última actualización</span>
                <p className="text-gray-800 font-medium">{formatDate(selectedApplication.updated_at)}</p>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Identificador de postulación</span>
                <p className="text-gray-800 font-medium break-all">{selectedApplication.id}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
