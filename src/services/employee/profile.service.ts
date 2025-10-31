// Servicio para el perfil de empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { EmployeeProfileResponse } from '@/models/employee/profile.model';

export class EmployeeProfileService {
  async getProfile(): Promise<EmployeeProfileResponse> {
    try {
      const response = await httpService.get<EmployeeProfileResponse>(
        '/api/v1/employee/profile'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching employee profile:', error);
      throw error;
    }
  }
}

export default new EmployeeProfileService();

