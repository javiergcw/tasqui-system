// Servicio para el perfil de company

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { CompanyProfileResponse } from '@/models/company/profile.model';

class CompanyProfileService {
  async getProfile(): Promise<CompanyProfileResponse> {
    const response = await httpService.get<CompanyProfileResponse>(
      API_ROUTES.company.profile
    );
    return response.data;
  }
}

export default new CompanyProfileService();

