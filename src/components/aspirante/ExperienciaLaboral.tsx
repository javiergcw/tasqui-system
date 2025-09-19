'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

export const ExperienciaLaboral: React.FC = () => {
  const [experiencias, setExperiencias] = useState([
    {
      id: 1,
      empresa: 'TechCorp Solutions',
      cargo: 'Desarrollador Frontend Senior',
      fechaInicio: '2022-01-15',
      fechaFin: '2024-01-15',
      descripcion: 'Desarrollo de aplicaciones web responsivas usando React, TypeScript y Node.js. Lideré un equipo de 3 desarrolladores y implementé mejoras que aumentaron la performance en un 40%.'
    }
  ]);

  const [nuevaExperiencia, setNuevaExperiencia] = useState({
    empresa: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregarExperiencia = () => {
    if (nuevaExperiencia.empresa && nuevaExperiencia.cargo) {
      const nueva = {
        id: Date.now(),
        ...nuevaExperiencia
      };
      setExperiencias([...experiencias, nueva]);
      setNuevaExperiencia({
        empresa: '',
        cargo: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
      });
      setMostrarFormulario(false);
    }
  };

  const handleEliminarExperiencia = (id: number) => {
    setExperiencias(experiencias.filter(e => e.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.primary[600] }}>
          Experiencia Laboral
        </h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="px-4 py-2 text-white font-medium rounded-md transition-colors"
          style={{ backgroundColor: colors.mainRed }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Agregar Experiencia'}
        </button>
      </div>

      {/* Formulario para nueva experiencia */}
      {mostrarFormulario && (
        <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Nueva Experiencia Laboral</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa *
              </label>
              <input
                type="text"
                placeholder="Nombre de la empresa"
                value={nuevaExperiencia.empresa}
                onChange={(e) => setNuevaExperiencia({...nuevaExperiencia, empresa: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo *
              </label>
              <input
                type="text"
                placeholder="Posición o cargo"
                value={nuevaExperiencia.cargo}
                onChange={(e) => setNuevaExperiencia({...nuevaExperiencia, cargo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={nuevaExperiencia.fechaInicio}
                onChange={(e) => setNuevaExperiencia({...nuevaExperiencia, fechaInicio: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Finalización
              </label>
              <input
                type="date"
                value={nuevaExperiencia.fechaFin}
                onChange={(e) => setNuevaExperiencia({...nuevaExperiencia, fechaFin: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de Responsabilidades
            </label>
            <textarea
              placeholder="Describe tus responsabilidades y logros en este puesto"
              rows={4}
              value={nuevaExperiencia.descripcion}
              onChange={(e) => setNuevaExperiencia({...nuevaExperiencia, descripcion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAgregarExperiencia}
              className="px-6 py-2 text-white font-medium rounded-md transition-colors"
              style={{ backgroundColor: colors.mainRed }}
            >
              Guardar Experiencia
            </button>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="px-6 py-2 text-gray-600 font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de experiencias */}
      <div className="space-y-4">
        {experiencias.map((experiencia) => (
          <div key={experiencia.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{experiencia.cargo}</h3>
                <p className="text-gray-600 font-medium">{experiencia.empresa}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  {experiencia.fechaInicio && (
                    <span>Inicio: {new Date(experiencia.fechaInicio).toLocaleDateString()}</span>
                  )}
                  {experiencia.fechaFin && (
                    <span>Fin: {new Date(experiencia.fechaFin).toLocaleDateString()}</span>
                  )}
                </div>
                {experiencia.descripcion && (
                  <p className="text-gray-600 mt-2">{experiencia.descripcion}</p>
                )}
              </div>
              <button
                onClick={() => handleEliminarExperiencia(experiencia.id)}
                className="text-red-600 hover:text-red-800 p-2"
                title="Eliminar experiencia"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {experiencias.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
          <p>No tienes experiencia laboral registrada</p>
          <p className="text-sm">Haz clic en &quot;Agregar Experiencia&quot; para comenzar</p>
        </div>
      )}
    </div>
  );
};
