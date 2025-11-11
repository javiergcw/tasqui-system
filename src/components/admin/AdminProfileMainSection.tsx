'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { colorClasses, colors } from '@/lib/colors';
import { UnderConstruction } from '@/components';
import { Toast } from '@/components/ui/Toast';
import type { AdminProfile, AdminTicket, AdminStatsData, AdminLead } from '@/models';
import type { TicketStatus } from '@/models/admin/ticket.model';
import type { AdminLeadRole, ConvertAdminLeadRequest } from '@/models/admin/lead.model';

interface AdminProfileMainSectionProps {
  profile?: AdminProfile | null;
  isLoading?: boolean;
  tickets?: AdminTicket[];
  isLoadingTickets?: boolean;
  statsData?: AdminStatsData | null;
  isLoadingStats?: boolean;
  leads?: AdminLead[];
  isLoadingLeads?: boolean;
  onProfileUpdate?: (data: { display_name?: string; scope_notes?: string; can_publish_direct?: boolean }) => Promise<void>;
  onTicketStatusUpdate?: (ticketId: string, status: TicketStatus) => Promise<AdminTicket>;
  onRefreshTickets?: () => Promise<void>;
  onConvertLead?: (leadId: string, data: ConvertAdminLeadRequest) => Promise<void>;
  onUpdateLeadEmail?: (leadId: string, email: string) => Promise<void>;
}

