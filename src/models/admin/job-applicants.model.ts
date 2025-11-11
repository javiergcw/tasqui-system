// Modelo para los solicitantes de un trabajo en admin

export type JobApplicationStatus =
  | 'APPLIED'
  | 'SHORTLISTED'
  | 'INTERVIEW'
  | 'OFFERED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'HIRED';

export interface AdminJobApplicantCategory {
  id: string;
  name: string;
  description: string;
}

export interface AdminJobApplicantJob {
  id: string;
  company_id: string;
  created_by_id: string;
  source_ticket_id: string | null;
  category_id: string;
  title: string;
  description: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  experience_level: string;
  status: string;
  visibility: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: AdminJobApplicantCategory;
}

export interface AdminJobApplication {
  id: string;
  job_id: string;
  employee_profile_id: string;
  status: JobApplicationStatus;
  created_at: string;
  updated_at: string;
  job: AdminJobApplicantJob;
}

export interface AdminJobApplicantsResponse {
  success: boolean;
  message: string;
  data: {
    job_applications: AdminJobApplication[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface UpdateJobApplicationStatusRequest {
  status: JobApplicationStatus;
}

export interface UpdateJobApplicationStatusResponse {
  success: boolean;
  message: string;
  data: {
    job_application: AdminJobApplication;
  };
}



