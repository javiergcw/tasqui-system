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
  description: string | null;
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
  category: AdminJobApplicantCategory | null;
}

export interface AdminJobApplicantProfile {
  profile_id: string;
  full_name: string;
  email: string;
  role: string;
  country: string | null;
  region: string | null;
  city: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  skills?: string[];
}

export interface AdminJobApplication {
  id: string;
  job_id: string;
  employee_profile_id: string;
  status: JobApplicationStatus;
  created_at: string;
  updated_at: string;
  job: AdminJobApplicantJob;
  applicant?: AdminJobApplicantProfile | null;
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



