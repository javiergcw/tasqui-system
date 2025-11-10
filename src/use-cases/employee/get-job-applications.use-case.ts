// Caso de uso para obtener las postulaciones del empleado

import { employeeJobApplicationService } from '@/services/employee';
import type {
  GetEmployeeJobApplicationsResponse,
  EmployeeJobApplication,
} from '@/models/employee/job-application.model';

interface GetEmployeeJobApplicationsResult {
  jobApplications: EmployeeJobApplication[];
  total: number;
  limit: number;
  offset: number;
}

export class GetEmployeeJobApplicationsUseCase {
  async execute(): Promise<GetEmployeeJobApplicationsResult> {
    try {
      const response: GetEmployeeJobApplicationsResponse =
        await employeeJobApplicationService.getJobApplications();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener las postulaciones del empleado');
      }

      return {
        jobApplications: response.data.job_applications,
        total: response.data.total,
        limit: response.data.limit,
        offset: response.data.offset,
      };
    } catch (error) {
      console.error('Error en get employee job applications use case:', error);
      throw error;
    }
  }
}

export default new GetEmployeeJobApplicationsUseCase();


