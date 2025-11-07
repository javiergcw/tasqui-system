// Modelo para tickets de admin

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface AdminTicket {
  id: string;
  company_id: string;
  requested_by_user_id: string;
  assigned_admin_id?: string | null;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  notes?: AdminTicketNote[] | null;
}

export interface AdminTicketNote {
  id: string;
  ticket_id: string;
  company_id: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface AdminTicketsResponse {
  success: boolean;
  message: string;
  data: {
    tickets: AdminTicket[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface UpdateTicketStatusRequest {
  status: TicketStatus;
}

export interface UpdateTicketStatusResponse {
  success: boolean;
  message: string;
  data: {
    ticket: AdminTicket;
  };
}

