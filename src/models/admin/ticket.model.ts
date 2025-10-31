// Modelo para tickets de admin

export interface AdminTicket {
  id: string;
  company_id: string;
  requested_by_user_id: string;
  title: string;
  description: string;
  status: string;
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

