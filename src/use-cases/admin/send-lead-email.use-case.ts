// Caso de uso para convertir un lead en usuario

import { adminLeadService } from '@/services/admin';
import type {
  AdminLeadRole,
  ConvertAdminLeadRequest,
  ConvertAdminLeadResponse,
} from '@/models/admin/lead.model';

const VALID_ROLES: AdminLeadRole[] = ['EMPLOYEE', 'COMPANY', 'ADMIN'];

export class ConvertLeadUseCase {
  async execute(
    leadId: string,
    data: ConvertAdminLeadRequest
  ): Promise<ConvertAdminLeadResponse> {
    this.validateLeadId(leadId);
    this.validatePayload(data);

    const response = await adminLeadService.convertLead(leadId, data);

    if (!response.success) {
      throw new Error(response.message || 'Error al convertir el lead en usuario');
    }

    return response;
  }

  private validateLeadId(leadId: string): void {
    if (!leadId || leadId.trim().length === 0) {
      throw new Error('El identificador del lead es obligatorio');
    }
  }

  private validatePayload(data: ConvertAdminLeadRequest): void {
    if (!data.password || data.password.trim().length === 0) {
      throw new Error('La contraseña temporal es obligatoria');
    }

    if (!VALID_ROLES.includes(data.role)) {
      throw new Error('Rol inválido. Los roles permitidos son EMPLOYEE, COMPANY o ADMIN');
    }
  }
}

export default new ConvertLeadUseCase();


