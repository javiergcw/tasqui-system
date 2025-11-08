// Modelo para leads de admin

export interface AdminLead {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  location: string;
  country: string;
  city: string;
  job_title: string;
  company: string;
  experience: string;
  skills?: string;
  interests?: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  website?: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLeadsResponse {
  success: boolean;
  message: string;
  data: {
    leads: AdminLead[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface AdminLeadEducation {
  id: string;
  lead_id: string;
  degree_name: string;
  institution_name: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLeadExperience {
  id: string;
  lead_id: string;
  job_title: string;
  company_name: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLeadLanguage {
  lead_id: string;
  language_name: string;
  proficiency_level: string;
  certification: string;
}

export interface AdminLeadResume {
  id: string;
  lead_id: string;
  title: string;
  summary: string;
  file_url: string;
  visibility: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminLeadSkillCategory {
  lead_id: string;
  category_id: string;
}

export interface AdminLeadSkillSubcategory {
  lead_id: string;
  subcategory_id: string;
  level: number;
  years_experience: number;
}

export interface AdminLeadSkills {
  categories: AdminLeadSkillCategory[];
  subcategories: AdminLeadSkillSubcategory[];
}

export interface AdminLeadDetailData {
  lead: AdminLead;
  educations: AdminLeadEducation[];
  experiences: AdminLeadExperience[];
  languages: AdminLeadLanguage[];
  resume?: AdminLeadResume | null;
  skills?: AdminLeadSkills | null;
  message: string;
}

export interface AdminLeadDetailResponse {
  success: boolean;
  message: string;
  data: AdminLeadDetailData;
}

export type AdminLeadRole = 'EMPLOYEE' | 'COMPANY' | 'ADMIN';

export interface SendAdminLeadEmailRequest {
  password: string;
  role: AdminLeadRole;
}

export interface SendAdminLeadEmailResponse {
  success: boolean;
  message: string;
  data?: {
    lead_id: string;
    [key: string]: unknown;
  };
}


