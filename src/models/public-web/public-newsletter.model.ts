// Modelos para suscripción al newsletter público

export interface PublicNewsletterRequest {
  email: string;
}

export interface PublicNewsletterResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    subscribed_at?: string;
  } | null;
}


