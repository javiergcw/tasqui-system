// Modelo para jobs de admin

export type JobStatus = 'DRAFT' | 'OPEN' | 'PAUSED' | 'CLOSED' | 'CANCELLED';

export interface SoftSkill {
  category_id: string;
}

export interface HardSkill {
  subcategory_id: string;
  level: number;
  years_experience: number;
  last_used_at: string;
}

export interface CreateJobRequest {
  ticket_id?: string;
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
  tags: string[];
  soft_skills: SoftSkill[];
  hard_skills: HardSkill[];
}

export interface AdminJobListItem {
  id: string;
  company_id: string;
  title: string;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
  applications_count: number;
}

export interface AdminJob {
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
  applications: any | null;
  applications_count: number;
}

export interface CreateJobResponse {
  success: boolean;
  message: string;
  data: {
    job: AdminJob;
  };
}

export interface AdminJobsResponse {
  success: boolean;
  message: string;
  data: {
    jobs: AdminJobListItem[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface AdminJobDetailResponse {
  success: boolean;
  message: string;
  data: {
    job: AdminJob;
  };
}

export interface UpdateJobStatusRequest {
  status: JobStatus;
}

export interface UpdateJobStatusResponse {
  success: boolean;
  message: string;
  data: {
    job: AdminJob;
  };
}

