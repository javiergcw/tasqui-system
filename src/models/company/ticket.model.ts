// Modelo para tickets de company

export interface CreateTicketRequest {
  title: string;
  description: string;
}

export interface Ticket {
  id: string;
  company_id: string;
  requested_by_user_id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  data: {
    ticket: Ticket;
  };
}

export interface GetTicketsResponse {
  success: boolean;
  message: string;
  data: {
    tickets: Ticket[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface AddTicketNoteRequest {
  note: string;
}

export interface TicketNote {
  id: string;
  ticket_id: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface AddTicketNoteResponse {
  success: boolean;
  message: string;
  data: {
    note: TicketNote;
  };
}

