// Modelo para postulaciones de empleado a vacantes

export interface EmployeeJobApplication {
  id: string;
  employee_profile_id: string;
  job_id: string;
  cover_letter?: string | null;
  status?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEmployeeJobApplicationRequest {
  job_id: string;
  cover_letter?: string;
}

export interface CreateEmployeeJobApplicationResponse {
  success: boolean;
  message: string;
  data: {
    job_application: EmployeeJobApplication;
  };
}

export interface CheckEmployeeJobApplicationResponse {
  success: boolean;
  message: string;
  data: {
    has_applied: boolean;
  };
}

export interface GetEmployeeJobApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    job_applications: EmployeeJobApplication[];
    total: number;
    limit: number;
    offset: number;
  };
}



