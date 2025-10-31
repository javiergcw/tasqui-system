// Servicio para tickets de company

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { CreateTicketRequest, CreateTicketResponse } from '@/models/company/ticket.model';

class CompanyTicketService {
  async createTicket(data: CreateTicketRequest): Promise<CreateTicketResponse> {
    const response = await httpService.post<CreateTicketResponse>(
      API_ROUTES.company.tickets,
      data
    );
    return response.data;
  }
}

export default new CompanyTicketService();

