// Rutas de la API

export const API_ROUTES = {
  // Auth
  auth: {
    register: '/api/v1/users/register',
    login: '/api/v1/users/login',
    logout: '/api/v1/users/logout',
    refreshToken: '/api/v1/users/refresh-token',
  },
  
  // Users
  users: {
    list: '/api/v1/users',
    detail: (id: string) => `/api/v1/users/${id}`,
    profile: '/api/v1/users/profile',
    update: (id: string) => `/api/v1/users/${id}`,
    delete: (id: string) => `/api/v1/users/${id}`,
  },
  
  // Employee
  employee: {
    profile: '/api/v1/employee/profile',
    educations: '/api/v1/employee/educations',
    educationDetail: (id: string) => `/api/v1/employee/educations/${id}`,
    experiences: '/api/v1/employee/experiences',
    experienceDetail: (id: string) => `/api/v1/employee/experiences/${id}`,
    skills: '/api/v1/employee/skills',
    skillCategoryDetail: (categoryId: string) => `/api/v1/employee/skill-categories/${categoryId}`,
    skillSubcategoryDetail: (subcategoryId: string) => `/api/v1/employee/skill-subcategories/${subcategoryId}`,
    jobApplications: '/api/v1/employee/job-applications',
    jobApplicationsCheck: (jobId: string) => `/api/v1/employee/job-applications/check/${jobId}`,
  },
  
  // Company
  company: {
    profile: '/api/v1/company/profile',
    tickets: '/api/v1/company/tickets',
    ticketNotes: (ticketId: string) => `/api/v1/company/tickets/${ticketId}/notes`,
    jobs: '/api/v1/company/jobs',
    stats: '/api/v1/company/stats',
  },
  
  // Admin
  admin: {
    profile: '/api/v1/admin/profile',
    tickets: '/api/v1/admin/tickets',
    updateTicketStatus: (ticketId: string) => `/api/v1/admin/tickets/${ticketId}/status`,
    jobs: '/api/v1/admin/jobs',
    jobDetail: (id: string) => `/api/v1/admin/jobs/${id}`,
    updateJobStatus: (id: string) => `/api/v1/admin/jobs/${id}/status`,
    jobApplicants: (jobId: string) => `/api/v1/admin/jobs/${jobId}/applicants`,
    jobApplicationStatus: (applicationId: string) =>
      `/api/v1/admin/job-applications/${applicationId}/status`,
    stats: '/api/v1/admin/stats',
    leads: '/api/v1/admin/leads',
    leadDetail: (id: string) => `/api/v1/admin/leads/${id}`,
    convertLead: (leadId: string) => `/api/v1/admin/leads/${leadId}/convert`,
    updateLeadEmail: (leadId: string) => `/api/v1/admin/leads/${leadId}/email`,
  },
  
  // Jobs (pendiente)
  jobs: {
    list: '/api/v1/jobs',
    detail: (id: string) => `/api/v1/jobs/${id}`,
    create: '/api/v1/jobs',
    update: (id: string) => `/api/v1/jobs/${id}`,
    delete: (id: string) => `/api/v1/jobs/${id}`,
  },
  
  // Master
  master: {
    skillsComplete: '/api/v1/leads/skills-complete',
    jobMasterDataComplete: '/api/v1/jobs/master-data-complete',
  },
  
  // Public Web
  publicWeb: {
    companies: '/api/v1/public/companies',
    jobs: '/api/v1/public/jobs',
    jobDetail: (id: string) => `/api/v1/public/jobs/${id}`,
    newsletter: '/api/v1/public/newsletter',
  },
} as const;

