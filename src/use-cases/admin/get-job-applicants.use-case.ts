// Caso de uso para obtener los solicitantes de un trabajo en admin

import adminJobService from '@/services/admin/job.service';
import type {
  AdminJobApplication,
  AdminJobApplicantsResponse,
} from '@/models/admin/job-applicants.model';

export class GetJobApplicantsUseCase {
  async execute(jobId: string): Promise<{
    job_applications: AdminJobApplication[];
    total: number;
    limit: number;
    offset: number;
  }> {
    try {
      if (!jobId || jobId.trim().length === 0) {
        throw new Error('El ID del trabajo es requerido');
      }

      const response: AdminJobApplicantsResponse =
        await adminJobService.getJobApplicants(jobId);

      if (!response.success) {
        throw new Error(
          response.message || 'Error al obtener los solicitantes del trabajo'
        );
      }

      return response.data;
    } catch (error) {
      console.error('Error in get job applicants use case:', error);
      throw error;
    }
  }
}

export default new GetJobApplicantsUseCase();


