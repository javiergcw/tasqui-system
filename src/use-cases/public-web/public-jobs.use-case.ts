// Caso de uso para empleos públicos

import publicJobsService from '@/services/public-web/public-jobs.service';
import type { PublicJobsResponse } from '@/models/public-web/public-jobs.model';

export class PublicJobsUseCase {
  async execute(): Promise<PublicJobsResponse> {
    try {
      const result = await publicJobsService.getPublicJobs();
      return result;
    } catch (error) {
      console.error('Error in public jobs use case:', error);
      throw error;
    }
  }
}

export default new PublicJobsUseCase();


