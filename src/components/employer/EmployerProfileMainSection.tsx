'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { colorClasses,colors } from '@/lib/colors';

export const EmployerProfileMainSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company-data');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company-data':
        return <CompanyDataForm />;
      case 'dashboard':
        return <DashboardTab />;
      case 'kanban':
        return <KanbanTab />;
      default:
        return <CompanyDataForm />;
    }
  };

  return (
    <section className={`py-16 ${colorClasses.background.gray50}`}>
      <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-3">
        <div className="grid lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Columna izquierda - Perfil y navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Perfil de la empresa */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Company Logo"
                    width={150}
                    height={150}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className={`text-xl font-bold ${colorClasses.text.gray900} mb-2`}>
                  TechCorp Solutions
                </h3>
                <p className={colorClasses.text.gray600}>
                  Technology Company
                </p>
              </div>

              {/* Menú de navegación */}
              <nav className="w-full">
                {/* Company Data */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'company-data' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'company-data' ? { backgroundColor: colors.mainRed } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'company-data') {
                      e.currentTarget.style.backgroundColor = colors.mainRed;
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
                  <div className={`flex items-center px-4 ${activeTab === 'company-data' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    Company Data
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Dashboard */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'dashboard' ? { backgroundColor: colors.mainRed } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'dashboard') {
                      e.currentTarget.style.backgroundColor = colors.mainRed;
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

                {/* Kanban */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'kanban' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'kanban' ? { backgroundColor: colors.mainRed } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'kanban') {
                      e.currentTarget.style.backgroundColor = colors.mainRed;
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
                  <div className={`flex items-center px-4 ${activeTab === 'kanban' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Applications
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

// Company Data Form Component
const CompanyDataForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    companySize: '50-100 employees',
    foundedYear: '2015',
    website: 'https://techcorp.com',
    description: 'Leading technology company specializing in innovative solutions for modern businesses.',
    address: '123 Business Street, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@techcorp.com'
  });

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Company Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-white"
          style={{ 
            backgroundColor: isEditing ? '#16a34a' : colors.mainRed 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isEditing ? '#15803d' : colors.primary[600];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isEditing ? '#16a34a' : colors.mainRed;
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
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            >
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            >
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="50-100 employees">50-100 employees</option>
              <option value="100-500 employees">100-500 employees</option>
              <option value="500+ employees">500+ employees</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Founded Year
            </label>
            <input
              type="number"
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-8"></div>

        {/* Company Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-8"></div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-600"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
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
              style={{ backgroundColor: colors.mainRed }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary[600];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.mainRed;
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
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleViewJob = (jobId: string) => {
    router.push(`/employer/view-job/${jobId}`);
  };

  const handleEditJob = (jobId: string) => {
    router.push(`/employer/edit-job/${jobId}`);
  };

  // Mock data
  const jobs = [
    { id: '1', title: 'Frontend Developer', status: 'Active', applications: 25, views: 150 },
    { id: '2', title: 'Backend Developer', status: 'Paused', applications: 12, views: 89 },
    { id: '3', title: 'UI/UX Designer', status: 'Active', applications: 18, views: 120 },
    { id: '4', title: 'Project Manager', status: 'Closed', applications: 8, views: 45 }
  ];

  const applications = [
    { id: '1', name: 'John Smith', job: 'Frontend Developer', status: 'Pending', date: '2024-01-20' },
    { id: '2', name: 'Sarah Johnson', job: 'Frontend Developer', status: 'Reviewed', date: '2024-01-19' },
    { id: '3', name: 'Mike Wilson', job: 'Backend Developer', status: 'Interviewed', date: '2024-01-18' },
    { id: '4', name: 'Emily Davis', job: 'UI/UX Designer', status: 'Pending', date: '2024-01-17' }
  ];

  const filteredJobs = jobs.filter(job => 
    selectedJob === 'all' || job.id === selectedJob
  );

  const filteredApplications = applications.filter(app => 
    (selectedJob === 'all' || app.job === jobs.find(j => j.id === selectedJob)?.title) &&
    (statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Company Dashboard</h2>

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
              <p className="text-xs md:text-sm font-medium text-blue-600">Total Jobs</p>
              <p className="text-lg md:text-2xl font-bold text-blue-900">{jobs.length}</p>
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
              <p className="text-xs md:text-sm font-medium text-green-600">Total Applications</p>
              <p className="text-lg md:text-2xl font-bold text-green-900">{applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 md:p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-yellow-600">Total Views</p>
              <p className="text-lg md:text-2xl font-bold text-yellow-900">{jobs.reduce((sum, job) => sum + job.views, 0)}</p>
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
              <p className="text-xs md:text-sm font-medium text-purple-600">Active Jobs</p>
              <p className="text-lg md:text-2xl font-bold text-purple-900">{jobs.filter(job => job.status === 'Active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Metrics</h3>
        
        {/* Mobile Cards View */}
        <div className="block md:hidden space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  job.status === 'Active' ? 'bg-green-100 text-green-800' :
                  job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Applications:</span>
                  <span className="ml-1 font-medium">{job.applications}</span>
                </div>
                <div>
                  <span className="text-gray-500">Views:</span>
                  <span className="ml-1 font-medium">{job.views}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleViewJob(job.id)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditJob(job.id)}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Edit
                </button>
                <button className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
                  {job.status === 'Active' ? 'Pause' : 'Activate'}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' :
                      job.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.views}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewJob(job.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditJob(job.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Edit
                    </button>
                    <button className="text-orange-600 hover:text-orange-900">
                      {job.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
          <h3 className="text-lg font-semibold text-gray-800">Applications</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interviewed">Interviewed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        {/* Mobile Cards View */}
        <div className="block md:hidden space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{app.name}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                  app.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="space-y-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Job:</span>
                  <span className="ml-1 font-medium">{app.job}</span>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <span className="ml-1 font-medium">{app.date}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  View CV
                </button>
                <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                  Schedule
                </button>
                <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
                  Reject
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.job}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View CV</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Schedule</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
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

// Kanban Tab Component
const KanbanTab: React.FC = () => {
  const [applications, setApplications] = useState([
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

  const columns = [
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'reviewed', title: 'Reviewed', color: 'bg-blue-100 border-blue-300' },
    { id: 'hired', title: 'Hired', color: 'bg-green-100 border-green-300' }
  ];

  const handleDragStart = (e: React.DragEvent, applicationId: string) => {
    e.dataTransfer.setData('applicationId', applicationId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const applicationId = e.dataTransfer.getData('applicationId');
    
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">Application Management</h2>
      
      {/* Kanban Board */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {columns.map(column => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg border-2 border-dashed p-4 md:p-6 h-[500px] md:h-[600px] flex flex-col w-full md:min-w-[320px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
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
                  draggable
                  onDragStart={(e) => handleDragStart(e, application.id)}
                  className="bg-white p-3 md:p-5 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow duration-200 flex-shrink-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm md:text-base">{application.name}</h4>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-600 mb-2">{application.job}</p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">{application.email}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{application.date}</span>
                    <div className="flex space-x-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
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
            <h4 className="text-sm font-medium text-blue-800 mb-1">How to use the Kanban board</h4>
            <p className="text-sm text-blue-700">
              Drag and drop application cards between columns to change their status. Each column represents a different stage in the hiring process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
