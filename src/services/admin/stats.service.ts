// Servicio para estadísticas de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { AdminStatsResponse } from '@/models/admin/stats.model';

class AdminStatsService {
  async getStats(): Promise<AdminStatsResponse> {
    const response = await httpService.get<AdminStatsResponse>(
      API_ROUTES.admin.stats
    );
    return response.data;
  }
}

export default new AdminStatsService();


