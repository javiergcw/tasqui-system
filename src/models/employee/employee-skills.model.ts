// Modelos para habilidades del empleado

export type EmployeeSkillCategoryType = 'HARD' | 'SOFT' | 'OTHER';

export interface EmployeeSkillCategory {
  id: string;
  name: string;
  type: EmployeeSkillCategoryType;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeSkillSubcategory {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeSkillCategoryRelationship {
  employee_profile_id: string;
  category_id: string;
}

export interface EmployeeSkillSubcategoryRelationship {
  employee_profile_id: string;
  subcategory_id: string;
  level?: number | null;
  years_experience?: number | null;
  last_used_at?: string | null;
}

export interface EmployeeSkillSubcategoryItem {
  relationship: EmployeeSkillSubcategoryRelationship;
  subcategory: EmployeeSkillSubcategory;
}

export interface EmployeeSkillCategoryItem {
  relationship: EmployeeSkillCategoryRelationship;
  category: EmployeeSkillCategory;
  subcategories: EmployeeSkillSubcategoryItem[];
}

export interface EmployeeSkillsData {
  skill_categories: EmployeeSkillCategoryItem[];
}

export interface EmployeeSkillsResponse {
  success: boolean;
  message: string;
  data: EmployeeSkillsData;
}

export interface EmployeeSkillSelectionSubcategoryInput {
  subcategory_id: string;
  level: number;
  years_experience?: number | null;
  last_used_at?: string | null;
}

export interface EmployeeSkillSelectionCategoryInput {
  category_id: string;
  subcategories?: EmployeeSkillSelectionSubcategoryInput[];
}

export interface EmployeeSkillsUpsertRequest {
  skill_categories: EmployeeSkillSelectionCategoryInput[];
}

export interface EmployeeSkillsUpsertResponse {
  success: boolean;
  message: string;
  data?: {
    updated: boolean;
  };
}



