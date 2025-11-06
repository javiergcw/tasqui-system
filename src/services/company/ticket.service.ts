// Servicio para tickets de company

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { 
  CreateTicketRequest, 
  CreateTicketResponse, 
  GetTicketsResponse,
  AddTicketNoteRequest,
  AddTicketNoteResponse
} from '@/models/company/ticket.model';

class CompanyTicketService {
  async createTicket(data: CreateTicketRequest): Promise<CreateTicketResponse> {
    const response = await httpService.post<CreateTicketResponse>(
      API_ROUTES.company.tickets,
      data
    );
    return response.data;
  }

  async getTickets(): Promise<GetTicketsResponse> {
    try {
      // Verificar que el token existe antes de hacer la petición
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No hay token de autenticación disponible');
        }
      }
      
      // Asegurarse de usar la ruta correcta de company
      const endpoint = '/api/v1/company/tickets';
      console.log('🔍 CompanyTicketService - Endpoint a usar:', endpoint);
      console.log('🔍 API_ROUTES.company.tickets:', API_ROUTES.company.tickets);
      
      const response = await httpService.get<GetTicketsResponse>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      // Si el error es de autenticación, mostrar más detalles
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error.data as any;
        if (errorData?.message || errorData?.error) {
          console.error('Error del servidor:', errorData);
        }
      }
      throw error;
    }
  }

  async addTicketNote(ticketId: string, data: AddTicketNoteRequest): Promise<AddTicketNoteResponse> {
    try {
      const endpoint = API_ROUTES.company.ticketNotes(ticketId);
      const response = await httpService.post<AddTicketNoteResponse>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error adding ticket note:', error);
      throw error;
    }
  }
}

export default new CompanyTicketService();

