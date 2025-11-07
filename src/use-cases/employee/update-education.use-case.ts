// Caso de uso para actualizar una educación de empleado

import { employeeEducationService } from '@/services/employee';
import type {
  UpdateEmployeeEducationRequest,
  UpdateEmployeeEducationResponse,
  EmployeeEducation,
} from '@/models/employee/education.model';

export class UpdateEmployeeEducationUseCase {
  async execute(id: string, data: UpdateEmployeeEducationRequest): Promise<EmployeeEducation> {
    try {
      const response: UpdateEmployeeEducationResponse = await employeeEducationService.updateEducation(id, data);

      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar la educación del empleado');
      }

      return response.data.employee_education;
    } catch (error) {
      console.error('Error en update employee education use case:', error);
      throw error;
    }
  }
}

export default new UpdateEmployeeEducationUseCase();


