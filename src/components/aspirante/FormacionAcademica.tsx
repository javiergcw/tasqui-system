'use client';

import React, { useMemo, useState } from 'react';
import { colorClasses, colors } from '@/lib/colors';
import type { EmployeeEducation } from '@/models/employee/education.model';
import type {
  CreateEmployeeEducationRequest,
  UpdateEmployeeEducationRequest,
} from '@/models/employee/education.model';

interface FormacionAcademicaProps {
  educations?: EmployeeEducation[];
  isLoading?: boolean;
  isSaving?: boolean;
  onCreateEducation?: (data: CreateEmployeeEducationRequest) => Promise<EmployeeEducation>;
  onUpdateEducation?: (id: string, data: UpdateEmployeeEducationRequest) => Promise<EmployeeEducation>;
  onDeleteEducation?: (id: string) => Promise<void>;
}

export const FormacionAcademica: React.FC<FormacionAcademicaProps> = ({
  educations = [],
  isLoading = false,
  isSaving = false,
  onCreateEducation,
  onUpdateEducation,
  onDeleteEducation,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<EmployeeEducation | null>(null);
  const [formData, setFormData] = useState<UpdateEmployeeEducationRequest>({
    degree_name: '',
    institution_name: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const sortedEducations = useMemo(
    () => {
      // Filtrar la educación que se está editando para que no aparezca en la lista
      const filteredEducations = editingEducation
        ? educations.filter((edu) => edu.id !== editingEducation.id)
        : educations;
      return [...filteredEducations].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
    },
    [educations, editingEducation]
  );

  const resetForm = () => {
    setFormData({
      degree_name: '',
      institution_name: '',
      start_date: '',
      end_date: '',
      description: '',
    });
    setEditingEducation(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (education: EmployeeEducation) => {
    setEditingEducation(education);
    setFormData({
      degree_name: education.degree_name,
      institution_name: education.institution_name,
      start_date: education.start_date,
      end_date: education.end_date,
      description: education.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!onDeleteEducation) return;
    try {
      await onDeleteEducation(id);
    } catch (error) {
      console.error('Error al eliminar formación:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizeDate = (value: string) => {
      if (!value) return '';
      return value.includes('T') ? value : `${value}T00:00:00Z`;
    };

    const payload: UpdateEmployeeEducationRequest = {
      ...formData,
      start_date: normalizeDate(formData.start_date),
      end_date: normalizeDate(formData.end_date),
    };

    try {
      if (editingEducation && onUpdateEducation) {
        await onUpdateEducation(editingEducation.id, payload);
      } else if (onCreateEducation) {
        await onCreateEducation(payload as CreateEmployeeEducationRequest);
      }
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error guardando formación académica:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-600">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4">Cargando formación académica...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Formación Académica
        </h2>
        {onCreateEducation && (
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                resetForm();
              } else {
                handleStartCreate();
              }
            }}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              showForm
                ? 'text-red-600 border border-red-200 hover:bg-red-50'
                : 'text-white'
            }`}
            style={showForm ? {} : { backgroundColor: colors.mainGreen }}
          >
            {showForm ? 'Cancelar' : '+ Agregar Formación'}
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`border ${colorClasses.border.gray200} rounded-lg p-6 mb-6 ${colorClasses.background.gray50}`}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.mainGreen }}>
            {editingEducation ? 'Editar formación académica' : 'Nueva formación académica'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Institución Educativa *
              </label>
              <input
                type="text"
                value={formData.institution_name}
                onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${colorClasses.text.gray900}`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Título Obtenido *
              </label>
              <input
                type="text"
                value={formData.degree_name}
                onChange={(e) => setFormData({ ...formData, degree_name: e.target.value })}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${colorClasses.text.gray900}`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={formData.start_date?.slice(0, 10) || ''}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${colorClasses.text.gray900}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Fecha de Finalización
              </label>
              <input
                type="date"
                value={formData.end_date?.slice(0, 10) || ''}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${colorClasses.text.gray900}`}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-6 py-2 text-red-600 font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sortedEducations.map((education) => (
          <div key={education.id} className={`border ${colorClasses.border.gray200} rounded-lg p-4 bg-white`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${colorClasses.text.gray900}`}>{education.degree_name}</h3>
                <p className={`${colorClasses.text.gray600} font-medium`}>{education.institution_name}</p>
                <div className={`flex flex-wrap gap-4 text-sm ${colorClasses.text.gray600} mt-2`}>
                  <span>
                    Inicio: {education.start_date ? new Date(education.start_date).toLocaleDateString() : 'N/D'}
                  </span>
                  <span>
                    Fin: {education.end_date ? new Date(education.end_date).toLocaleDateString() : 'Actual'}
                  </span>
                </div>
                {education.description && (
                  <p className={`${colorClasses.text.gray600} mt-2 whitespace-pre-wrap`}>{education.description}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {onUpdateEducation && (
                  <button
                    onClick={() => handleEdit(education)}
                    className="px-3 py-1 text-sm font-medium text-white rounded-md transition-colors"
                    style={{ backgroundColor: colors.mainGreen }}
                  >
                    Editar
                  </button>
                )}
                {onDeleteEducation && (
                  <button
                    onClick={() => handleDelete(education.id)}
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

      {sortedEducations.length === 0 && (
        <div className={`text-center py-8 ${colorClasses.text.gray600}`}>
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <p>No tienes formación académica registrada</p>
          <p className="text-sm">Actualiza tu perfil para agregar tu formación.</p>
        </div>
      )}
    </div>
  );
};
