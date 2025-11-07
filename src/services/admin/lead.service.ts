// Servicio para leads de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { AdminLeadDetailResponse, AdminLeadsResponse } from '@/models/admin/lead.model';

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
}

export default new AdminLeadService();


