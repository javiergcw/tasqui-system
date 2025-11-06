// Caso de uso para habilidades completas

import skillsCompleteService from '@/services/master/skills-complete.service';
import type { SkillsCompleteResponse } from '@/models/master/skills-complete.model';

export class SkillsCompleteUseCase {
  async execute(): Promise<SkillsCompleteResponse> {
    try {
      const result = await skillsCompleteService.getSkillsComplete();
      return result;
    } catch (error) {
      console.error('Error in skills complete use case:', error);
      throw error;
    }
  }
}

export default new SkillsCompleteUseCase();

