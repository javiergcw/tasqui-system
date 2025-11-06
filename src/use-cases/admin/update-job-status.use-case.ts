// Caso de uso para actualizar el estado de un job de admin

import adminJobService from '@/services/admin/job.service';
import type {
  AdminJob,
  UpdateJobStatusRequest,
  UpdateJobStatusResponse,
  JobStatus,
} from '@/models/admin/job.model';

export class UpdateJobStatusUseCase {
  async execute(jobId: string, status: JobStatus): Promise<AdminJob> {
    try {
      // Validar que el status sea válido
      const validStatuses: JobStatus[] = ['DRAFT', 'OPEN', 'PAUSED', 'CLOSED', 'CANCELLED'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Estado inválido. Los estados válidos son: ${validStatuses.join(', ')}`);
      }

      if (!jobId || jobId.trim().length === 0) {
        throw new Error('El ID del trabajo es requerido');
      }

      const requestData: UpdateJobStatusRequest = { status };
      const response: UpdateJobStatusResponse = await adminJobService.updateJobStatus(jobId, requestData);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el estado del trabajo');
      }

      return response.data.job;
    } catch (error) {
      console.error('Error in update job status use case:', error);
      throw error;
    }
  }
}

export default new UpdateJobStatusUseCase();

