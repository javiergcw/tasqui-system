'use client';
import React, { useState } from 'react';

interface FilterData {
  status: string;
  city: string;
  modality: string;
  date: string;
}

interface MyJobsFilterProps {
  onFilterChange: (filters: FilterData) => void;
}

export const MyJobsFilter: React.FC<MyJobsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterData>({
    status: '',
    city: '',
    modality: '',
    date: ''
  });

  const handleFilterChange = (key: keyof FilterData, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { status: '', city: '', modality: '', date: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">Todos los Estados</option>
              <option value="active">Activo</option>
              <option value="paused">Pausado</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          {/* City Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">Todas las Ciudades</option>
              <option value="bogota">Bogotá</option>
              <option value="medellin">Medellín</option>
              <option value="cali">Cali</option>
              <option value="barranquilla">Barranquilla</option>
              <option value="cartagena">Cartagena</option>
              <option value="pereira">Pereira</option>
            </select>
          </div>

          {/* Modality Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Modalidad</label>
            <select
              value={filters.modality}
              onChange={(e) => handleFilterChange('modality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">Todos los Tipos</option>
              <option value="full-time">Tiempo Completo</option>
              <option value="part-time">Medio Tiempo</option>
              <option value="contract">Contrato</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Pasantía</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Fecha de Publicación</label>
            <select
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">Todas las Fechas</option>
              <option value="today">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="3months">Últimos 3 Meses</option>
              <option value="year">Este Año</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Limpiar Todo
            </button>
          </div>
        </div>

      {/* Active Filters Display */}
      {(filters.status || filters.city || filters.modality || filters.date) && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Estado: {filters.status === 'active' ? 'Activo' : filters.status === 'paused' ? 'Pausado' : 'Cerrado'}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Ciudad: {filters.city}
                <button
                  onClick={() => handleFilterChange('city', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.modality && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Tipo: {filters.modality === 'full-time' ? 'Tiempo Completo' : filters.modality === 'part-time' ? 'Medio Tiempo' : filters.modality === 'contract' ? 'Contrato' : filters.modality === 'freelance' ? 'Freelance' : 'Pasantía'}
                <button
                  onClick={() => handleFilterChange('modality', '')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.date && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Fecha: {filters.date === 'today' ? 'Hoy' : filters.date === 'week' ? 'Esta Semana' : filters.date === 'month' ? 'Este Mes' : filters.date === '3months' ? 'Últimos 3 Meses' : 'Este Año'}
                <button
                  onClick={() => handleFilterChange('date', '')}
                  className="ml-1 hover:text-yellow-600"
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
