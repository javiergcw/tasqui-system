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
}

export const AdminProfileMainSection: React.FC<AdminProfileMainSectionProps> = ({ 
  profile, 
  isLoading = false,
  tickets,
  isLoadingTickets = false
}) => {
  const [activeTab, setActiveTab] = useState('admin-data');
  
  // Obtener email del usuario desde localStorage
  const getUserEmail = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          return userData.email || 'System Administrator';
        } catch (e) {
          return 'System Administrator';
        }
      }
    }
    return 'System Administrator';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'admin-data':
        return <AdminDataForm profile={profile} isLoading={isLoading} />;
      case 'dashboard':
        return <DashboardTab />;
      case 'tickets':
        return <TicketsTab tickets={tickets} isLoading={isLoadingTickets} />;
      case 'employees':
        return <EmployeesTab />;
      default:
        return <AdminDataForm profile={profile} isLoading={isLoading} />;
    }
  };

  return (
    <section className={`py-16 ${colorClasses.background.gray50}`}>
      <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-3">
        <div className="grid lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Columna izquierda - Perfil y navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Perfil del admin */}
              <div className="text-center mb-8">
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

              {/* Menú de navegación */}
              <nav className="w-full">
                {/* Admin Data */}
                <div
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${activeTab === 'admin-data'
                    ? 'border border-dashed rounded-md'
                    : 'text-slate-800'
                    }`}
                  style={activeTab === 'admin-data' ? { backgroundColor: colors.mainGreen } : {}}
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
                  <div className={`flex items-center px-4 ${activeTab === 'admin-data' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Admin Data
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Dashboard */}
                <div
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${activeTab === 'dashboard'
                    ? 'border border-dashed rounded-md'
                    : 'text-slate-800'
                    }`}
                  style={activeTab === 'dashboard' ? { backgroundColor: colors.mainGreen } : {}}
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
                  <div className={`flex items-center px-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Tickets */}
                <div
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${activeTab === 'tickets'
                    ? 'border border-dashed rounded-md'
                    : 'text-slate-800'
                    }`}
                  style={activeTab === 'tickets' ? { backgroundColor: colors.mainGreen } : {}}
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
                  <div className={`flex items-center px-4 ${activeTab === 'tickets' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Support Tickets
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Employees */}
                <div
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${activeTab === 'employees'
                    ? 'border border-dashed rounded-md'
                    : 'text-slate-800'
                    }`}
                  style={activeTab === 'employees' ? { backgroundColor: colors.mainGreen } : {}}
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
                  <div className={`flex items-center px-4 ${activeTab === 'employees' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Employees
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Columna derecha - Contenido dinámico */}
          <div className="lg:col-span-3">
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
}

const AdminDataForm: React.FC<AdminDataFormProps> = ({ profile, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    adminName: '',
    role: '',
    department: '',
    employeeId: '',
    email: '',
    phone: '',
    joinDate: '',
    permissions: '',
    scopeNotes: ''
  });

  // Cargar datos del perfil cuando estén disponibles
  React.useEffect(() => {
    if (profile) {
      setFormData({
        adminName: profile.display_name || '',
        role: 'System Administrator', // No disponible en el backend
        department: 'IT Support', // No disponible en el backend
        employeeId: 'N/A', // No disponible en el backend
        email: 'N/A', // No disponible en el backend
        phone: 'N/A', // No disponible en el backend
        joinDate: profile.created_at || '',
        permissions: profile.can_publish_direct ? 'Full Access' : 'Limited Access',
        scopeNotes: profile.scope_notes || ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Implementar lógica de guardado
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading admin information...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Admin Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-white"
          style={{
            backgroundColor: isEditing ? '#16a34a' : colors.mainGreen
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isEditing ? '#15803d' : colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isEditing ? '#16a34a' : colors.mainGreen;
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Information'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Name
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
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
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            >
              <option value="System Administrator">System Administrator</option>
              <option value="Support Manager">Support Manager</option>
              <option value="Technical Lead">Technical Lead</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
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
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
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
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <select
              name="permissions"
              value={formData.permissions}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
              style={{
                '--tw-ring-color': colors.mainGreen
              } as React.CSSProperties}
            >
              <option value="Full Access">Full Access</option>
              <option value="Read Only">Read Only</option>
              <option value="Limited Access">Limited Access</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-8"></div>

        {/* Scope Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scope Notes
          </label>
          <textarea
            name="scopeNotes"
            value={formData.scopeNotes}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-lg transition-colors duration-200"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverGreen;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.mainGreen;
              }}
            >
              Save Changes
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
    { title: 'Total Tickets', value: '156', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600' },
    { title: 'Open Tickets', value: '23', color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600' },
    { title: 'In Progress', value: '45', color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-600' },
    { title: 'Resolved', value: '88', color: 'bg-green-50 border-green-200', iconColor: 'text-green-600' }
  ];

  const recentTickets = [
    { id: '1', title: 'Login Issue', company: 'TechCorp', status: 'Open', priority: 'High', created: '2024-01-20' },
    { id: '2', title: 'Payment Problem', company: 'FinanceCo', status: 'In Progress', priority: 'Medium', created: '2024-01-19' },
    { id: '3', title: 'Feature Request', company: 'StartupXYZ', status: 'Open', priority: 'Low', created: '2024-01-18' },
    { id: '4', title: 'Bug Report', company: 'DevCorp', status: 'Resolved', priority: 'High', created: '2024-01-17' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Tickets</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Assign</button>
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
          <p className="mt-4 text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Support Tickets Management</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company ID</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedTicket.company_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
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
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Engineering':
        return 'bg-blue-100 text-blue-800';
      case 'Design':
        return 'bg-purple-100 text-purple-800';
      case 'Management':
        return 'bg-yellow-100 text-yellow-800';
      case 'Analytics':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Employees Management</h2>
        <div className="text-sm text-gray-600">
          Total: {employees.length} employees
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="management">Management</option>
              <option value="analytics">Analytics</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                      <button className="text-green-600 hover:text-green-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No employees found matching your criteria.</div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};
