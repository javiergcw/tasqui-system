// Caso de uso para el perfil de empleado

import employeeProfileService from '@/services/employee/profile.service';
import type { EmployeeProfileResponse } from '@/models/employee/profile.model';

export class EmployeeProfileUseCase {
  async execute(): Promise<EmployeeProfileResponse> {
    try {
      const result = await employeeProfileService.getProfile();
      return result;
    } catch (error) {
      console.error('Error in employee profile use case:', error);
      throw error;
    }
  }
}

export default new EmployeeProfileUseCase();

