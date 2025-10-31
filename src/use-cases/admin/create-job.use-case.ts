// Caso de uso para crear jobs de admin

import adminJobService from '@/services/admin/job.service';
import type {
  CreateJobRequest,
  CreateJobResponse,
  AdminJob,
} from '@/models/admin/job.model';

export class CreateJobUseCase {
  async execute(data: CreateJobRequest): Promise<AdminJob> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Realizar petición
      const response: CreateJobResponse = await adminJobService.createJob(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al crear el trabajo');
      }

      return response.data.job;
    } catch (error) {
      console.error('Error in create job use case:', error);
      throw error;
    }
  }

  private validateData(data: CreateJobRequest): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }

    if (!data.description || data.description.trim().length === 0) {
      throw new Error('La descripción es requerida');
    }

    if (!data.location || data.location.trim().length === 0) {
      throw new Error('La ubicación es requerida');
    }

    // ticket_id es opcional

    if (data.salary_min < 0 || data.salary_max < 0) {
      throw new Error('Los salarios no pueden ser negativos');
    }

    if (data.salary_min > data.salary_max) {
      throw new Error('El salario mínimo no puede ser mayor que el máximo');
    }
  }
}

export default new CreateJobUseCase();

