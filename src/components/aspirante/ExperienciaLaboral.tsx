'use client';

import React, { useMemo, useState } from 'react';
import { colors, colorClasses } from '@/lib/colors';
import type {
  EmployeeExperience,
  CreateEmployeeExperienceRequest,
  UpdateEmployeeExperienceRequest,
} from '@/models/employee/experience.model';

interface ExperienciaLaboralProps {
  experiences?: EmployeeExperience[];
  isLoading?: boolean;
  isSaving?: boolean;
  onCreateExperience?: (data: CreateEmployeeExperienceRequest) => Promise<EmployeeExperience>;
  onUpdateExperience?: (id: string, data: UpdateEmployeeExperienceRequest) => Promise<EmployeeExperience>;
  onDeleteExperience?: (id: string) => Promise<void>;
}

export const ExperienciaLaboral: React.FC<ExperienciaLaboralProps> = ({
  experiences = [],
  isLoading = false,
  isSaving = false,
  onCreateExperience,
  onUpdateExperience,
  onDeleteExperience,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<EmployeeExperience | null>(null);
  const [formData, setFormData] = useState<UpdateEmployeeExperienceRequest>({
    job_title: '',
    company_name: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const sortedExperiences = useMemo(
    () =>
      [...experiences].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()),
    [experiences]
  );

  const resetForm = () => {
    setFormData({
      job_title: '',
      company_name: '',
      start_date: '',
      end_date: '',
      description: '',
    });
    setEditingExperience(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (experience: EmployeeExperience) => {
    setEditingExperience(experience);
    setFormData({
      job_title: experience.job_title,
      company_name: experience.company_name,
      start_date: experience.start_date,
      end_date: experience.end_date,
      description: experience.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!onDeleteExperience) return;
    try {
      await onDeleteExperience(id);
    } catch (error) {
      console.error('Error al eliminar experiencia:', error);
    }
  };

  const normalizeDate = (value?: string | null) => {
    if (!value) return null;
    return value.includes('T') ? value : `${value}T00:00:00Z`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: UpdateEmployeeExperienceRequest = {
      ...formData,
      start_date: normalizeDate(formData.start_date) ?? undefined,
      end_date: normalizeDate(formData.end_date),
    };

    try {
      if (editingExperience && onUpdateExperience) {
        await onUpdateExperience(editingExperience.id, payload);
      } else if (onCreateExperience) {
        await onCreateExperience(payload as CreateEmployeeExperienceRequest);
      }
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error guardando experiencia laboral:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-600">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4">Cargando experiencia laboral...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Experiencia Laboral
        </h2>
        {onCreateExperience && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2 text-white font-medium rounded-md transition-colors"
            style={{ backgroundColor: colors.mainGreen }}
          >
            {showForm ? 'Cancelar' : '+ Agregar Experiencia'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.mainGreen }}>
            {editingExperience ? 'Editar experiencia laboral' : 'Nueva experiencia laboral'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa *
              </label>
              <input
                type="text"
                value={formData.company_name ?? ''}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo *
              </label>
              <input
                type="text"
                value={formData.job_title ?? ''}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={formData.start_date ? formData.start_date.slice(0, 10) : ''}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Finalización
              </label>
              <input
                type="date"
                value={formData.end_date && formData.end_date !== 'null' ? formData.end_date.slice(0, 10) : ''}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de Responsabilidades
            </label>
            <textarea
              rows={4}
              value={formData.description ?? ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="Describe tus responsabilidades y logros en este puesto"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
            >
              {isSaving ? 'Guardando...' : 'Guardar experiencia'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-6 py-2 text-gray-600 font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sortedExperiences.map((experience) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{experience.job_title}</h3>
                <p className="text-gray-600 font-medium">{experience.company_name}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                  <span>
                    Inicio: {experience.start_date ? new Date(experience.start_date).toLocaleDateString() : 'N/D'}
                  </span>
                  <span>
                    Fin: {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Actual'}
                  </span>
                </div>
                {experience.description && (
                  <p className="text-gray-600 mt-2 whitespace-pre-wrap">{experience.description}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {onUpdateExperience && (
                  <button
                    onClick={() => handleEdit(experience)}
                    className="px-3 py-1 text-sm font-medium text-white rounded-md transition-colors"
                    style={{ backgroundColor: colors.mainGreen }}
                  >
                    Editar
                  </button>
                )}
                {onDeleteExperience && (
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="px-3 py-1 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedExperiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
          <p>No tienes experiencia laboral registrada</p>
          <p className="text-sm">Actualiza tu perfil para agregar tu experiencia.</p>
        </div>
      )}
    </div>
  );
};
