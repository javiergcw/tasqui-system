// Modelo para datos maestros completos de trabajos

export interface JobCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface JobTag {
  id: string;
  name: string;
  description: string;
}

export interface JobType {
  value: string;
  label: string;
}

export interface ExperienceLevel {
  value: string;
  label: string;
  description: string;
  years: string;
}

export interface JobMasterDataCompleteData {
  categories: JobCategory[];
  tags: JobTag[];
  job_types: JobType[];
  experience_levels: ExperienceLevel[];
}

export interface JobMasterDataCompleteResponse {
  success: boolean;
  message: string;
  data: JobMasterDataCompleteData;
}

