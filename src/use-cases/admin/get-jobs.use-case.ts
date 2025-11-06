// Caso de uso para obtener jobs de admin

import adminJobService from '@/services/admin/job.service';
import type {
  AdminJobListItem,
  AdminJobsResponse,
} from '@/models/admin/job.model';

export class GetJobsUseCase {
  async execute(): Promise<AdminJobListItem[]> {
    try {
      const response: AdminJobsResponse = await adminJobService.getJobs();
      
      if (!response.success) {
        throw new Error(response.message || 'Error al obtener los trabajos');
      }

      return response.data.jobs;
    } catch (error) {
      console.error('Error in get jobs use case:', error);
      throw error;
    }
  }
}

export default new GetJobsUseCase();

