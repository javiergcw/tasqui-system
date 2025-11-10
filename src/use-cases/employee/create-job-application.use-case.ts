// Caso de uso para crear una postulación de empleado a una vacante

import { employeeJobApplicationService } from '@/services/employee';
import type {
  CreateEmployeeJobApplicationRequest,
  CreateEmployeeJobApplicationResponse,
  EmployeeJobApplication,
} from '@/models/employee/job-application.model';

export class CreateEmployeeJobApplicationUseCase {
  async execute(data: CreateEmployeeJobApplicationRequest): Promise<EmployeeJobApplication> {
    try {
      const response: CreateEmployeeJobApplicationResponse =
        await employeeJobApplicationService.createJobApplication(data);

      if (!response.success) {
        throw new Error(response.message || 'Error al crear la postulación del empleado');
      }

      return response.data.job_application;
    } catch (error) {
      console.error('Error en create employee job application use case:', error);
      throw error;
    }
  }
}

export default new CreateEmployeeJobApplicationUseCase();


