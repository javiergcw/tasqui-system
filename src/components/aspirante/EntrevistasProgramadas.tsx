'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

export const EntrevistasProgramadas: React.FC = () => {
  const [entrevistas, setEntrevistas] = useState([ // setEntrevistas se usará para funcionalidades futuras
    {
      id: 1,
      empresa: 'Digital Agency',
      puesto: 'Diseñador UX/UI',
      fecha: '2024-01-25',
      hora: '10:00 AM',
      tipo: 'Presencial',
      ubicacion: 'Oficina Principal, Ciudad'
    },
    {
      id: 2,
      empresa: 'Tech Solutions Inc.',
      puesto: 'Desarrollador Frontend',
      fecha: '2024-01-28',
      hora: '2:00 PM',
      tipo: 'Virtual',
      ubicacion: 'Zoom Meeting'
    }
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ color: colors.primary[600] }}>
        Entrevistas Programadas
      </h2>
      <div className="space-y-4">
        {entrevistas.map((entrevista) => (
          <div key={entrevista.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {entrevista.empresa}
                </h3>
                <p className="text-gray-600 mb-2">{entrevista.puesto}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Fecha:</span> {entrevista.fecha}
                  </div>
                  <div>
                    <span className="font-medium">Hora:</span> {entrevista.hora}
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span> {entrevista.tipo}
                  </div>
                  <div>
                    <span className="font-medium">Ubicación:</span> {entrevista.ubicacion}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="px-4 py-2 text-white text-sm font-medium rounded-md transition-colors"
                  style={{ backgroundColor: colors.primary[500] }}
                >
                  Ver Detalles
                </button>
                <button className="px-4 py-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Reprogramar
                </button>
                <button className="px-4 py-2 text-red-600 text-sm font-medium border border-red-300 rounded-md hover:bg-red-50 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
