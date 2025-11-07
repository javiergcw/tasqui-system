// Caso de uso para eliminar experiencia de empleado

import { employeeExperienceService } from '@/services/employee';

export class DeleteEmployeeExperienceUseCase {
  async execute(id: string): Promise<void> {
    try {
      await employeeExperienceService.deleteExperience(id);
    } catch (error) {
      console.error('Error en delete employee experience use case:', error);
      throw error;
    }
  }
}

export default new DeleteEmployeeExperienceUseCase();


