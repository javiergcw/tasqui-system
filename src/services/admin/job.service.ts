// Servicio para jobs de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { 
  CreateJobRequest, 
  CreateJobResponse, 
  AdminJobsResponse, 
  AdminJobDetailResponse,
  UpdateJobStatusRequest,
  UpdateJobStatusResponse
} from '@/models/admin/job.model';
import type {
  AdminJobApplicantsResponse
} from '@/models/admin/job-applicants.model';

class AdminJobService {
  async createJob(data: CreateJobRequest): Promise<CreateJobResponse> {
    const response = await httpService.post<CreateJobResponse>(
      API_ROUTES.admin.jobs,
      data
    );
    return response.data;
  }

  async getJobs(): Promise<AdminJobsResponse> {
    const response = await httpService.get<AdminJobsResponse>(
      API_ROUTES.admin.jobs
    );
    return response.data;
  }

  async getJobById(id: string): Promise<AdminJobDetailResponse> {
    const response = await httpService.get<AdminJobDetailResponse>(
      API_ROUTES.admin.jobDetail(id)
    );
    return response.data;
  }

  async getJobApplicants(jobId: string): Promise<AdminJobApplicantsResponse> {
    const response = await httpService.get<AdminJobApplicantsResponse>(
      API_ROUTES.admin.jobApplicants(jobId)
    );
    return response.data;
  }

  async updateJobStatus(id: string, data: UpdateJobStatusRequest): Promise<UpdateJobStatusResponse> {
    const response = await httpService.put<UpdateJobStatusResponse>(
      API_ROUTES.admin.updateJobStatus(id),
      data
    );
    return response.data;
  }
}

export default new AdminJobService();

