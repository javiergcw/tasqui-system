// Tipos globales para la aplicación

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  deadline?: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  location: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  industry: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'candidate' | 'employer' | 'admin';
  profile?: CandidateProfile | EmployerProfile;
}

export interface CandidateProfile {
  title: string;
  experience: number;
  skills: string[];
  education: Education[];
  workHistory: WorkExperience[];
  resume?: string;
}

export interface EmployerProfile {
  companyId: string;
  position: string;
  department?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
}
