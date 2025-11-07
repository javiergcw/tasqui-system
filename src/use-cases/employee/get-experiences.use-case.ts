// Caso de uso para obtener experiencias de empleado

import { employeeExperienceService } from '@/services/employee';
import type { EmployeeExperience, EmployeeExperiencesResponse } from '@/models/employee/experience.model';

export class GetEmployeeExperiencesUseCase {
  async execute(): Promise<EmployeeExperience[]> {
    try {
      const response: EmployeeExperiencesResponse = await employeeExperienceService.getExperiences();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener las experiencias del empleado');
      }

      return response.data.employee_experiences;
    } catch (error) {
      console.error('Error en get employee experiences use case:', error);
      throw error;
    }
  }
}

export default new GetEmployeeExperiencesUseCase();


