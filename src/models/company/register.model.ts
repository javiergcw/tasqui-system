// Modelo para el registro de empresas

export interface CompanyRegisterRequest {
  email: string;
  password: string;
  role: 'COMPANY';
  company_legal_name: string;
  company_contact_name: string;
  company_contact_email: string;
  company_contact_phone: string;
  company_billing_plan: string;
  company_max_open_jobs: number;
}

export interface CompanyRegisterResponse {
  id: string;
  email: string;
  role: string;
  company_legal_name: string;
  company_contact_name: string;
  company_contact_email: string;
  company_contact_phone: string;
  company_billing_plan: string;
  company_max_open_jobs: number;
  created_at: string;
  updated_at: string;
}

