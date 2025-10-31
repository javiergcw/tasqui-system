// Caso de uso para el perfil de company

import companyProfileService from '@/services/company/profile.service';
import type {
  CompanyProfile,
  CompanyProfileResponse,
} from '@/models/company/profile.model';

export class CompanyProfileUseCase {
  async execute(): Promise<CompanyProfile> {
    try {
      const response: CompanyProfileResponse = await companyProfileService.getProfile();
      
      if (!response.success) {
        throw new Error(response.message || 'Error al obtener el perfil de la empresa');
      }

      return response.data.company_profile;
    } catch (error) {
      console.error('Error in company profile use case:', error);
      throw error;
    }
  }
}

export default new CompanyProfileUseCase();

