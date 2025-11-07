// Caso de uso para obtener trabajos de compañías

import { companyJobService } from '@/services/company';
import type { CompanyJobListItem, CompanyJobsResponse } from '@/models/company/job.model';

export class GetCompanyJobsUseCase {
  async execute(): Promise<CompanyJobListItem[]> {
    try {
      const response: CompanyJobsResponse = await companyJobService.getJobs();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener los trabajos de la compañía');
      }

      return response.data.jobs;
    } catch (error) {
      console.error('Error en get company jobs use case:', error);
      throw error;
    }
  }
}

export default new GetCompanyJobsUseCase();


