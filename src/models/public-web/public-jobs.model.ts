// Modelos para empleos públicos

export type PublicJobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP' | 'FREELANCE';
export type PublicJobExperienceLevel = 'ENTRY_LEVEL' | 'MID_LEVEL' | 'SENIOR_LEVEL' | 'EXECUTIVE';
export type PublicJobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';
export type PublicJobVisibility = 'PUBLIC' | 'PRIVATE';

export interface PublicJobCompany {
  id: string;
  legal_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_plan: string | null;
  max_open_jobs: number | null;
}

export interface PublicJobCategory {
  id: string;
  name: string;
  description: string | null;
}

export interface PublicJob {
  id: string;
  company_id: string;
  created_by_id: string | null;
  source_ticket_id: string | null;
  category_id: string | null;
  title: string;
  description: string;
  location: string | null;
  job_type: PublicJobType;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  experience_level: PublicJobExperienceLevel | null;
  status: PublicJobStatus;
  visibility: PublicJobVisibility;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  company: PublicJobCompany | null;
  category: PublicJobCategory | null;
}

export interface PublicJobsData {
  jobs: PublicJob[];
  total: number;
  limit: number;
  offset: number;
}

export interface PublicJobsResponse {
  success: boolean;
  message: string;
  data: PublicJobsData;
}

export interface PublicJobDetailData {
  job: PublicJob;
}

export interface PublicJobDetailResponse {
  success: boolean;
  message: string;
  data: PublicJobDetailData;
}


