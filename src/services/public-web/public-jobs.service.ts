// Servicio para empleos públicos

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { PublicJobsResponse } from '@/models/public-web/public-jobs.model';

export class PublicJobsService {
  async getPublicJobs(): Promise<PublicJobsResponse> {
    try {
      const response = await httpService.get<PublicJobsResponse>(
        API_ROUTES.publicWeb.jobs
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching public jobs:', error);
      throw error;
    }
  }
}

export default new PublicJobsService();


