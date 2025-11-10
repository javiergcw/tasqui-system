// Servicio para postulaciones a vacantes de un empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  CreateEmployeeJobApplicationRequest,
  CreateEmployeeJobApplicationResponse,
  CheckEmployeeJobApplicationResponse,
  GetEmployeeJobApplicationsResponse,
} from '@/models/employee/job-application.model';

export class EmployeeJobApplicationService {
  async createJobApplication(
    payload: CreateEmployeeJobApplicationRequest
  ): Promise<CreateEmployeeJobApplicationResponse> {
    try {
      const response = await httpService.post<CreateEmployeeJobApplicationResponse>(
        API_ROUTES.employee.jobApplications,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error creating employee job application:', error);
      throw error;
    }
  }

  async checkJobApplication(jobId: string): Promise<CheckEmployeeJobApplicationResponse> {
    try {
      const response = await httpService.get<CheckEmployeeJobApplicationResponse>(
        API_ROUTES.employee.jobApplicationsCheck(jobId)
      );
      return response.data;
    } catch (error) {
      console.error('Error checking employee job application:', error);
      throw error;
    }
  }

  async getJobApplications(): Promise<GetEmployeeJobApplicationsResponse> {
    try {
      const response = await httpService.get<GetEmployeeJobApplicationsResponse>(
        API_ROUTES.employee.jobApplications
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching employee job applications:', error);
      throw error;
    }
  }
}

export default new EmployeeJobApplicationService();


