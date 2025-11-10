// Caso de uso para verificar si un empleado ya aplicó a una vacante

import { employeeJobApplicationService } from '@/services/employee';
import type { CheckEmployeeJobApplicationResponse } from '@/models/employee/job-application.model';

interface CheckEmployeeJobApplicationResult {
  hasApplied: boolean;
}

export class CheckEmployeeJobApplicationUseCase {
  async execute(jobId: string): Promise<CheckEmployeeJobApplicationResult> {
    try {
      const response: CheckEmployeeJobApplicationResponse =
        await employeeJobApplicationService.checkJobApplication(jobId);

      if (!response.success) {
        throw new Error(response.message || 'Error al verificar la postulación del empleado');
      }

      return {
        hasApplied: response.data.has_applied,
      };
    } catch (error) {
      console.error('Error en check employee job application use case:', error);
      throw error;
    }
  }
}

export default new CheckEmployeeJobApplicationUseCase();


