// Servicio para suscripción al newsletter público

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { PublicNewsletterRequest, PublicNewsletterResponse } from '@/models/public-web/public-newsletter.model';

export class PublicNewsletterService {
  async subscribe(payload: PublicNewsletterRequest): Promise<PublicNewsletterResponse> {
    try {
      const response = await httpService.post<PublicNewsletterResponse>(
        API_ROUTES.publicWeb.newsletter,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error subscribing to public newsletter:', error);
      throw error;
    }
  }
}

export default new PublicNewsletterService();