export const AdminProfileMainSection: React.FC<AdminProfileMainSectionProps> = ({ 
  profile, 
  isLoading = false,
  tickets,
  isLoadingTickets = false,
  statsData,
  isLoadingStats = false,
  leads,
  isLoadingLeads = false,
  onProfileUpdate,
  onTicketStatusUpdate,
  onRefreshTickets,
  onConvertLead,
  onUpdateLeadEmail
}) => {
  const [activeTab, setActiveTab] = useState('admin-data');
  const [userEmail, setUserEmail] = useState('Administrador del Sistema');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.email) {
        setUserEmail(parsedUser.email);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'admin-data':
        return <AdminDataForm profile={profile} isLoading={isLoading} onProfileUpdate={onProfileUpdate} />;
      case 'dashboard':
        return <DashboardTab statsData={statsData} isLoading={isLoadingStats} />;
      case 'tickets':
        return <TicketsTab 
          tickets={tickets} 
          isLoading={isLoadingTickets}
          onTicketStatusUpdate={onTicketStatusUpdate}
          onRefreshTickets={onRefreshTickets}
        />;
      case 'employees':
        return <EmployeesTab />;
      case 'leads':
        return <LeadsTab leads={leads} isLoading={isLoadingLeads} onConvertLead={onConvertLead} onUpdateLeadEmail={onUpdateLeadEmail} />;
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
                  {userEmail}
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

                  {/* Leads */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'leads'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'leads' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'leads') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'leads') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('leads')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a4 4 0 00-3-3.874M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2a4 4 0 013-3.874m0 0a3.001 3.001 0 11-4.005-3.52M10 14.126a3.001 3.001 0 104.005-3.52M12 7a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    <span>Leads</span>
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
interface DashboardTabProps {
  statsData?: AdminStatsData | null;
  isLoading?: boolean;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ statsData, isLoading = false }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminStatsData['latest_tickets'][number] | null>(null);
  const ticketStats = statsData?.ticket_statistics;

  const stats = [
    { title: 'Total de Tickets', value: ticketStats?.total ?? 0, color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600' },
    { title: 'Tickets Abiertos', value: ticketStats?.by_status?.OPEN ?? 0, color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600' },
    { title: 'En Progreso', value: ticketStats?.by_status?.IN_PROGRESS ?? 0, color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-600' },
    { title: 'Resueltos', value: ticketStats?.by_status?.RESOLVED ?? 0, color: 'bg-green-50 border-green-200', iconColor: 'text-green-600' }
  ];

  const recentTickets = statsData?.latest_tickets ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.company_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                          {ticket.status}
                        </span>
                      </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(ticket.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setIsModalOpen(true);
                      }}
                      className="text-green-600 hover:text-green-900 transition-colors"
                    >
                      Ver
                    </button>
                  </td>
                    </tr>
                  ))}
              {recentTickets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No hay tickets recientes disponibles.
                  </td>
                </tr>
              )}
                </tbody>
              </table>
            </div>
        </div>

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl backdrop-blur-xl">
            <div className="absolute -inset-32 bg-gradient-to-br from-green-200/40 via-white/30 to-transparent blur-3xl" aria-hidden="true" />
            <div className="relative p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Ticket reciente</p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">{selectedTicket.title}</h3>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedTicket(null);
                  }}
                  className="rounded-full bg-white/80 p-2 text-gray-500 transition hover:bg-white hover:text-gray-700"
                  aria-label="Cerrar detalle del ticket"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
          </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Estado</p>
                  <span className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-green-200 px-3 py-1 text-sm font-semibold text-green-700">
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Empresa</p>
                  <p className="mt-2 text-sm text-gray-900">{selectedTicket.company_id}</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Solicitado por</p>
                  <p className="mt-2 text-sm text-gray-900">{selectedTicket.requested_by_user_id}</p>
                </div>
                {selectedTicket.assigned_admin_id ? (
                  <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Administrador asignado</p>
                    <p className="mt-2 text-sm text-gray-900">{selectedTicket.assigned_admin_id}</p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Administrador asignado</p>
                    <p className="mt-2 text-sm text-gray-500">Sin asignar</p>
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Descripción</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-900 whitespace-pre-line">{selectedTicket.description}</p>
              </div>

              <div className="rounded-3xl bg-white/60 p-6 shadow-sm backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Notas</p>
                {Array.isArray(selectedTicket.notes) && selectedTicket.notes.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {selectedTicket.notes.map(note => (
                      <div key={note.id} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
                        <p className="text-sm leading-relaxed text-gray-900 whitespace-pre-line">{note.note}</p>
                        <div className="mt-3 flex flex-col text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                          <span>ID Nota: {note.id}</span>
                          <span>
                            {new Date(note.created_at).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                        </span>
                        </div>
                      </div>
                  ))}
            </div>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Este ticket aún no tiene notas registradas.
                  </p>
          )}
        </div>

              <div className="flex flex-col gap-3 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-medium text-gray-600">Creado:</span>{' '}
                  {new Date(selectedTicket.created_at).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
      </div>
                <div>
                  <span className="font-medium text-gray-600">Actualizado:</span>{' '}
                  {new Date(selectedTicket.updated_at).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  {selectedTicket.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => router.push(`/admin/post-job?ticket_id=${selectedTicket.id}`)}
                      className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Crear nuevo trabajo
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedTicket(null);
                    }}
                    className="rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-black"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tickets Tab Component (Admin version with management capabilities)
interface TicketsTabProps {
  tickets?: AdminTicket[];
  isLoading?: boolean;
  onTicketStatusUpdate?: (ticketId: string, status: TicketStatus) => Promise<AdminTicket>;
  onRefreshTickets?: () => Promise<void>;
}

const TicketsTab: React.FC<TicketsTabProps> = ({ 
  tickets = [], 
  isLoading = false,
  onTicketStatusUpdate,
  onRefreshTickets
}) => {
  const router = useRouter();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [localTickets, setLocalTickets] = useState<AdminTicket[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Filtrar tickets para excluir CLOSED y actualizar tickets locales cuando cambien los tickets prop
  React.useEffect(() => {
    const filteredTickets = tickets.filter(ticket => ticket.status !== 'CLOSED');
    setLocalTickets(filteredTickets);
  }, [tickets]);

  const columns = [
    { id: 'OPEN', title: 'Abierto', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'IN_PROGRESS', title: 'En Progreso', color: 'bg-blue-100 border-blue-300' },
    { id: 'RESOLVED', title: 'Resuelto', color: 'bg-purple-100 border-purple-300' }
  ];

  const getTicketsByStatus = (status: string) => {
    return localTickets.filter(ticket => ticket.status === status);
  };

  const handleViewTicket = (ticket: AdminTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    if (!onTicketStatusUpdate) return;
    
    try {
      setIsUpdatingStatus(true);
      const updatedTicket = await onTicketStatusUpdate(ticketId, newStatus as TicketStatus);
      
      // Actualizar el ticket en la lista local
      setLocalTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId ? updatedTicket : ticket
        )
      );
      
      // Si el ticket seleccionado es el que se actualizó, actualizarlo también
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }
      
      // Refrescar la lista completa si hay función de refresh
      if (onRefreshTickets) {
        await onRefreshTickets();
      }
      
      // Mostrar notificación de éxito y cerrar el modal
      setToast({
        show: true,
        message: 'Estado del ticket actualizado exitosamente',
        type: 'success'
      });
      
      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        setIsDetailModalOpen(false);
      }, 500);
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al actualizar el estado del ticket. Por favor, intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'RESOLVED':
        return 'bg-purple-100 text-purple-800';
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
          <p className="text-sm text-gray-600 mt-1">Haz clic en un ticket para ver detalles y cambiar su estado</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg border-2 border-dashed p-4 md:p-6 h-[500px] md:h-[600px] flex flex-col w-full md:min-w-[320px]`}
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
                    onClick={() => handleViewTicket(ticket)}
                    className="bg-white p-3 md:p-5 rounded-lg shadow-sm border border-gray-200 flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow duration-200"
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
                      disabled={isUpdatingStatus}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="OPEN">Abierto</option>
                      <option value="IN_PROGRESS">En Progreso</option>
                      <option value="RESOLVED">Resuelto</option>
                      <option value="CLOSED">Cerrado</option>
                    </select>
                    {isUpdatingStatus && (
                      <p className="mt-1 text-xs text-gray-500">Actualizando...</p>
                    )}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                {Array.isArray(selectedTicket.notes) && selectedTicket.notes.length > 0 ? (
                  <div className="space-y-3">
                    {selectedTicket.notes.map(note => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.note}</p>
                        <div className="mt-2 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span>ID Nota: {note.id}</span>
                          <span>
                            {new Date(note.created_at).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    Este ticket aún no tiene notas registradas.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center gap-4">
                  <button
                    onClick={() => {
                      if (selectedTicket) {
                        router.push(`/admin/post-job?ticket_id=${selectedTicket.id}`);
                      }
                    }}
                    disabled={selectedTicket?.status !== 'IN_PROGRESS'}
                    className="px-4 py-2 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: colors.mainGreen }}
                    onMouseEnter={(e) => {
                      if (selectedTicket?.status === 'IN_PROGRESS') {
                        e.currentTarget.style.backgroundColor = colors.hoverGreen;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTicket?.status === 'IN_PROGRESS') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                      }
                    }}
                    title={selectedTicket?.status !== 'IN_PROGRESS' ? 'El ticket debe estar en estado "En Progreso" para crear un trabajo' : ''}
                  >
                    Crear Trabajo desde este Ticket
                  </button>
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                </div>
                {selectedTicket?.status !== 'IN_PROGRESS' && (
                  <p className="text-xs text-gray-500 italic">
                    El ticket debe estar en estado "En Progreso" para crear un trabajo
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

// Employees Tab Component
const EmployeesTab: React.FC = () => (
  <UnderConstruction
    title="Gestión de empleados en construcción"
    description="Muy pronto podrás visualizar, filtrar y administrar a todos los empleados desde este panel."
    hint="Nuestro equipo está trabajando para habilitar esta experiencia dentro del portal de administradores."
  />
);

interface LeadsTabProps {
  leads?: AdminLead[];
  isLoading?: boolean;
  onConvertLead?: (leadId: string, data: ConvertAdminLeadRequest) => Promise<void>;
  onUpdateLeadEmail?: (leadId: string, email: string) => Promise<void>;
}

const LeadsTab: React.FC<LeadsTabProps> = ({ leads = [], isLoading = false, onConvertLead, onUpdateLeadEmail }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);
  const [tempPassword, setTempPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<AdminLeadRole>('EMPLOYEE');
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedLeadForEmail, setSelectedLeadForEmail] = useState<AdminLead | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const roleOptions: { label: string; value: AdminLeadRole; description: string }[] = [
    { label: 'Empleado', value: 'EMPLOYEE', description: 'Acceso al portal de candidatos.' },
    { label: 'Empresa', value: 'COMPANY', description: 'Acceso al panel de empleadores.' },
    { label: 'Administrador', value: 'ADMIN', description: 'Acceso completo al panel administrativo.' },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-800';
      case 'QUALIFIED':
        return 'bg-green-100 text-green-800';
      case 'NEGOTIATION':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFullName = (lead: AdminLead) => {
    const fullName = `${lead.first_name ?? ''} ${lead.last_name ?? ''}`.trim();
    return fullName.length > 0 ? fullName : 'Sin nombre';
  };

  const handleOpenModal = (lead: AdminLead) => {
    setSelectedLead(lead);
    setTempPassword('ClaveTemporal123!');
    setSelectedRole('EMPLOYEE');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
    setFormError(null);
  };

  const handleOpenEmailModal = (lead: AdminLead) => {
    setSelectedLeadForEmail(lead);
    setNewEmail(lead.email ?? '');
    setEmailError(null);
    setIsEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
    setSelectedLeadForEmail(null);
    setEmailError(null);
    setNewEmail('');
  };

  const handleSendEmail = async () => {
    if (!onConvertLead || !selectedLead) {
      return;
    }

    if (!tempPassword.trim()) {
      setFormError('La contraseña temporal es obligatoria.');
      return;
    }

    setFormError(null);
    setIsSending(true);
    try {
      await onConvertLead(selectedLead.id, {
        password: tempPassword.trim(),
        role: selectedRole,
      });
      setToast({
        show: true,
        message: 'Correo enviado exitosamente.',
        type: 'success',
      });
      handleCloseModal();
    } catch (error) {
      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : 'No se pudo enviar el correo al lead. Intenta nuevamente.',
        type: 'error',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!onUpdateLeadEmail || !selectedLeadForEmail) {
      return;
    }

    const trimmedEmail = newEmail.trim();
    if (!trimmedEmail) {
      setEmailError('El correo electrónico es obligatorio.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Ingresa un correo electrónico válido.');
      return;
    }

    setEmailError(null);
    setIsUpdatingEmail(true);
    try {
      await onUpdateLeadEmail(selectedLeadForEmail.id, trimmedEmail);
      setToast({
        show: true,
        message: 'Correo del lead actualizado correctamente.',
        type: 'success',
      });
      handleCloseEmailModal();
    } catch (error) {
      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el correo del lead. Intenta nuevamente.',
        type: 'error',
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Leads</h2>
          <p className="text-sm text-gray-600 mt-1">Monitorea y da seguimiento a los leads que llegan a la plataforma.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Exportar CSV
          </button>
          <button
            className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Nuevo Lead
          </button>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Aún no hay leads registrados</h3>
          <p className="text-sm text-gray-500">Cuando existan leads en la plataforma aparecerán aquí.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compañía</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{getFullName(lead)}</p>
                        <p className="text-xs text-gray-500">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.company || 'No especificado'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.source || 'Desconocido'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(lead.updated_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-full p-2 text-gray-500 hover:text-green-600 transition-colors"
                          onClick={() => router.push(`/admin/leads/${lead.id}`)}
                          aria-label="Ver lead"
                          title="Ver lead"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                        <button
                          className="rounded-full p-2 text-gray-500 hover:text-green-600 transition-colors disabled:opacity-40"
                          onClick={() => handleOpenModal(lead)}
                          disabled={!onConvertLead}
                          aria-label="Enviar acceso"
                          title="Enviar acceso"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M11 11l6 6m0 0h3m-3 0v3"
                            />
                          </svg>
                        </button>
                        <button
                          className="rounded-full p-2 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-40"
                          onClick={() => handleOpenEmailModal(lead)}
                          disabled={!onUpdateLeadEmail}
                          aria-label="Actualizar correo"
                          title="Actualizar correo"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v5m-8-5v5m-3 4h14"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
            Mostrando {leads.length} leads
          </div>
        </div>
      )}

      {isEmailModalOpen && selectedLeadForEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              onClick={handleCloseEmailModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Actualizar correo</h3>
              <p className="text-sm text-gray-500">
                Cambia el correo electrónico de <span className="font-medium">{getFullName(selectedLeadForEmail)}</span>.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nuevo correo electrónico</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                {emailError && <p className="mt-2 text-xs text-red-600">{emailError}</p>}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={handleCloseEmailModal}
                className="rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateEmail}
                disabled={isUpdatingEmail || !onUpdateLeadEmail}
                className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdatingEmail ? 'Actualizando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl px-4">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/85 via-white/70 to-white/40 shadow-[0_50px_80px_-40px_rgba(15,23,42,0.4)]" />
            <div className="relative rounded-3xl border border-white/60 bg-white/80 p-8 backdrop-blur-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-500">Enviar credenciales</p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {getFullName(selectedLead)}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedLead.email}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="rounded-full bg-white/70 p-2 text-gray-500 transition hover:bg-white hover:text-gray-700"
                  aria-label="Cerrar"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña temporal</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tempPassword}
                      onChange={(e) => setTempPassword(e.target.value)}
                      placeholder="Ingresa una contraseña temporal"
                      className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-gray-900 shadow-inner focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-300">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15l-3.5-3.5m3.5 3.5l3.5-3.5M12 15V9" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Comparte esta contraseña temporal con el lead. Podrá cambiarla después de iniciar sesión.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Rol de acceso</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {roleOptions.map((option) => {
                      const isActive = selectedRole === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedRole(option.value)}
                          className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                            isActive
                              ? 'border-transparent bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                              : 'border-gray-200 bg-white/70 text-gray-700 hover:border-gray-300 hover:bg-white'
                          }`}
                        >
                          <span className="block text-sm font-semibold">{option.label}</span>
                          <span className={`mt-1 block text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                            {option.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {formError && (
                  <div className="rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={handleCloseModal}
                  className="rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={isSending || !onConvertLead}
                  className="rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? 'Enviando...' : 'Enviar credenciales'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};
