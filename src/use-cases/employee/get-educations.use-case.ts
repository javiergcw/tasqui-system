// Caso de uso para obtener educaciones de empleado

import { employeeEducationService } from '@/services/employee';
import type { EmployeeEducation, EmployeeEducationsResponse } from '@/models/employee/education.model';

export class GetEmployeeEducationsUseCase {
  async execute(): Promise<EmployeeEducation[]> {
    try {
      const response: EmployeeEducationsResponse = await employeeEducationService.getEducations();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener las educaciones del empleado');
      }

      return response.data.employee_educations;
    } catch (error) {
      console.error('Error en get employee educations use case:', error);
      throw error;
    }
  }
}

export default new GetEmployeeEducationsUseCase();


