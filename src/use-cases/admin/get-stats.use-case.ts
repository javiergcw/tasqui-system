// Caso de uso para obtener estadísticas de admin

import adminStatsService from '@/services/admin/stats.service';
import type { AdminStatsData, AdminStatsResponse } from '@/models/admin/stats.model';

export class GetAdminStatsUseCase {
  async execute(): Promise<AdminStatsData> {
    try {
      const response: AdminStatsResponse = await adminStatsService.getStats();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener las estadísticas de admin');
      }

      return response.data;
    } catch (error) {
      console.error('Error en get admin stats use case:', error);
      throw error;
    }
  }
}

export default new GetAdminStatsUseCase();


