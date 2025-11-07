// Modelo para educaciones de empleado

export interface EmployeeEducation {
  id: string;
  employee_profile_id: string;
  degree_name: string;
  institution_name: string;
  start_date: string;
  end_date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeEducationsResponse {
  success: boolean;
  message: string;
  data: {
    employee_educations: EmployeeEducation[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CreateEmployeeEducationRequest {
  degree_name: string;
  institution_name: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface CreateEmployeeEducationResponse {
  success: boolean;
  message: string;
  data: {
    employee_education: EmployeeEducation;
  };
}

export interface UpdateEmployeeEducationRequest {
  degree_name: string;
  institution_name: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface UpdateEmployeeEducationResponse {
  success: boolean;
  message: string;
  data: {
    employee_education: EmployeeEducation;
  };
}



