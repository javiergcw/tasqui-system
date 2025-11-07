// Modelo para experiencias de empleado

export interface EmployeeExperience {
  id: string;
  employee_profile_id: string;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeExperiencesResponse {
  success: boolean;
  message: string;
  data: {
    employee_experiences: EmployeeExperience[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CreateEmployeeExperienceRequest {
  job_title: string;
  company_name: string;
  start_date: string;
  end_date?: string | null;
  description?: string;
}

export interface CreateEmployeeExperienceResponse {
  success: boolean;
  message: string;
  data: {
    employee_experience: EmployeeExperience;
  };
}

export interface UpdateEmployeeExperienceRequest {
  job_title?: string;
  company_name?: string;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
}

export interface UpdateEmployeeExperienceResponse {
  success: boolean;
  message: string;
  data: {
    employee_experience: EmployeeExperience;
  };
}


