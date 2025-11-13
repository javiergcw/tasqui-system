// Modelo para trabajos de compañías

import type { SoftSkillItem, HardSkillItem } from '../master';

export interface CompanyJobListItem {
  id: string;
  company_id: string;
  title: string;
  location: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  job_type: string;
  soft_skills: SoftSkillItem[];
  hard_skills: HardSkillItem[];
  status: string;
  created_at: string;
  updated_at: string;
  applications_count: number;
}

export interface CompanyJobsResponse {
  success: boolean;
  message: string;
  data: {
    jobs: CompanyJobListItem[];
    total: number;
    limit: number;
    offset: number;
  };
}


