// Caso de uso para el perfil de empleado

import employeeProfileService from '@/services/employee/profile.service';
import type { 
  EmployeeProfileResponse,
  UpdateEmployeeProfileRequest,
  UpdateEmployeeProfileResponse,
  EmployeeProfile
} from '@/models/employee/profile.model';

export class EmployeeProfileUseCase {
  async execute(): Promise<EmployeeProfileResponse> {
    try {
      const result = await employeeProfileService.getProfile();
      return result;
    } catch (error) {
      console.error('Error in employee profile use case:', error);
      throw error;
    }
  }

  async updateProfile(data: UpdateEmployeeProfileRequest): Promise<EmployeeProfile> {
    try {
      // Validaciones básicas
      this.validateUpdateData(data);

      const response: UpdateEmployeeProfileResponse = await employeeProfileService.updateProfile(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el perfil del empleado');
      }

      return response.data.employee_profile;
    } catch (error) {
      console.error('Error in employee profile update use case:', error);
      throw error;
    }
  }

  private validateUpdateData(data: UpdateEmployeeProfileRequest): void {
    if (!data.first_name || data.first_name.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }

    if (!data.last_name || data.last_name.trim().length === 0) {
      throw new Error('El apellido es requerido');
    }

    if (!data.headline || data.headline.trim().length === 0) {
      throw new Error('El título profesional es requerido');
    }

    if (!data.location || data.location.trim().length === 0) {
      throw new Error('La ubicación es requerida');
    }

    if (!data.country || data.country.trim().length === 0) {
      throw new Error('El país es requerido');
    }

    if (!data.city || data.city.trim().length === 0) {
      throw new Error('La ciudad es requerida');
    }

    if (!data.zip_code || data.zip_code.trim().length === 0) {
      throw new Error('El código postal es requerido');
    }

    if (!data.primary_language || data.primary_language.trim().length === 0) {
      throw new Error('El idioma principal es requerido');
    }

    // Validar URLs si están presentes
    if (data.facebook_url && !this.isValidUrl(data.facebook_url)) {
      throw new Error('La URL de Facebook no es válida');
    }

    if (data.twitter_url && !this.isValidUrl(data.twitter_url)) {
      throw new Error('La URL de Twitter no es válida');
    }

    if (data.linkedin_url && !this.isValidUrl(data.linkedin_url)) {
      throw new Error('La URL de LinkedIn no es válida');
    }

    if (data.github_url && !this.isValidUrl(data.github_url)) {
      throw new Error('La URL de GitHub no es válida');
    }

    // Validar fecha de nacimiento si está presente
    if (data.birth_date) {
      const birthDate = new Date(data.birth_date);
      if (isNaN(birthDate.getTime())) {
        throw new Error('La fecha de nacimiento no es válida');
      }
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export default new EmployeeProfileUseCase();

