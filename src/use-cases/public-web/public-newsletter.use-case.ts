// Caso de uso para suscripción al newsletter público

import publicNewsletterService from '@/services/public-web/public-newsletter.service';
import type { PublicNewsletterRequest, PublicNewsletterResponse } from '@/models/public-web/public-newsletter.model';

export class PublicNewsletterUseCase {
  async execute(payload: PublicNewsletterRequest): Promise<PublicNewsletterResponse> {
    try {
      const result = await publicNewsletterService.subscribe(payload);
      return result;
    } catch (error) {
      console.error('Error in public newsletter use case:', error);
      throw error;
    }
  }
}

export default new PublicNewsletterUseCase();


