// Modelo para trabajos de compañías

export interface CompanyJobListItem {
  id: string;
  company_id: string;
  title: string;
  location: string;
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


