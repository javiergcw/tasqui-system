// Servicio para empresas públicas

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { PublicCompaniesResponse } from '@/models/public-web/public-companies.model';

export class PublicCompaniesService {
  async getPublicCompanies(): Promise<PublicCompaniesResponse> {
    try {
      // Petición pública sin autorización - el httpService detecta automáticamente endpoints /public/
      const response = await httpService.get<PublicCompaniesResponse>(
        API_ROUTES.publicWeb.companies
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching public companies:', error);
      throw error;
    }
  }
}

export default new PublicCompaniesService();

