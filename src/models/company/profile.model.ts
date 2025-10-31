// Modelo para el perfil de company

export interface CompanyProfile {
  id: string;
  user_id: string;
  legal_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  billing_plan: string;
  max_open_jobs: number;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfileResponse {
  success: boolean;
  message: string;
  data: {
    company_profile: CompanyProfile;
  };
}

