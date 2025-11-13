// Modelo para estadísticas de company

export interface LatestNote {
  id: string;
  ticket_id: string;
  company_id: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface LatestJob {
  id: string;
  company_id: string;
  title: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  job_type: string | null;
  soft_skills: any | null;
  hard_skills: any | null;
  status: string;
  created_at: string;
  updated_at: string;
  applications_count: number;
}

export interface JobStatistics {
  total: number;
  by_status: Record<string, number>;
  by_visibility: Record<string, number>;
}

export interface TicketStatistics {
  total: number;
  by_status: Record<string, number>;
}

export interface CompanyStatsData {
  latest_notes: LatestNote[];
  latest_jobs: LatestJob[];
  job_statistics: JobStatistics;
  ticket_statistics: TicketStatistics;
}

export interface CompanyStatsResponse {
  success: boolean;
  message: string;
  data: CompanyStatsData;
}

