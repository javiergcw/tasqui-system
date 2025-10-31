// Modelo para tickets de company

export interface CreateTicketRequest {
  title: string;
  description: string;
}

export interface Ticket {
  id: string;
  user_id: string;
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

