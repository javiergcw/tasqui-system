// Caso de uso para agregar nota a un ticket de company

import companyTicketService from '@/services/company/ticket.service';
import type { AddTicketNoteRequest, AddTicketNoteResponse, TicketNote } from '@/models/company/ticket.model';

export class AddTicketNoteUseCase {
  async execute(ticketId: string, data: AddTicketNoteRequest): Promise<TicketNote> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Realizar petición
      const response: AddTicketNoteResponse = await companyTicketService.addTicketNote(ticketId, data);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al agregar la nota al ticket');
      }

      return response.data.note;
    } catch (error) {
      console.error('Error in add ticket note use case:', error);
      throw error;
    }
  }

  private validateData(data: AddTicketNoteRequest): void {
    if (!data.note || data.note.trim().length === 0) {
      throw new Error('La nota es requerida');
    }

    if (data.note.length > 5000) {
      throw new Error('La nota no puede exceder 5000 caracteres');
    }
  }
}

export default new AddTicketNoteUseCase();

