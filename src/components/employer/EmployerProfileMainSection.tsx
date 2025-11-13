'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { colorClasses, colors } from '@/lib/colors';
import type { CompanyProfile } from '@/models';
import type { Ticket } from '@/models/company/ticket.model';
import type { UpdateCompanyProfileRequest } from '@/models/company/profile.model';
import type { CompanyStatsData } from '@/models/company/stats.model';

interface LocalTicket extends Ticket {
  assigned_admin: string | null;
}

interface EmployerProfileMainSectionProps {
  profile?: CompanyProfile | null;
  isLoading?: boolean;
  onCreateTicket?: (formData: { title: string; description: string }) => Promise<Ticket>;
  isCreatingTicket?: boolean;
  tickets?: Ticket[];
  isLoadingTickets?: boolean;
  onRefreshTickets?: () => Promise<void>;
  onAddTicketNote?: (ticketId: string, note: string) => Promise<any>;
  isAddingNote?: boolean;
  onUpdateProfile?: (data: UpdateCompanyProfileRequest) => Promise<CompanyProfile>;
  isUpdatingProfile?: boolean;
  stats?: CompanyStatsData | null;
  isLoadingStats?: boolean;
}

export const EmployerProfileMainSection: React.FC<EmployerProfileMainSectionProps> = ({ 
  profile, 
  isLoading = false,
  onCreateTicket,
  isCreatingTicket = false,
  tickets = [],
  isLoadingTickets = false,
  onRefreshTickets,
  onAddTicketNote,
  isAddingNote = false,
  onUpdateProfile,
  isUpdatingProfile = false,
  stats = null,
  isLoadingStats = false
}) => {
  const [activeTab, setActiveTab] = useState('company-data');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company-data':
        return <CompanyDataForm profile={profile} isLoading={isLoading} onUpdateProfile={onUpdateProfile} isUpdatingProfile={isUpdatingProfile} />;
      case 'dashboard':
        return <DashboardTab stats={stats} isLoadingStats={isLoadingStats} />;
      case 'kanban':
        return <KanbanTab />;
      case 'tickets':
        return (
          <TicketsTab 
            onCreateTicket={onCreateTicket} 
            isCreatingTicket={isCreatingTicket}
            tickets={tickets}
            isLoadingTickets={isLoadingTickets}
            onRefreshTickets={onRefreshTickets}
            onAddTicketNote={onAddTicketNote}
            isAddingNote={isAddingNote}
          />
        );
      default:
        return <CompanyDataForm profile={profile} isLoading={isLoading} />;
    }
  };

  return (
    <section className={`py-16 ${colorClasses.background.gray50}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          {/* Perfil y navegación */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              {/* Perfil de la empresa */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {profile ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profile.legal_name?.charAt(0) || 'C'}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Company Logo"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <h3 className={`text-xl font-bold ${colorClasses.text.gray900} mb-2`}>
                  {isLoading ? 'Cargando...' : profile ? profile.legal_name || 'Empresa' : 'Empresa'}
                </h3>
                <p className={colorClasses.text.gray600}>
                  {profile?.contact_email || 'Email de contacto'}
                </p>
              </div>

              {/* Menú de navegación horizontal */}
              <nav className="w-full overflow-x-auto flex justify-center">
                <div className="flex gap-1 sm:gap-2 md:gap-4 w-full sm:w-auto justify-center">
                  {/* Company Data */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'company-data'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'company-data' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'company-data') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'company-data') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('company-data')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    <span>Datos de la Empresa</span>
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

                  {/* Kanban */}
                  <button
                    type="button"
                    className={`flex items-center px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 cursor-pointer transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base ${activeTab === 'kanban'
                      ? 'border border-dashed rounded-md'
                      : 'text-slate-800'
                      }`}
                    style={activeTab === 'kanban' ? { backgroundColor: colors.mainGreen, color: 'white' } : {}}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'kanban') {
                        e.currentTarget.style.backgroundColor = colors.mainGreen;
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'kanban') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => setActiveTab('kanban')}
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className="inline sm:hidden md:inline">Aplicaciones</span>
                    <span className="hidden sm:inline md:hidden">Apps</span>
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

// Company Data Form Component
interface CompanyDataFormProps {
  profile?: CompanyProfile | null;
  isLoading?: boolean;
  onUpdateProfile?: (data: UpdateCompanyProfileRequest) => Promise<CompanyProfile>;
  isUpdatingProfile?: boolean;
}

const CompanyDataForm: React.FC<CompanyDataFormProps> = ({ 
  profile, 
  isLoading = false,
  onUpdateProfile,
  isUpdatingProfile = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    legal_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    billing_plan: '',
    max_open_jobs: 0
  });

  // Cargar datos del perfil cuando estén disponibles
  React.useEffect(() => {
    if (profile) {
      setFormData({
        legal_name: profile.legal_name || '',
        contact_name: profile.contact_name || '',
        contact_email: profile.contact_email || '',
        contact_phone: profile.contact_phone || '',
        billing_plan: profile.billing_plan || '',
        max_open_jobs: profile.max_open_jobs || 0
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'max_open_jobs' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onUpdateProfile || !profile) return;

    try {
      await onUpdateProfile({
        legal_name: formData.legal_name,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        billing_plan: formData.billing_plan,
        max_open_jobs: formData.max_open_jobs
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // El error ya se maneja en el componente padre con el toast
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        legal_name: profile.legal_name || '',
        contact_name: profile.contact_name || '',
        contact_email: profile.contact_email || '',
        contact_phone: profile.contact_phone || '',
        billing_plan: profile.billing_plan || '',
        max_open_jobs: profile.max_open_jobs || 0
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando información de la empresa...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Información de la Empresa</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            disabled={isUpdatingProfile}
            className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              if (!isUpdatingProfile) {
                e.currentTarget.style.backgroundColor = colors.hoverGreen;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Editar Información
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              name="legal_name"
              value={formData.legal_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Contacto
            </label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico de Contacto
            </label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Teléfono
            </label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-8"></div>

        {/* Max Open Jobs */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aproximados Trabajos
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="max_open_jobs"
                  value={formData.max_open_jobs}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
                  style={{
                    '--tw-ring-color': colors.mainGreen
                  } as React.CSSProperties}
                />
              ) : (
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                  {profile.max_open_jobs || 'N/A'}
                </div>
              )}
            </div>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdatingProfile}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 py-2 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                if (!isUpdatingProfile) {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.mainGreen;
              }}
            >
              {isUpdatingProfile ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// Dashboard Tab Component
interface DashboardTabProps {
  stats?: CompanyStatsData | null;
  isLoadingStats?: boolean;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, isLoadingStats = false }) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Funciones helper para traducir estados
  const translateJobStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'OPEN': 'Activo',
      'PAUSED': 'Pausado',
      'CLOSED': 'Cerrado',
      'DRAFT': 'Borrador',
      'CANCELLED': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const translateApplicationStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Pending': 'Pendiente',
      'Reviewed': 'Revisado',
      'Interviewed': 'Entrevistado',
      'Rejected': 'Rechazado',
      'Hired': 'Contratado'
    };
    return statusMap[status] || status;
  };

  // Mapear estado de API a estado del componente
  const mapApiStatusToComponentStatus = (apiStatus: string): string => {
    const statusMap: Record<string, string> = {
      'OPEN': 'Active',
      'PAUSED': 'Paused',
      'CLOSED': 'Closed',
      'DRAFT': 'Draft',
      'CANCELLED': 'Closed'
    };
    return statusMap[apiStatus] || apiStatus;
  };

  const handleViewJob = (jobId: string) => {
    router.push(`/company/view-job/${jobId}`);
  };

  const handleEditJob = (jobId: string) => {
    router.push(`/company/edit-job/${jobId}`);
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
      // TODO: Implementar eliminación de trabajo
      console.log('Eliminar trabajo:', jobId);
    }
  };

  // Mapear datos de la API a formato del componente
  const jobs = stats?.latest_jobs.map(job => ({
    id: job.id,
    title: job.title,
    status: mapApiStatusToComponentStatus(job.status),
    apiStatus: job.status, // Guardar estado original de la API para traducción
    applications: job.applications_count,
    views: 0 // No disponible en la API actual
  })) || [];

  // Mock applications (no disponible en stats actual)
  const applications: Array<{ id: string; name: string; job: string; status: string; date: string }> = [];

  const handleToggleJobStatus = (jobId: string) => {
    // Esta funcionalidad requeriría una llamada a la API para actualizar el estado
    // Por ahora solo actualizamos localmente si es necesario
    console.log('Toggle job status:', jobId);
  };

  // Usar estadísticas de tickets de la API
  const ticketStats = stats?.ticket_statistics || { total: 0, by_status: {} };

  const filteredJobs = jobs.filter(job =>
    selectedJob === 'all' || job.id === selectedJob
  );

  const filteredApplications = applications.filter(app =>
    (selectedJob === 'all' || app.job === jobs.find(j => j.id === selectedJob)?.title) &&
    (statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase())
  );

  if (isLoadingStats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  const jobStats = stats?.job_statistics || { total: 0, by_status: {}, by_visibility: {} };
  const activeJobsCount = jobStats.by_status['OPEN'] || 0;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Panel de Control de la Empresa</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-blue-600">Total de Trabajos</p>
              <p className="text-lg md:text-2xl font-bold text-blue-900">{jobStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-green-600">Total de Aplicaciones</p>
              <p className="text-lg md:text-2xl font-bold text-green-900">
                {jobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 md:p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-yellow-600">Total de Tickets</p>
              <p className="text-lg md:text-2xl font-bold text-yellow-900">{ticketStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 md:p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-purple-600">Trabajos Activos</p>
              <p className="text-lg md:text-2xl font-bold text-purple-900">{activeJobsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Métricas de Trabajos</h3>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay trabajos</h3>
            <p className="mt-1 text-sm text-gray-500">Aún no has creado ningún trabajo.</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
              {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' :
                    job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                  }`}>
                  {translateJobStatus((job as any).apiStatus || job.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Aplicaciones:</span>
                  <span className="ml-1 font-medium">{job.applications}</span>
                </div>
                <div>
                  <span className="text-gray-500">Visualizaciones:</span>
                  <span className="ml-1 font-medium">{job.views}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleEditJob(job.id)}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleToggleJobStatus(job.id)}
                  className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                >
                  {job.status === 'Active' ? 'Pausar' : 'Activar'}
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título del Trabajo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aplicaciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visualizaciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' :
                        job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {translateJobStatus((job as any).apiStatus || job.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.views}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditJob(job.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleJobStatus(job.id)}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      {job.status === 'Active' ? 'Pausar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        )}
      </div>

      {/* Applications Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
          <h3 className="text-lg font-semibold text-gray-800">Aplicaciones</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Todos los Trabajos</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Todos los Estados</option>
              <option value="pending">Pendiente</option>
              <option value="reviewed">Revisado</option>
              <option value="interviewed">Entrevistado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay aplicaciones</h3>
            <p className="mt-1 text-sm text-gray-500">Aún no hay aplicaciones para mostrar.</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
              {filteredApplications.map((app) => (
            <div key={app.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{app.name}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                  }`}>
                  {translateApplicationStatus(app.status)}
                </span>
              </div>
              <div className="space-y-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Trabajo:</span>
                  <span className="ml-1 font-medium">{app.job}</span>
                </div>
                <div>
                  <span className="text-gray-500">Fecha:</span>
                  <span className="ml-1 font-medium">{app.date}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Ver CV
                </button>
                <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Programar
                </button>
                <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trabajo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.job}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                      }`}>
                      {translateApplicationStatus(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">Ver CV</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Programar</button>
                    <button className="text-green-600 hover:text-green-800">Rechazar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

// Kanban Tab Component
const KanbanTab: React.FC = () => {
  const [applications] = useState([
    { id: '1', name: 'John Smith', job: 'Frontend Developer', status: 'pending', date: '2024-01-20', email: 'john@email.com' },
    { id: '2', name: 'Sarah Johnson', job: 'Frontend Developer', status: 'reviewed', date: '2024-01-19', email: 'sarah@email.com' },
    { id: '3', name: 'Mike Wilson', job: 'Backend Developer', status: 'hired', date: '2024-01-18', email: 'mike@email.com' },
    { id: '4', name: 'Emily Davis', job: 'UI/UX Designer', status: 'pending', date: '2024-01-17', email: 'emily@email.com' },
    { id: '5', name: 'David Brown', job: 'Backend Developer', status: 'hired', date: '2024-01-16', email: 'david@email.com' },
    { id: '6', name: 'Lisa Garcia', job: 'UI/UX Designer', status: 'reviewed', date: '2024-01-15', email: 'lisa@email.com' },
    { id: '7', name: 'Alex Rodriguez', job: 'Frontend Developer', status: 'reviewed', date: '2024-01-14', email: 'alex@email.com' },
    { id: '8', name: 'Maria Lopez', job: 'Backend Developer', status: 'reviewed', date: '2024-01-13', email: 'maria@email.com' },
    { id: '9', name: 'Carlos Mendez', job: 'UI/UX Designer', status: 'reviewed', date: '2024-01-12', email: 'carlos@email.com' },
    { id: '10', name: 'Ana Torres', job: 'Frontend Developer', status: 'reviewed', date: '2024-01-11', email: 'ana@email.com' },
    { id: '11', name: 'Roberto Silva', job: 'Backend Developer', status: 'reviewed', date: '2024-01-10', email: 'roberto@email.com' },
    { id: '12', name: 'Carmen Vega', job: 'UI/UX Designer', status: 'reviewed', date: '2024-01-09', email: 'carmen@email.com' },
    { id: '13', name: 'Jose Martinez', job: 'Frontend Developer', status: 'pending', date: '2024-01-08', email: 'jose@email.com' },
    { id: '14', name: 'Isabel Ruiz', job: 'Backend Developer', status: 'pending', date: '2024-01-07', email: 'isabel@email.com' },
    { id: '15', name: 'Fernando Castro', job: 'UI/UX Designer', status: 'hired', date: '2024-01-06', email: 'fernando@email.com' }
  ]);

  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { id: 'pending', title: 'Pendiente', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'reviewed', title: 'Revisado', color: 'bg-blue-100 border-blue-300' },
    { id: 'hired', title: 'Contratado', color: 'bg-green-100 border-green-300' }
  ];

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const handleCardClick = (application: typeof applications[0]) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedApplication(null), 300);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'Pendiente',
      'reviewed': 'Revisado',
      'hired': 'Contratado'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Aplicaciones</h2>

      {/* Kanban Board */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {columns.map(column => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg border-2 border-dashed p-4 md:p-6 h-[500px] md:h-[600px] flex flex-col w-full md:min-w-[320px]`}
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">{column.title}</h3>
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                  {getApplicationsByStatus(column.id).length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {getApplicationsByStatus(column.id).map(application => (
                  <div
                    key={application.id}
                    onClick={() => handleCardClick(application)}
                    className="bg-white p-3 md:p-5 rounded-lg shadow-sm border border-gray-200 flex-shrink-0 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">{application.name}</h4>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-2">{application.job}</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-3">{application.email}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{application.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Vista del tablero Kanban</h4>
            <p className="text-sm text-blue-700">
              Este tablero muestra las aplicaciones organizadas por estado. Puedes ver todas las aplicaciones en cada etapa del proceso de contratación.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Detalle con Estilo Apple */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Detalle de la Aplicación</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Application Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de Aplicación</label>
                    <p className="text-sm text-gray-900 font-mono">#{selectedApplication.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusLabel(selectedApplication.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Aplicación</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedApplication.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                    <p className="text-sm text-gray-900">{selectedApplication.job}</p>
                  </div>
                </div>
              </div>

              {/* Application Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApplication.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApplication.email}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
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

// Tickets Tab Component
interface TicketsTabProps {
  onCreateTicket?: (formData: { title: string; description: string }) => Promise<Ticket>;
  isCreatingTicket?: boolean;
  tickets?: Ticket[];
  isLoadingTickets?: boolean;
  onRefreshTickets?: () => Promise<void>;
  onAddTicketNote?: (ticketId: string, note: string) => Promise<any>;
  isAddingNote?: boolean;
}

const TicketsTab: React.FC<TicketsTabProps> = ({ 
  onCreateTicket, 
  isCreatingTicket = false,
  tickets = [],
  isLoadingTickets = false,
  onRefreshTickets,
  onAddTicketNote,
  isAddingNote = false
}) => {
  // Convertir tickets de la API al formato LocalTicket
  const localTickets: LocalTicket[] = tickets.map(ticket => ({
    ...ticket,
    assigned_admin: ticket.assigned_admin_id ?? null
  }));

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<LocalTicket | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [noteText, setNoteText] = useState('');

  const columns = [
    { id: 'OPEN', title: 'Abierto', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'IN_PROGRESS', title: 'En Progreso', color: 'bg-blue-100 border-blue-300' },
    { id: 'CLOSED', title: 'Cerrado', color: 'bg-green-100 border-green-300' }
  ];

  const getTicketsByStatus = (status: string) => {
    return localTickets.filter(ticket => ticket.status === status);
  };

  const handleCreateTicket = () => {
    setIsCreateModalOpen(true);
    setFormData({ title: '', description: '' });
  };

  const handleViewTicket = (ticket: LocalTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
  };

  const handleAddNote = () => {
    if (selectedTicket) {
      setIsAddNoteModalOpen(true);
      setNoteText('');
    }
  };

  const handleAddNoteFromCard = (ticket: LocalTicket, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTicket(ticket);
    setIsAddNoteModalOpen(true);
    setNoteText('');
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onCreateTicket) return;
    
    try {
      const newTicket = await onCreateTicket({
        title: formData.title,
        description: formData.description
      });
      
      // Refrescar la lista de tickets después de crear uno nuevo
      if (onRefreshTickets) {
        await onRefreshTickets();
      }
      
      setIsCreateModalOpen(false);
      setFormData({ title: '', description: '' });
    } catch (error) {
      // El error ya se maneja en el componente padre
      console.error('Error creating ticket:', error);
    }
  };

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onAddTicketNote || !selectedTicket) return;
    
    try {
      await onAddTicketNote(selectedTicket.id, noteText);
      setIsAddNoteModalOpen(false);
      setNoteText('');
    } catch (error) {
      // El error ya se maneja en el componente padre
      console.error('Error adding note:', error);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Tickets de Soporte</h2>
        <div className="flex gap-2">
          {onRefreshTickets && (
            <button
              onClick={onRefreshTickets}
              disabled={isLoadingTickets}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoadingTickets ? 'Actualizando...' : 'Actualizar'}
            </button>
          )}
          <button
            onClick={handleCreateTicket}
            className="px-4 py-2 text-white rounded-lg font-medium transition-colors duration-200"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Crear Solicitud
          </button>
        </div>
      </div>

      {isLoadingTickets ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando tickets...</p>
          </div>
        </div>
      ) : localTickets.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tickets</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer ticket de soporte.</p>
        </div>
      ) : (
        <>
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
                        className="bg-white p-3 md:p-5 rounded-lg shadow-sm border border-gray-200 flex-shrink-0 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm md:text-base">{ticket.title}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>

                        <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-3">{ticket.description}</p>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">
                            {new Date(ticket.created_at).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {ticket.assigned_admin && (
                          <div className="mb-3 text-xs text-gray-500">
                            Asignado a: {ticket.assigned_admin}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Ver detalle"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver
                          </button>
                          {onAddTicketNote && (
                            <button
                              onClick={(e) => handleAddNoteFromCard(ticket, e)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors"
                              style={{ backgroundColor: colors.mainGreen }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.hoverGreen;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.mainGreen;
                              }}
                              title="Agregar nota"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Nota
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear Nueva Solicitud</h3>
            <form onSubmit={handleSubmitCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTicket}
                  className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.mainGreen }}
                  onMouseEnter={(e) => {
                    if (!isCreatingTicket) {
                      e.currentTarget.style.backgroundColor = colors.hoverGreen;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.mainGreen;
                  }}
                >
                  {isCreatingTicket ? 'Creando...' : 'Crear Solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddNoteModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Nota al Ticket</h3>
            <form onSubmit={handleSubmitNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nota
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  placeholder="Escribe una nota sobre este ticket..."
                  required
                  maxLength={5000}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {noteText.length}/5000 caracteres
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAddingNote || !noteText.trim()}
                  className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.mainGreen }}
                  onMouseEnter={(e) => {
                    if (!isAddingNote && noteText.trim()) {
                      e.currentTarget.style.backgroundColor = colors.hoverGreen;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.mainGreen;
                  }}
                >
                  {isAddingNote ? 'Agregando...' : 'Agregar Nota'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddNoteModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Nota al Ticket</h3>
            <form onSubmit={handleSubmitNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nota
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  placeholder="Escribe una nota sobre este ticket..."
                  required
                  maxLength={5000}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {noteText.length}/5000 caracteres
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAddingNote || !noteText.trim()}
                  className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.mainGreen }}
                  onMouseEnter={(e) => {
                    if (!isAddingNote && noteText.trim()) {
                      e.currentTarget.style.backgroundColor = colors.hoverGreen;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.mainGreen;
                  }}
                >
                  {isAddingNote ? 'Agregando...' : 'Agregar Nota'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status === 'OPEN' ? 'Abierto' : 
                       selectedTicket.status === 'IN_PROGRESS' ? 'En Progreso' : 'Cerrado'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedTicket.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asignado a</label>
                    <p className="text-sm text-gray-900">{selectedTicket.assigned_admin || 'Sin asignar'}</p>
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
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(note.created_at).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
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
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {onAddTicketNote && (
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: colors.mainGreen }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.hoverGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                    }}
                  >
                    Agregar Nota
                  </button>
                )}
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
