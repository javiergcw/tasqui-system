// Servicio para estadísticas de company

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { CompanyStatsResponse } from '@/models/company/stats.model';

class CompanyStatsService {
  async getStats(): Promise<CompanyStatsResponse> {
    const response = await httpService.get<CompanyStatsResponse>(
      API_ROUTES.company.stats
    );
    return response.data;
  }
}

export default new CompanyStatsService();

