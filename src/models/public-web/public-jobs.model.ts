// Modelos para empleos públicos

export type PublicJobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP' | 'FREELANCE';
export type PublicJobExperienceLevel = 'ENTRY_LEVEL' | 'MID_LEVEL' | 'SENIOR_LEVEL' | 'EXECUTIVE';
export type PublicJobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';
export type PublicJobVisibility = 'PUBLIC' | 'PRIVATE';

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


