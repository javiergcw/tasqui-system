// Servicio para el perfil de empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { 
  EmployeeProfileResponse,
  UpdateEmployeeProfileRequest,
  UpdateEmployeeProfileResponse
} from '@/models/employee/profile.model';

export class EmployeeProfileService {
  async getProfile(): Promise<EmployeeProfileResponse> {
    try {
      const response = await httpService.get<EmployeeProfileResponse>(
        API_ROUTES.employee.profile
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching employee profile:', error);
      throw error;
    }
  }

  async updateProfile(data: UpdateEmployeeProfileRequest): Promise<UpdateEmployeeProfileResponse> {
    try {
      const response = await httpService.put<UpdateEmployeeProfileResponse>(
        API_ROUTES.employee.profile,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error updating employee profile:', error);
      throw error;
    }
  }
}

export default new EmployeeProfileService();

