// Caso de uso para actualizar el estado de una solicitud de empleo en admin

import adminJobApplicationService from '@/services/admin/job-application.service';
import type {
  AdminJobApplication,
  UpdateJobApplicationStatusRequest,
  UpdateJobApplicationStatusResponse,
  JobApplicationStatus,
} from '@/models/admin/job-applicants.model';

export class UpdateJobApplicationStatusUseCase {
  async execute(
    applicationId: string,
    status: JobApplicationStatus
  ): Promise<AdminJobApplication> {
    try {
      if (!applicationId || applicationId.trim().length === 0) {
        throw new Error('El ID de la solicitud es requerido');
      }

      if (!status) {
        throw new Error('El estado de la solicitud es requerido');
      }

      const payload: UpdateJobApplicationStatusRequest = { status };

      const response: UpdateJobApplicationStatusResponse =
        await adminJobApplicationService.updateStatus(applicationId, payload);

      if (!response.success) {
        throw new Error(
          response.message ||
            'Error al actualizar el estado de la solicitud de empleo'
        );
      }

      return response.data.job_application;
    } catch (error) {
      console.error('Error in update job application status use case:', error);
      throw error;
    }
  }
}

export default new UpdateJobApplicationStatusUseCase();


