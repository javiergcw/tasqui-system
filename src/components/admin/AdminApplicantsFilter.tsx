'use client';

import { useState } from 'react';

interface AdminApplicantsFilterProps {
  onFilterChange: (filters: {
    search: string;
    rating: string;
    stage: string;
  }) => void;
}

export const AdminApplicantsFilter: React.FC<AdminApplicantsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    stage: 'all'
  });

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { search: '', rating: 'all', stage: 'all' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.search || filters.rating !== 'all' || filters.stage !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Búsqueda por candidato
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre, título o habilidades..."
              value={filters.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900 placeholder-gray-500"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calificación
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleInputChange('rating', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900"
          >
            <option value="all">Todas las calificaciones</option>
            <option value="5">5 estrellas</option>
            <option value="4">4+ estrellas</option>
            <option value="3">3+ estrellas</option>
            <option value="2">2+ estrellas</option>
            <option value="1">1+ estrellas</option>
          </select>
        </div>

        {/* Stage Filter */}
        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Etapa
          </label>
          <select
            value={filters.stage}
            onChange={(e) => handleInputChange('stage', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-900"
          >
            <option value="all">Todas las etapas</option>
            <option value="pending">Pendiente</option>
            <option value="reviewed">Revisado</option>
            <option value="interviewed">Entrevistado</option>
            <option value="hired">Contratado</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="lg:w-auto flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Búsqueda: &quot;{filters.search}&quot;
                <button
                  onClick={() => handleInputChange('search', '')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {filters.rating !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Calificación: {filters.rating} estrellas
                <button
                  onClick={() => handleInputChange('rating', 'all')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {filters.stage !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Etapa: {
                  filters.stage === 'pending' ? 'Pendiente' :
                  filters.stage === 'reviewed' ? 'Revisado' :
                  filters.stage === 'interviewed' ? 'Entrevistado' :
                  filters.stage === 'hired' ? 'Contratado' :
                  'Rechazado'
                }
                <button
                  onClick={() => handleInputChange('stage', 'all')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

