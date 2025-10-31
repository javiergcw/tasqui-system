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
  },
  
  // Company
  company: {
    profile: '/api/v1/company/profile',
    tickets: '/api/v1/company/tickets',
  },
  
  // Admin
  admin: {
    profile: '/api/v1/admin/profile',
    tickets: '/api/v1/admin/tickets',
    jobs: '/api/v1/admin/jobs',
  },
  
  // Jobs (pendiente)
  jobs: {
    list: '/api/v1/jobs',
    detail: (id: string) => `/api/v1/jobs/${id}`,
    create: '/api/v1/jobs',
    update: (id: string) => `/api/v1/jobs/${id}`,
    delete: (id: string) => `/api/v1/jobs/${id}`,
  },
} as const;

