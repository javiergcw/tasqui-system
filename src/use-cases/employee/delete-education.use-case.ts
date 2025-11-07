// Caso de uso para eliminar una educación de empleado

import { employeeEducationService } from '@/services/employee';

export class DeleteEmployeeEducationUseCase {
  async execute(id: string): Promise<void> {
    try {
      await employeeEducationService.deleteEducation(id);
    } catch (error) {
      console.error('Error en delete employee education use case:', error);
      throw error;
    }
  }
}

export default new DeleteEmployeeEducationUseCase();


