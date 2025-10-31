// Caso de uso para crear tickets de company

import companyTicketService from '@/services/company/ticket.service';
import type {
  CreateTicketRequest,
  CreateTicketResponse,
  Ticket,
} from '@/models/company/ticket.model';

export class CreateTicketUseCase {
  async execute(data: CreateTicketRequest): Promise<Ticket> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Realizar petición
      const response: CreateTicketResponse = await companyTicketService.createTicket(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al crear el ticket');
      }

      return response.data.ticket;
    } catch (error) {
      console.error('Error in create ticket use case:', error);
      throw error;
    }
  }

  private validateData(data: CreateTicketRequest): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }

    if (!data.description || data.description.trim().length === 0) {
      throw new Error('La descripción es requerida');
    }
  }
}

export default new CreateTicketUseCase();

