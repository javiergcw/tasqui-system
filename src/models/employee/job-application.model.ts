// Modelo para postulaciones de empleado a vacantes

import type { JobCategory } from '../master';

export interface EmployeeJobApplicationJob {
  id: string;
  company_id: string;
  created_by_id: string;
  source_ticket_id: string | null;
  category_id: string;
  title: string;
  description: string;
  location: string;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  experience_level: string | null;
  status: string;
  visibility: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: JobCategory;
}

export interface EmployeeJobApplication {
  id: string;
  employee_profile_id: string;
  job_id: string;
  cover_letter?: string | null;
  status?: string | null;
  created_at: string;
  updated_at: string;
  job?: EmployeeJobApplicationJob;
}

export interface CreateEmployeeJobApplicationRequest {
  job_id: string;
  cover_letter?: string;
}

export interface CreateEmployeeJobApplicationResponse {
  success: boolean;
  message: string;
  data: {
    job_application: EmployeeJobApplication;
  };
}

export interface CheckEmployeeJobApplicationResponse {
  success: boolean;
  message: string;
  data: {
    has_applied: boolean;
  };
}

export interface GetEmployeeJobApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    job_applications: EmployeeJobApplication[];
    total: number;
    limit: number;
    offset: number;
  };
}



