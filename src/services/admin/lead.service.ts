// Servicio para leads de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  AdminLeadDetailResponse,
  AdminLeadsResponse,
  SendAdminLeadEmailRequest,
  SendAdminLeadEmailResponse,
} from '@/models/admin/lead.model';

class AdminLeadService {
  async getLeads(): Promise<AdminLeadsResponse> {
    const response = await httpService.get<AdminLeadsResponse>(
      API_ROUTES.admin.leads
    );
    return response.data;
  }

  async getLeadById(id: string): Promise<AdminLeadDetailResponse> {
    const response = await httpService.get<AdminLeadDetailResponse>(
      API_ROUTES.admin.leadDetail(id)
    );
    return response.data;
  }

  async sendLeadEmail(
    id: string,
    data: SendAdminLeadEmailRequest
  ): Promise<SendAdminLeadEmailResponse> {
    const response = await httpService.post<SendAdminLeadEmailResponse>(
      API_ROUTES.admin.sendLeadEmail(id),
      data
    );
    return response.data;
  }
}

export default new AdminLeadService();


