// Servicio para jobs de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { CreateJobRequest, CreateJobResponse } from '@/models/admin/job.model';

class AdminJobService {
  async createJob(data: CreateJobRequest): Promise<CreateJobResponse> {
    const response = await httpService.post<CreateJobResponse>(
      API_ROUTES.admin.jobs,
      data
    );
    return response.data;
  }
}

export default new AdminJobService();

