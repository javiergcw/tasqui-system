// Caso de uso para actualizar el email de un lead

import { adminLeadService } from '@/services/admin';
import type {
  UpdateAdminLeadEmailRequest,
  UpdateAdminLeadEmailResponse,
} from '@/models/admin/lead.model';

export class UpdateLeadEmailUseCase {
  async execute(
    leadId: string,
    data: UpdateAdminLeadEmailRequest
  ): Promise<UpdateAdminLeadEmailResponse> {
    this.validateLeadId(leadId);
    this.validatePayload(data);

    const response = await adminLeadService.updateLeadEmail(leadId, data);

    if (!response.success) {
      throw new Error(response.message || 'Error al actualizar el correo del lead');
    }

    return response;
  }

  private validateLeadId(leadId: string): void {
    if (!leadId || !leadId.trim().length) {
      throw new Error('El identificador del lead es obligatorio');
    }
  }

  private validatePayload(data: UpdateAdminLeadEmailRequest): void {
    if (!data.email || !data.email.trim().length) {
      throw new Error('El correo electrónico es obligatorio');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('El correo electrónico proporcionado no es válido');
    }
  }
}

export default new UpdateLeadEmailUseCase();


