// Modelo para estadísticas de admin

import type { AdminTicketNote } from './ticket.model';

export interface AdminStatsTicket {
  id: string;
  company_id: string;
  requested_by_user_id: string;
  assigned_admin_id?: string | null;
  title: string;
  description: string;
  status: string;
  notes?: AdminTicketNote[] | null;
  created_at: string;
  updated_at: string;
}

export interface AdminStatsJob {
  id: string;
  company_id: string;
  title: string;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
  applications_count: number;
}

export interface AdminJobStatistics {
  total: number;
  by_status: Record<string, number>;
  by_visibility: Record<string, number>;
}

export interface AdminTicketStatistics {
  total: number;
  by_status: Record<string, number>;
}

export interface AdminNoteStatistics {
  total: number;
}

export interface AdminStatsData {
  latest_tickets: AdminStatsTicket[];
  latest_jobs: AdminStatsJob[];
  job_statistics: AdminJobStatistics;
  ticket_statistics: AdminTicketStatistics;
  note_statistics: AdminNoteStatistics;
}

export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: AdminStatsData;
}


