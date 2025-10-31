// Caso de uso para el registro de empresas

import companyRegisterService from '@/services/company/register.service';
import type {
  CompanyRegisterRequest,
  CompanyRegisterResponse,
} from '@/models/company/register.model';

export class CompanyRegisterUseCase {
  async execute(
    data: CompanyRegisterRequest
  ): Promise<CompanyRegisterResponse> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Registrar empresa
      const result = await companyRegisterService.register(data);

      return result;
    } catch (error) {
      console.error('Error in company register use case:', error);
      throw error;
    }
  }

  private validateData(data: CompanyRegisterRequest): void {
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Email inválido');
    }

    if (!data.password || data.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    if (!data.company_legal_name) {
      throw new Error('El nombre legal de la empresa es requerido');
    }

    if (!data.company_contact_name || !data.company_contact_email || !data.company_contact_phone) {
      throw new Error('Los datos de contacto son requeridos');
    }

    if (!data.company_billing_plan) {
      throw new Error('El plan de facturación es requerido');
    }

    if (!data.company_max_open_jobs || data.company_max_open_jobs <= 0) {
      throw new Error('El número máximo de trabajos abiertos debe ser mayor a 0');
    }

    if (data.role !== 'COMPANY') {
      throw new Error('El rol debe ser COMPANY');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new CompanyRegisterUseCase();

