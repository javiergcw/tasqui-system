// Caso de uso para empresas públicas

import publicCompaniesService from '@/services/public-web/public-companies.service';
import type { PublicCompaniesResponse } from '@/models/public-web/public-companies.model';

export class PublicCompaniesUseCase {
  async execute(): Promise<PublicCompaniesResponse> {
    try {
      const result = await publicCompaniesService.getPublicCompanies();
      return result;
    } catch (error) {
      console.error('Error in public companies use case:', error);
      throw error;
    }
  }
}

export default new PublicCompaniesUseCase();

