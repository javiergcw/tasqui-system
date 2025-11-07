// Caso de uso para crear una educación de empleado

import { employeeEducationService } from '@/services/employee';
import type {
  CreateEmployeeEducationRequest,
  CreateEmployeeEducationResponse,
  EmployeeEducation,
} from '@/models/employee/education.model';

export class CreateEmployeeEducationUseCase {
  async execute(data: CreateEmployeeEducationRequest): Promise<EmployeeEducation> {
    try {
      const response: CreateEmployeeEducationResponse = await employeeEducationService.createEducation(data);

      if (!response.success) {
        throw new Error(response.message || 'Error al crear la educación del empleado');
      }

      return response.data.employee_education;
    } catch (error) {
      console.error('Error en create employee education use case:', error);
      throw error;
    }
  }
}

export default new CreateEmployeeEducationUseCase();


