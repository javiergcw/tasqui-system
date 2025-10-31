// Servicio para el registro de empleados

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  EmployeeRegisterRequest,
  EmployeeRegisterResponse,
} from '@/models/employee/register.model';

export class EmployeeRegisterService {
  async register(
    data: EmployeeRegisterRequest
  ): Promise<EmployeeRegisterResponse> {
    try {
      const response = await httpService.post<EmployeeRegisterResponse>(
        API_ROUTES.auth.register,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error registering employee:', error);
      throw error;
    }
  }
}

export default new EmployeeRegisterService();

