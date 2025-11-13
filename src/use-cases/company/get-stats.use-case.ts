// Caso de uso para obtener estadísticas de compañías

import { companyStatsService } from '@/services/company';
import type { CompanyStatsData } from '@/models/company/stats.model';

export class GetCompanyStatsUseCase {
  async execute(): Promise<CompanyStatsData> {
    try {
      const response = await companyStatsService.getStats();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener las estadísticas de la compañía');
      }

      return response.data;
    } catch (error) {
      console.error('Error en get company stats use case:', error);
      throw error;
    }
  }
}

export default new GetCompanyStatsUseCase();

