'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

export const VacantesAplicadas: React.FC = () => {
  const [aplicaciones, setAplicaciones] = useState([
    {
      id: 1,
      empresa: 'Tech Solutions Inc.',
      puesto: 'Desarrollador Frontend',
      fecha: '2024-01-15',
      estado: 'En revisión',
      salario: '$3,000 - $4,000',
      ubicacion: 'Ciudad de México',
      descripcion: 'Buscamos un desarrollador frontend con experiencia en React, TypeScript y Node.js para unirse a nuestro equipo de desarrollo.',
      requisitos: ['React', 'TypeScript', 'Node.js', 'Git', '2+ años de experiencia'],
      beneficios: ['Seguro médico', 'Vales de despensa', 'Home office', 'Capacitaciones'],
      contacto: 'hr@techsolutions.com',
      telefono: '+52 55 1234 5678'
    },
    {
      id: 2,
      empresa: 'Digital Agency',
      puesto: 'Diseñador UX/UI',
      fecha: '2024-01-10',
      estado: 'Entrevista programada',
      salario: '$2,500 - $3,500',
      ubicacion: 'Guadalajara',
      descripcion: 'Agencia digital busca diseñador UX/UI creativo para trabajar en proyectos innovadores y colaborar con equipos multidisciplinarios.',
      requisitos: ['Figma', 'Adobe Creative Suite', 'Principios UX/UI', 'Portfolio sólido', '1+ años de experiencia'],
      beneficios: ['Ambiente creativo', 'Proyectos diversos', 'Crecimiento profesional', 'Equipos modernos'],
      contacto: 'talent@digitalagency.com',
      telefono: '+52 33 9876 5432'
    },
    {
      id: 3,
      empresa: 'StartupXYZ',
      puesto: 'Full Stack Developer',
      fecha: '2024-01-05',
      estado: 'Rechazado',
      salario: '$4,000 - $5,000',
      ubicacion: 'Monterrey',
      descripcion: 'Startup en crecimiento busca desarrollador full stack para liderar el desarrollo de nuestra plataforma principal.',
      requisitos: ['React', 'Node.js', 'MongoDB', 'AWS', '3+ años de experiencia'],
      beneficios: ['Equity', 'Crecimiento rápido', 'Tecnología de vanguardia', 'Equipo joven'],
      contacto: 'jobs@startupxyz.com',
      telefono: '+52 81 5555 1234'
    }
  ]);

  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<typeof aplicaciones[0] | null>(null);

  const aplicacionesFiltradas = aplicaciones.filter(aplicacion =>
    filtroEstado === 'todos' || aplicacion.estado === filtroEstado
  );

  const handleCancelarAplicacion = (id: number) => {
    setAplicaciones(aplicaciones.filter(a => a.id !== id));
  };

  const handleVerDetalles = (aplicacion: typeof aplicaciones[0]) => {
    setAplicacionSeleccionada(aplicacion);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAplicacionSeleccionada(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'En revisión':
        return 'bg-yellow-100 text-yellow-800';
      case 'Entrevista programada':
        return 'bg-blue-100 text-blue-800';
      case 'Aceptado':
        return 'bg-green-100 text-green-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Mis Vacantes Aplicadas
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="todos">Todos los estados</option>
            <option value="En revisión">En revisión</option>
            <option value="Entrevista programada">Entrevista programada</option>
            <option value="Aceptado">Aceptado</option>
            <option value="Rechazado">Rechazado</option>
          </select>
          <span className="text-sm text-gray-500">
            {aplicacionesFiltradas.length} aplicaciones
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Empresa
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Puesto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Ubicación
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Salario
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aplicacionesFiltradas.map((aplicacion) => (
              <tr key={aplicacion.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-semibold text-gray-600">
                        {aplicacion.empresa.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{aplicacion.empresa}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {aplicacion.puesto}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {aplicacion.ubicacion}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(aplicacion.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(aplicacion.estado)}`}>
                    {aplicacion.estado}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                  {aplicacion.salario}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleVerDetalles(aplicacion)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Ver detalles"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {aplicacion.estado !== 'Rechazado' && aplicacion.estado !== 'Aceptado' && (
                      <button
                        onClick={() => handleCancelarAplicacion(aplicacion.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Cancelar aplicación"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {aplicacionesFiltradas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg font-medium">No hay aplicaciones</p>
          <p className="text-sm">
            {filtroEstado === 'todos'
              ? 'No has aplicado a ninguna vacante aún'
              : `No hay aplicaciones con estado "${filtroEstado}"`
            }
          </p>
        </div>
      )}

      {/* Modal de Detalles */}
      {modalAbierto && aplicacionSeleccionada && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
        // cambio: reemplazo "bg-black bg-opacity-50" por "bg-black/50" y agrego blur suave opcional
        >
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Detalles de la Vacante
              </h3>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Información Principal */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {aplicacionSeleccionada.empresa.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {aplicacionSeleccionada.puesto}
                  </h4>
                  <p className="text-lg text-gray-600 mb-2">{aplicacionSeleccionada.empresa}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {aplicacionSeleccionada.ubicacion}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {aplicacionSeleccionada.salario}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getEstadoColor(aplicacionSeleccionada.estado)}`}>
                    {aplicacionSeleccionada.estado}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Aplicado: {new Date(aplicacionSeleccionada.fecha).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-2">Descripción del Puesto</h5>
                <p className="text-gray-600 leading-relaxed">{aplicacionSeleccionada.descripcion}</p>
              </div>

              {/* Requisitos */}
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Requisitos</h5>
                <div className="flex flex-wrap gap-2">
                  {aplicacionSeleccionada.requisitos.map((requisito: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {requisito}
                    </span>
                  ))}
                </div>
              </div>

              {/* Beneficios */}
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Beneficios</h5>
                <div className="grid grid-cols-2 gap-2">
                  {aplicacionSeleccionada.beneficios.map((beneficio: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {beneficio}
                    </div>
                  ))}
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">Información de Contacto</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{aplicacionSeleccionada.contacto}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{aplicacionSeleccionada.telefono}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              {aplicacionSeleccionada.estado !== 'Rechazado' && aplicacionSeleccionada.estado !== 'Aceptado' && (
                <button
                  onClick={() => {
                    handleCancelarAplicacion(aplicacionSeleccionada.id);
                    cerrarModal();
                  }}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancelar Aplicación
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
