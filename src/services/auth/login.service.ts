// Servicio para el login

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  LoginRequest,
  LoginResponse,
} from '@/models/auth/login.model';

export class LoginService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpService.post<LoginResponse>(
        API_ROUTES.auth.login,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error in login service:', error);
      throw error;
    }
  }
}

export default new LoginService();

