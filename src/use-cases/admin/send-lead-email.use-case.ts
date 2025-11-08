// Caso de uso para enviar correo de activación a un lead

import { adminLeadService } from '@/services/admin';
import type {
  AdminLeadRole,
  SendAdminLeadEmailRequest,
  SendAdminLeadEmailResponse,
} from '@/models/admin/lead.model';

const VALID_ROLES: AdminLeadRole[] = ['EMPLOYEE', 'COMPANY', 'ADMIN'];

export class SendLeadEmailUseCase {
  async execute(
    leadId: string,
    data: SendAdminLeadEmailRequest
  ): Promise<SendAdminLeadEmailResponse> {
    this.validateLeadId(leadId);
    this.validatePayload(data);

    const response = await adminLeadService.sendLeadEmail(leadId, data);

    if (!response.success) {
      throw new Error(response.message || 'Error al enviar el correo al lead');
    }

    return response;
  }

  private validateLeadId(leadId: string): void {
    if (!leadId || leadId.trim().length === 0) {
      throw new Error('El identificador del lead es obligatorio');
    }
  }

  private validatePayload(data: SendAdminLeadEmailRequest): void {
    if (!data.password || data.password.trim().length === 0) {
      throw new Error('La contraseña temporal es obligatoria');
    }

    if (!VALID_ROLES.includes(data.role)) {
      throw new Error('Rol inválido. Los roles permitidos son EMPLOYEE, COMPANY o ADMIN');
    }
  }
}

export default new SendLeadEmailUseCase();


