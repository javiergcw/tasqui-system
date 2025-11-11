// Caso de uso para obtener el detalle de un empleo público

import publicJobsService from '@/services/public-web/public-jobs.service';
import type { PublicJobDetailResponse } from '@/models/public-web/public-jobs.model';

export class PublicJobDetailUseCase {
  async execute(jobId: string): Promise<PublicJobDetailResponse> {
    try {
      const result = await publicJobsService.getPublicJobById(jobId);
      return result;
    } catch (error) {
      console.error(`Error in public job detail use case for id ${jobId}:`, error);
      throw error;
    }
  }
}

export default new PublicJobDetailUseCase();


