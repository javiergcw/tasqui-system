// Modelo para jobs de admin

export interface CreateJobRequest {
  ticket_id: string;
  title: string;
  description: string;
  location: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  status: string;
  visibility: string;
}

export interface AdminJob {
  id: string;
  ticket_id: string;
  title: string;
  description: string;
  location: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  status: string;
  visibility: string;
  created_at: string;
  updated_at: string;
}

export interface CreateJobResponse {
  success: boolean;
  message: string;
  data: {
    job: AdminJob;
  };
}

