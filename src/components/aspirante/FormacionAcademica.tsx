'use client';
import React, { useState } from 'react';
import { colorClasses,colors } from '@/lib/colors';

export const FormacionAcademica: React.FC = () => {
  const [formaciones, setFormaciones] = useState([
    {
      id: 1,
      institucion: 'Universidad Tecnológica',
      titulo: 'Ingeniería en Sistemas',
      fechaInicio: '2018-09-01',
      fechaFin: '2022-06-30',
      descripcion: 'Especialización en desarrollo de software y tecnologías web.'
    }
  ]);

  const [nuevaFormacion, setNuevaFormacion] = useState({
    institucion: '',
    titulo: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregarFormacion = () => {
    if (nuevaFormacion.institucion && nuevaFormacion.titulo) {
      const nueva = {
        id: Date.now(),
        ...nuevaFormacion
      };
      setFormaciones([...formaciones, nueva]);
      setNuevaFormacion({
        institucion: '',
        titulo: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
      });
      setMostrarFormulario(false);
    }
  };

  const handleEliminarFormacion = (id: number) => {
    setFormaciones(formaciones.filter(f => f.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${colorClasses.text.red500}`}>
          Formación Académica
        </h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className={`px-4 py-2 ${colors.mainRed} font-medium rounded-md transition-colors`}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Agregar Formación'}
        </button>
      </div>

      {/* Formulario para nueva formación */}
      {mostrarFormulario && (
        <div className={`border ${colorClasses.border.gray200} rounded-lg p-6 mb-6 ${colorClasses.background.gray50}`}>
          <h3 className="text-lg font-semibold mb-4">Nueva Formación Académica</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Institución Educativa *
              </label>
              <input
                type="text"
                placeholder="Universidad o Instituto"
                value={nuevaFormacion.institucion}
                onChange={(e) => setNuevaFormacion({...nuevaFormacion, institucion: e.target.value})}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${colorClasses.text.gray900}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Título Obtenido *
              </label>
              <input
                type="text"
                placeholder="Título o Certificación"
                value={nuevaFormacion.titulo}
                onChange={(e) => setNuevaFormacion({...nuevaFormacion, titulo: e.target.value})}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${colorClasses.text.gray900}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={nuevaFormacion.fechaInicio}
                onChange={(e) => setNuevaFormacion({...nuevaFormacion, fechaInicio: e.target.value})}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${colorClasses.text.gray900}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
                Fecha de Finalización
              </label>
              <input
                type="date"
                value={nuevaFormacion.fechaFin}
                onChange={(e) => setNuevaFormacion({...nuevaFormacion, fechaFin: e.target.value})}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${colorClasses.text.gray900}`}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              placeholder="Descripción de la formación académica"
              rows={3}
              value={nuevaFormacion.descripcion}
              onChange={(e) => setNuevaFormacion({...nuevaFormacion, descripcion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAgregarFormacion}
              className={`px-6 py-2 ${colors.mainRed} font-medium rounded-md transition-colors`}
            >
              Guardar Formación
            </button>
            <button
              onClick={() => setMostrarFormulario(false)}
              className={`px-6 py-2 ${colorClasses.text.gray600} font-medium border border-gray-300 rounded-md hover:${colorClasses.background.gray50} transition-colors`}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de formaciones */}
      <div className="space-y-4">
        {formaciones.map((formacion) => (
          <div key={formacion.id} className={`border ${colorClasses.border.gray200} rounded-lg p-4`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${colorClasses.text.gray900}`}>{formacion.titulo}</h3>
                <p className={`${colorClasses.text.gray600} font-medium`}>{formacion.institucion}</p>
                <div className={`flex gap-4 text-sm ${colorClasses.text.gray600} mt-2`}>
                  {formacion.fechaInicio && (
                    <span>Inicio: {new Date(formacion.fechaInicio).toLocaleDateString()}</span>
                  )}
                  {formacion.fechaFin && (
                    <span>Fin: {new Date(formacion.fechaFin).toLocaleDateString()}</span>
                  )}
                </div>
                {formacion.descripcion && (
                  <p className={`${colorClasses.text.gray600} mt-2`}>{formacion.descripcion}</p>
                )}
              </div>
              <button
                onClick={() => handleEliminarFormacion(formacion.id)}
                className={`${colorClasses.text.red500} hover:${colorClasses.text.red500} p-2`}
                title="Eliminar formación"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {formaciones.length === 0 && (
        <div className={`text-center py-8 ${colorClasses.text.gray600}`}>
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <p>No tienes formación académica registrada</p>
          <p className="text-sm">Haz clic en &quot;Agregar Formación&quot; para comenzar</p>
        </div>
      )}
    </div>
  );
};
