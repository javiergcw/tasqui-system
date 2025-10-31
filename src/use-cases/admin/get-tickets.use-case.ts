// Caso de uso para obtener tickets de admin

import adminTicketService from '@/services/admin/ticket.service';
import type {
  AdminTicket,
  AdminTicketsResponse,
} from '@/models/admin/ticket.model';

export class GetTicketsUseCase {
  async execute(): Promise<AdminTicket[]> {
    try {
      const response: AdminTicketsResponse = await adminTicketService.getTickets();
      
      if (!response.success) {
        throw new Error(response.message || 'Error al obtener los tickets');
      }

      return response.data.tickets;
    } catch (error) {
      console.error('Error in get tickets use case:', error);
      throw error;
    }
  }
}

export default new GetTicketsUseCase();

