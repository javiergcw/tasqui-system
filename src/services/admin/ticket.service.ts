// Servicio para tickets de admin

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { AdminTicketsResponse } from '@/models/admin/ticket.model';

class AdminTicketService {
  async getTickets(): Promise<AdminTicketsResponse> {
    const response = await httpService.get<AdminTicketsResponse>(
      API_ROUTES.admin.tickets
    );
    return response.data;
  }
}

export default new AdminTicketService();

