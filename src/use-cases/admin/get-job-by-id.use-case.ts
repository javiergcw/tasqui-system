// Caso de uso para obtener un job por ID de admin

import adminJobService from '@/services/admin/job.service';
import type {
  AdminJob,
  AdminJobDetailResponse,
} from '@/models/admin/job.model';

export class GetJobByIdUseCase {
  async execute(id: string): Promise<AdminJob> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('El ID del trabajo es requerido');
      }

      const response: AdminJobDetailResponse = await adminJobService.getJobById(id);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al obtener el trabajo');
      }

      return response.data.job;
    } catch (error) {
      console.error('Error in get job by id use case:', error);
      throw error;
    }
  }
}

export default new GetJobByIdUseCase();

