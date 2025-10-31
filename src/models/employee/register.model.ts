// Modelo para el registro de empleados

export interface EmployeeRegisterRequest {
  email: string;
  password: string;
  role: 'EMPLOYEE';
  employee_first_name: string;
  employee_last_name: string;
  employee_headline: string;
  employee_location: string;
  employee_bio: string;
  employee_country: string;
  employee_region: string;
  employee_city: string;
  employee_zip_code: string;
  employee_primary_language: string;
  employee_linkedin_url: string;
}

export interface EmployeeRegisterResponse {
  id: string;
  email: string;
  role: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_headline: string;
  employee_location: string;
  employee_bio: string;
  employee_country: string;
  employee_region: string;
  employee_city: string;
  employee_zip_code: string;
  employee_primary_language: string;
  employee_linkedin_url: string;
  created_at: string;
  updated_at: string;
}

