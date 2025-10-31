// Servicio para el perfil de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { AdminProfileResponse } from '@/models/admin/profile.model';

class AdminProfileService {
  async getProfile(): Promise<AdminProfileResponse> {
    const response = await httpService.get<AdminProfileResponse>(
      API_ROUTES.admin.profile
    );
    return response.data;
  }
}

export default new AdminProfileService();

