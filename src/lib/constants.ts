// Constantes de la aplicación

export const APP_CONFIG = {
  name: 'Tasqui Jobs',
  description: 'Plataforma de empleos y oportunidades laborales',
  url: 'https://tasquijobs.com',
  version: '1.0.0',
} as const;

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api2tasquiback.makerstech.co',
  apiVersion: 'v1',
} as const;

export const JOB_TYPES = [
  { value: 'full-time', label: 'Tiempo Completo' },
  { value: 'part-time', label: 'Medio Tiempo' },
  { value: 'contract', label: 'Por Contrato' },
  { value: 'remote', label: 'Remoto' },
] as const;

export const COMPANY_SIZES = [
  { value: 'startup', label: 'Startup (1-10 empleados)' },
  { value: 'small', label: 'Pequeña (11-50 empleados)' },
  { value: 'medium', label: 'Mediana (51-200 empleados)' },
  { value: 'large', label: 'Grande (201-1000 empleados)' },
  { value: 'enterprise', label: 'Empresa (1000+ empleados)' },
] as const;

export const INDUSTRIES = [
  'Tecnología',
  'Salud',
  'Educación',
  'Finanzas',
  'Marketing',
  'Ventas',
  'Recursos Humanos',
  'Diseño',
  'Ingeniería',
  'Consultoría',
  'Retail',
  'Manufactura',
  'Servicios',
  'Otro',
] as const;

export const SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'PHP',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'Git',
  'Figma',
  'Adobe Creative Suite',
  'Project Management',
  'Agile',
  'Scrum',
  'Data Analysis',
  'Machine Learning',
  'DevOps',
  'UI/UX Design',
] as const;
