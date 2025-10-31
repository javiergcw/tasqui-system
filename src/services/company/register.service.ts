// Servicio para el registro de empresas

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  CompanyRegisterRequest,
  CompanyRegisterResponse,
} from '@/models/company/register.model';

export class CompanyRegisterService {
  async register(
    data: CompanyRegisterRequest
  ): Promise<CompanyRegisterResponse> {
    try {
      const response = await httpService.post<CompanyRegisterResponse>(
        API_ROUTES.auth.register,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error registering company:', error);
      throw error;
    }
  }
}

export default new CompanyRegisterService();

