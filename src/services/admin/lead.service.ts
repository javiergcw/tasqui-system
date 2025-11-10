// Servicio para leads de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  AdminLeadDetailResponse,
  AdminLeadsResponse,
  ConvertAdminLeadRequest,
  ConvertAdminLeadResponse,
  UpdateAdminLeadEmailRequest,
  UpdateAdminLeadEmailResponse,
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

  async convertLead(
    id: string,
    data: ConvertAdminLeadRequest
  ): Promise<ConvertAdminLeadResponse> {
    const response = await httpService.post<ConvertAdminLeadResponse>(
      API_ROUTES.admin.convertLead(id),
      data
    );
    return response.data;
  }

  async updateLeadEmail(
    id: string,
    data: UpdateAdminLeadEmailRequest
  ): Promise<UpdateAdminLeadEmailResponse> {
    const response = await httpService.put<UpdateAdminLeadEmailResponse>(
      API_ROUTES.admin.updateLeadEmail(id),
      data
    );
    return response.data;
  }
}

export default new AdminLeadService();


