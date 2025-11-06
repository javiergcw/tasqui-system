// Servicio para habilidades completas (público)

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { SkillsCompleteResponse } from '@/models/master/skills-complete.model';

export class SkillsCompleteService {
  async getSkillsComplete(): Promise<SkillsCompleteResponse> {
    try {
      const response = await httpService.get<SkillsCompleteResponse>(
        API_ROUTES.master.skillsComplete
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching skills complete:', error);
      throw error;
    }
  }
}

export default new SkillsCompleteService();

