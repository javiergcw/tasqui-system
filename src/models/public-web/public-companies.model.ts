// Modelo para empresas públicas

export type BillingPlan = 'basic' | 'premium';

export interface PublicCompanyProfile {
  id: string;
  user_id: string;
  legal_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  billing_plan: BillingPlan;
  max_open_jobs: number;
  created_at: string;
  updated_at: string;
}

export interface PublicCompaniesData {
  company_profiles: PublicCompanyProfile[];
  total: number;
  limit: number;
  offset: number;
}

export interface PublicCompaniesResponse {
  success: boolean;
  message: string;
  data: PublicCompaniesData;
}

