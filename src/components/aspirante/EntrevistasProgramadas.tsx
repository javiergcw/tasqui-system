'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface Entrevista {
  id: number;
  empresa: string;
  puesto: string;
  fecha: string;
  hora: string;
  tipo: string;
  ubicacion: string;
}

export const EntrevistasProgramadas: React.FC = () => {
  const [entrevistas] = useState<Entrevista[]>([
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

  const [modalAbierto, setModalAbierto] = useState(false);
  const [entrevistaSeleccionada, setEntrevistaSeleccionada] = useState<Entrevista | null>(null);

  const abrirModal = (entrevista: Entrevista) => {
    setEntrevistaSeleccionada(entrevista);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEntrevistaSeleccionada(null);
  };

  const formatearFecha = (fecha: string, corta: boolean = false) => {
    const fechaObj = new Date(fecha);
    if (corta) {
      return fechaObj.toLocaleDateString('es-ES', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.mainGreen }}>
        Entrevistas Programadas
      </h2>
      <div className="space-y-4">
        {entrevistas.map((entrevista) => (
          <div key={entrevista.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">
                  {entrevista.empresa}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2 break-words">{entrevista.puesto}</p>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
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
              <button
                onClick={() => abrirModal(entrevista)}
                className="w-full md:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                style={{ 
                  backgroundColor: colors.mainGreen,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                }}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      {modalAbierto && entrevistaSeleccionada && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-2 sm:p-4 transition-opacity duration-200 overflow-y-auto"
          onClick={cerrarModal}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full my-auto max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex justify-between items-center p-4 sm:p-6 md:p-8 border-b border-gray-100">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 pr-2">
                Detalles de la Entrevista
              </h3>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full shrink-0"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
              {/* Información Principal */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-100">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-white shrink-0"
                  style={{ backgroundColor: colors.mainGreen }}
                >
                  {entrevistaSeleccionada.empresa.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words">
                    {entrevistaSeleccionada.empresa}
                  </h4>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4 break-words">{entrevistaSeleccionada.puesto}</p>
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
                    style={{ 
                      backgroundColor: colors.lighterGreen,
                      color: colors.sidebarGreen
                    }}
                  >
                    {entrevistaSeleccionada.tipo}
                  </div>
                </div>
              </div>

              {/* Información de Fecha y Hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: colors.lighterGreen }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.mainGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Fecha</p>
                      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mt-1 break-words">
                        <span className="hidden sm:inline">{formatearFecha(entrevistaSeleccionada.fecha)}</span>
                        <span className="sm:hidden">{formatearFecha(entrevistaSeleccionada.fecha, true)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: colors.lighterGreen }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.mainGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Hora</p>
                      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mt-1">
                        {entrevistaSeleccionada.hora}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de Ubicación */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.lighterGreen }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.mainGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Ubicación</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 break-words">
                      {entrevistaSeleccionada.ubicacion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              {entrevistaSeleccionada.tipo === 'Virtual' && (
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-blue-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">Entrevista Virtual</p>
                      <p className="text-xs sm:text-sm text-blue-700 break-words">
                        Recibirás el enlace de la reunión por correo electrónico antes de la fecha programada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {entrevistaSeleccionada.tipo === 'Presencial' && (
                <div className="bg-green-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-green-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-green-900 mb-1">Entrevista Presencial</p>
                      <p className="text-xs sm:text-sm text-green-700 break-words">
                        Por favor, llega 10 minutos antes de la hora programada. Trae contigo tu identificación y documentos relevantes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="flex justify-end gap-3 p-4 sm:p-6 md:p-8 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={cerrarModal}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
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
