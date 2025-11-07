// Caso de uso para crear experiencia de empleado

import { employeeExperienceService } from '@/services/employee';
import type {
  CreateEmployeeExperienceRequest,
  CreateEmployeeExperienceResponse,
  EmployeeExperience,
} from '@/models/employee/experience.model';

export class CreateEmployeeExperienceUseCase {
  async execute(data: CreateEmployeeExperienceRequest): Promise<EmployeeExperience> {
    try {
      const response: CreateEmployeeExperienceResponse = await employeeExperienceService.createExperience(data);

      if (!response.success) {
        throw new Error(response.message || 'Error al crear experiencia del empleado');
      }

      return response.data.employee_experience;
    } catch (error) {
      console.error('Error en create employee experience use case:', error);
      throw error;
    }
  }
}

export default new CreateEmployeeExperienceUseCase();


