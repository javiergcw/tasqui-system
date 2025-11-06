// Caso de uso para el perfil de company

import companyProfileService from '@/services/company/profile.service';
import type {
  CompanyProfile,
  CompanyProfileResponse,
  UpdateCompanyProfileRequest,
  UpdateCompanyProfileResponse,
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

  async updateProfile(data: UpdateCompanyProfileRequest): Promise<CompanyProfile> {
    try {
      // Validaciones básicas
      this.validateUpdateData(data);

      const response: UpdateCompanyProfileResponse = await companyProfileService.updateProfile(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el perfil de la empresa');
      }

      return response.data.company_profile;
    } catch (error) {
      console.error('Error in company profile update use case:', error);
      throw error;
    }
  }

  private validateUpdateData(data: UpdateCompanyProfileRequest): void {
    if (!data.legal_name || data.legal_name.trim().length === 0) {
      throw new Error('El nombre legal de la empresa es requerido');
    }

    if (!data.contact_name || data.contact_name.trim().length === 0) {
      throw new Error('El nombre de contacto es requerido');
    }

    if (!data.contact_email || !this.isValidEmail(data.contact_email)) {
      throw new Error('El email de contacto es inválido');
    }

    if (!data.contact_phone || data.contact_phone.trim().length === 0) {
      throw new Error('El teléfono de contacto es requerido');
    }

    if (!data.billing_plan || !['basic', 'premium'].includes(data.billing_plan)) {
      throw new Error('El plan de facturación debe ser "basic" o "premium"');
    }

    if (!data.max_open_jobs || data.max_open_jobs <= 0) {
      throw new Error('El número máximo de trabajos abiertos debe ser mayor a 0');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new CompanyProfileUseCase();

