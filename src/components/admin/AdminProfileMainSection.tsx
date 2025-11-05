'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { colorClasses, colors } from '@/lib/colors';
import type { AdminProfile, AdminTicket } from '@/models';

interface AdminProfileMainSectionProps {
  profile?: AdminProfile | null;
  isLoading?: boolean;
  tickets?: AdminTicket[];
  isLoadingTickets?: boolean;
  onProfileUpdate?: (data: { display_name?: string; scope_notes?: string; can_publish_direct?: boolean }) => Promise<void>;
}

export const AdminProfileMainSection: React.FC<AdminProfileMainSectionProps> = ({ 
  profile, 
  isLoading = false,
  tickets,
  isLoadingTickets = false,
  onProfileUpdate
}) => {
  const [activeTab, setActiveTab] = useState('admin-data');
  
  // Obtener email del usuario desde localStorage
  const getUserEmail = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          return userData.email || 'Administrador del Sistema';
        } catch (e) {
          return 'Administrador del Sistema';
        }
      }
    }
    return 'Administrador del Sistema';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'admin-data':
        return <AdminDataForm profile={profile} isLoading={isLoading} onProfileUpdate={onProfileUpdate} />;
      case 'dashboard':
        return <DashboardTab />;
      case 'tickets':
        return <TicketsTab tickets={tickets} isLoading={isLoadingTickets} />;
      case 'employees':
        return <EmployeesTab />;
      default:
        return <AdminDataForm profile={profile} isLoading={isLoading} onProfileUpdate={onProfileUpdate} />;
    }
  };

  return (
    <section className={`py-16 ${colorClasses.background.gray50}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          {/* Perfil y navegación */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              {/* Perfil del admin */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {profile ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profile.display_name?.charAt(0) || 'A'}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Admin Avatar"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <h3 className={`text-xl font-bold ${colorClasses.text.gray900} mb-2`}>
                  {isLoading ? 'Cargando...' : profile ? profile.display_name || 'Admin' : 'Admin'}
                </h3>
                <p className={colorClasses.text.gray600}>
                  {getUserEmail()}
                </p>
              </div>

              {/* Menú de navegación horizontal */}
              <nav className="w-full overflow-x-auto flex justify-center">
                <div className="flex gap-1 sm:gap-2 md:gap-4 w-full sm:w-auto justify-center">
                  {/* Admin Data */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'admin-data'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'admin-data' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'admin-data') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'admin-data') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('admin-data')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Datos del Administrador</span>
                  </button>

                  {/* Dashboard */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'dashboard'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'dashboard' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'dashboard') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'dashboard') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Panel de Control</span>
                  </button>

                  {/* Tickets */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'tickets'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'tickets' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'tickets') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'tickets') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('tickets')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="inline sm:hidden md:inline">Tickets de Soporte</span>
                    <span className="hidden sm:inline md:hidden">Tickets</span>
                  </button>

                  {/* Employees */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'employees'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'employees' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'employees') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'employees') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('employees')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span>Empleados</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Contenido dinámico */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Admin Data Form Component
interface AdminDataFormProps {
  profile?: AdminProfile | null;
  isLoading?: boolean;
  onProfileUpdate?: (data: { display_name?: string; scope_notes?: string; can_publish_direct?: boolean }) => Promise<void>;
}

const AdminDataForm: React.FC<AdminDataFormProps> = ({ profile, isLoading = false, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    scopeNotes: '',
    canPublishDirect: false
  });

  // Cargar datos del perfil cuando estén disponibles
  React.useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.display_name || '',
        scopeNotes: profile.scope_notes || '',
        canPublishDirect: profile.can_publish_direct || false
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updateData: { display_name?: string; scope_notes?: string; can_publish_direct?: boolean } = {};
      
      if (formData.displayName !== profile?.display_name) {
        updateData.display_name = formData.displayName;
      }
      if (formData.scopeNotes !== profile?.scope_notes) {
        updateData.scope_notes = formData.scopeNotes;
      }
      if (formData.canPublishDirect !== profile?.can_publish_direct) {
        updateData.can_publish_direct = formData.canPublishDirect;
      }

      if (onProfileUpdate) {
        await onProfileUpdate(updateData);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil. Por favor, intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando información del administrador...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Información del Administrador</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            disabled={isSaving}
            className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.mainGreen
            }}
            onMouseEnter={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = colors.hoverGreen;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaving) {
                e.currentTarget.style.backgroundColor = colors.mainGreen;
              }
            }}
          >
            Editar Información
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID <span className="text-gray-400 text-xs">(solo lectura)</span>
            </label>
            <input
              type="text"
              value={profile?.id || ''}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de Usuario <span className="text-gray-400 text-xs">(solo lectura)</span>
            </label>
            <input
              type="text"
              value={profile?.user_id || ''}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Administrador
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permisos de Publicación Directa
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="canPublishDirect"
                checked={formData.canPublishDirect}
                onChange={(e) => setFormData(prev => ({ ...prev, canPublishDirect: e.target.checked }))}
                disabled={!isEditing}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-600 disabled:cursor-not-allowed"
              />
              <span className="text-sm text-gray-700">
                {formData.canPublishDirect ? 'Acceso Completo' : 'Acceso Limitado'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Creación <span className="text-gray-400 text-xs">(solo lectura)</span>
            </label>
            <input
              type="text"
              value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Última Actualización <span className="text-gray-400 text-xs">(solo lectura)</span>
            </label>
            <input
              type="text"
              value={profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-8"></div>

        {/* Scope Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas de Alcance
          </label>
          <textarea
            name="scopeNotes"
            value={formData.scopeNotes}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                // Restaurar valores originales
                if (profile) {
                  setFormData({
                    displayName: profile.display_name || '',
                    scopeNotes: profile.scope_notes || '',
                    canPublishDirect: profile.can_publish_direct || false
                  });
                }
              }}
              disabled={isSaving}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                }
              }}
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab: React.FC = () => {

  // Mock data
  const stats = [
    { title: 'Total de Tickets', value: '156', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600' },
    { title: 'Tickets Abiertos', value: '23', color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600' },
    { title: 'En Progreso', value: '45', color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-600' },
    { title: 'Resueltos', value: '88', color: 'bg-green-50 border-green-200', iconColor: 'text-green-600' }
  ];

  const recentTickets = [
    { id: '1', title: 'Login Issue', company: 'TechCorp', status: 'Open', priority: 'High', created: '2024-01-20' },
    { id: '2', title: 'Payment Problem', company: 'FinanceCo', status: 'In Progress', priority: 'Medium', created: '2024-01-19' },
    { id: '3', title: 'Feature Request', company: 'StartupXYZ', status: 'Open', priority: 'Low', created: '2024-01-18' },
    { id: '4', title: 'Bug Report', company: 'DevCorp', status: 'Resolved', priority: 'High', created: '2024-01-17' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Panel de Control del Administrador</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} p-4 md:p-6 rounded-lg border`}>
            <div className="flex items-center">
              <div className="p-2 bg-white rounded-lg">
                <svg className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tickets Recientes</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">Ver</button>
                    <button className="text-green-600 hover:text-green-900">Asignar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Tickets Tab Component (Admin version with management capabilities)
interface TicketsTabProps {
  tickets?: AdminTicket[];
  isLoading?: boolean;
}

const TicketsTab: React.FC<TicketsTabProps> = ({ tickets = [], isLoading = false }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);

  const columns = [
    { id: 'OPEN', title: 'Abierto', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'IN_PROGRESS', title: 'En Progreso', color: 'bg-blue-100 border-blue-300' },
    { id: 'CLOSED', title: 'Cerrado', color: 'bg-green-100 border-green-300' }
  ];

  const getTicketsByStatus = (status: string) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  const handleViewTicket = (ticket: AdminTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // TODO: Implementar actualización de estado en backend
    console.log('Cambiar estado del ticket', ticketId, 'a', newStatus);
  };

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    e.dataTransfer.setData('ticketId', ticketId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Do nothing
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData('ticketId');
    handleStatusChange(ticketId, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'CLOSED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Tickets de Soporte</h2>
          <p className="text-sm text-gray-600 mt-1">Arrastra los tickets entre columnas para cambiar su estado</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg border-2 border-dashed p-4 md:p-6 h-[500px] md:h-[600px] flex flex-col w-full md:min-w-[320px]`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">{column.title}</h3>
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                  {getTicketsByStatus(column.id).length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {getTicketsByStatus(column.id).map(ticket => (
                  <div
                    key={ticket.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ticket.id)}
                    onClick={() => handleViewTicket(ticket)}
                    className="bg-white p-3 md:p-5 rounded-lg shadow-sm border border-gray-200 flex-shrink-0 cursor-move hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">{ticket.title}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-3">{ticket.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{new Date(ticket.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {isDetailModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Detalle de la Solicitud</h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Ticket Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de Solicitud</label>
                    <p className="text-sm text-gray-900 font-mono">#{selectedTicket.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900"
                    >
                      <option value="OPEN">Abierto</option>
                      <option value="IN_PROGRESS">En Progreso</option>
                      <option value="CLOSED">Cerrado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de Empresa</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedTicket.company_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de Usuario</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedTicket.requested_by_user_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
                    <p className="text-sm text-gray-900">{new Date(selectedTicket.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Última Actualización</label>
                    <p className="text-sm text-gray-900">{new Date(selectedTicket.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedTicket.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Employees Tab Component
const EmployeesTab: React.FC = () => {
  const [employees] = useState([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Frontend Developer',
      department: 'Engineering',
      status: 'Active',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Backend Developer',
      department: 'Engineering',
      status: 'Active',
      joinDate: '2023-03-10',
      lastLogin: '2024-01-19',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+1 (555) 345-6789',
      position: 'UI/UX Designer',
      department: 'Design',
      status: 'Active',
      joinDate: '2023-05-20',
      lastLogin: '2024-01-18',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+1 (555) 456-7890',
      position: 'Project Manager',
      department: 'Management',
      status: 'Inactive',
      joinDate: '2022-11-01',
      lastLogin: '2024-01-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '5',
      name: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      phone: '+1 (555) 567-8901',
      position: 'DevOps Engineer',
      department: 'Engineering',
      status: 'Active',
      joinDate: '2023-07-15',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '6',
      name: 'Isabel Ruiz',
      email: 'isabel.ruiz@email.com',
      phone: '+1 (555) 678-9012',
      position: 'Data Analyst',
      department: 'Analytics',
      status: 'Active',
      joinDate: '2023-09-01',
      lastLogin: '2024-01-19',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDepartment = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Engineering':
      case 'Ingeniería':
        return 'bg-blue-100 text-blue-800';
      case 'Design':
      case 'Diseño':
        return 'bg-purple-100 text-purple-800';
      case 'Management':
      case 'Gerencia':
        return 'bg-yellow-100 text-yellow-800';
      case 'Analytics':
      case 'Analítica':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Empleados</h2>
        <div className="text-sm text-gray-600">
          Total: {employees.length} empleados
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nombre, correo o posición..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="all">Todos los Estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="all">Todos los Departamentos</option>
              <option value="engineering">Ingeniería</option>
              <option value="design">Diseño</option>
              <option value="management">Gerencia</option>
              <option value="analytics">Analítica</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Ingreso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acceso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={employee.avatar}
                          alt={employee.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                        <div className="text-sm text-gray-500">{employee.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">Ver</button>
                      <button className="text-blue-600 hover:text-blue-900">Editar</button>
                      <button className="text-red-600 hover:text-red-900">Desactivar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No se encontraron empleados que coincidan con los criterios.</div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {filteredEmployees.length} de {employees.length} empleados
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Anterior</button>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Siguiente</button>
        </div>
      </div>
    </div>
  );
};
