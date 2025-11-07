// Caso de uso para actualizar experiencia de empleado

import { employeeExperienceService } from '@/services/employee';
import type {
  UpdateEmployeeExperienceRequest,
  UpdateEmployeeExperienceResponse,
  EmployeeExperience,
} from '@/models/employee/experience.model';

export class UpdateEmployeeExperienceUseCase {
  async execute(id: string, data: UpdateEmployeeExperienceRequest): Promise<EmployeeExperience> {
    try {
      const response: UpdateEmployeeExperienceResponse = await employeeExperienceService.updateExperience(id, data);

      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar experiencia del empleado');
      }

      return response.data.employee_experience;
    } catch (error) {
      console.error('Error en update employee experience use case:', error);
      throw error;
    }
  }
}

export default new UpdateEmployeeExperienceUseCase();


