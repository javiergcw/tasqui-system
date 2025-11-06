// Modelo para habilidades completas

export type SkillType = 'HARD' | 'SOFT';

export interface SkillSubcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  type: SkillType;
  description: string;
  created_at: string;
  updated_at: string;
  subcategories: SkillSubcategory[];
}

export interface SkillsCompleteData {
  categories: SkillCategory[];
}

export interface SkillsCompleteResponse {
  success: boolean;
  message: string;
  data: SkillsCompleteData;
}

