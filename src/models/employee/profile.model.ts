// Modelo para el perfil de empleado

export interface EmployeeProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  headline: string;
  location: string;
  bio: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  primary_language: string;
  linkedin_url: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeProfileResponse {
  success: boolean;
  message: string;
  data: {
    employee_profile: EmployeeProfile;
  };
}

