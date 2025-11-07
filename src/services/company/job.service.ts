// Servicio para trabajos de company

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { CompanyJobsResponse } from '@/models/company/job.model';

class CompanyJobService {
  async getJobs(): Promise<CompanyJobsResponse> {
    const response = await httpService.get<CompanyJobsResponse>(
      API_ROUTES.company.jobs
    );
    return response.data;
  }
}

export default new CompanyJobService();


