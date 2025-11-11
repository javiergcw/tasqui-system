// Servicio para solicitudes de empleo de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  UpdateJobApplicationStatusRequest,
  UpdateJobApplicationStatusResponse,
} from '@/models/admin/job-applicants.model';

class AdminJobApplicationService {
  async updateStatus(
    applicationId: string,
    data: UpdateJobApplicationStatusRequest
  ): Promise<UpdateJobApplicationStatusResponse> {
    const response = await httpService.put<UpdateJobApplicationStatusResponse>(
      API_ROUTES.admin.jobApplicationStatus(applicationId),
      data
    );
    return response.data;
  }
}

export default new AdminJobApplicationService();


