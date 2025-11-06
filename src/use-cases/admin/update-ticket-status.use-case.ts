// Caso de uso para actualizar el estado de un ticket de admin

import adminTicketService from '@/services/admin/ticket.service';
import type {
  AdminTicket,
  UpdateTicketStatusRequest,
  UpdateTicketStatusResponse,
  TicketStatus,
} from '@/models/admin/ticket.model';

export class UpdateTicketStatusUseCase {
  async execute(ticketId: string, status: TicketStatus): Promise<AdminTicket> {
    try {
      // Validar que el status sea válido
      const validStatuses: TicketStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Estado inválido. Los estados válidos son: ${validStatuses.join(', ')}`);
      }

      const requestData: UpdateTicketStatusRequest = { status };
      const response: UpdateTicketStatusResponse = await adminTicketService.updateTicketStatus(ticketId, requestData);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el estado del ticket');
      }

      return response.data.ticket;
    } catch (error) {
      console.error('Error in update ticket status use case:', error);
      throw error;
    }
  }
}

export default new UpdateTicketStatusUseCase();

