// Caso de uso para obtener tickets de company

import companyTicketService from '@/services/company/ticket.service';
import type { GetTicketsResponse, Ticket } from '@/models/company/ticket.model';

export class GetTicketsUseCase {
  async execute(): Promise<Ticket[]> {
    try {
      const response: GetTicketsResponse = await companyTicketService.getTickets();
      
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

