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
  birth_date: string;
  primary_language: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
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

export interface UpdateEmployeeProfileRequest {
  first_name: string;
  last_name: string;
  headline: string;
  location: string;
  bio: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  birth_date: string;
  primary_language: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface UpdateEmployeeProfileResponse {
  success: boolean;
  message: string;
  data: {
    employee_profile: EmployeeProfile;
  };
}

