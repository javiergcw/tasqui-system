// Caso de uso para obtener leads de admin

import { adminLeadService } from '@/services/admin';
import type {
  AdminLead,
  AdminLeadsResponse,
  AdminLeadDetailData,
  AdminLeadDetailResponse,
} from '@/models/admin/lead.model';

export class GetAdminLeadsUseCase {
  async execute(): Promise<AdminLead[]> {
    try {
      const response: AdminLeadsResponse = await adminLeadService.getLeads();

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener los leads de admin');
      }

      return response.data.leads;
    } catch (error) {
      console.error('Error en get admin leads use case:', error);
      throw error;
    }
  }

  async executeById(id: string): Promise<AdminLeadDetailData> {
    try {
      const response: AdminLeadDetailResponse = await adminLeadService.getLeadById(id);

      if (!response.success) {
        throw new Error(response.message || 'Error al obtener el detalle del lead');
      }

      return response.data;
    } catch (error) {
      console.error('Error en get admin lead by id use case:', error);
      throw error;
    }
  }
}

export default new GetAdminLeadsUseCase();


