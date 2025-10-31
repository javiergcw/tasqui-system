// Caso de uso para el perfil de admin

import adminProfileService from '@/services/admin/profile.service';
import type {
  AdminProfile,
  AdminProfileResponse,
} from '@/models/admin/profile.model';

export class AdminProfileUseCase {
  async execute(): Promise<AdminProfile> {
    try {
      const response: AdminProfileResponse = await adminProfileService.getProfile();
      
      if (!response.success) {
        throw new Error(response.message || 'Error al obtener el perfil del administrador');
      }

      return response.data.admin_profile;
    } catch (error) {
      console.error('Error in admin profile use case:', error);
      throw error;
    }
  }
}

export default new AdminProfileUseCase();

