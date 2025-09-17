// Sistema de colores para la aplicación
export const colors = {
  // Colores principales
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#fc1717', // Rojo principal
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Azul oscuro para el fondo del sidebar
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a', // Azul muy oscuro para sidebar
  },
  
  // Colores neutros
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Colores de estado
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  
  // Colores específicos del diseño
  sidebar: {
    background: '#0f172a', // dark.900
    text: '#ffffff',
    textHover: '#f1f5f9', // dark.100
    active: '#ef4444', // primary.500
  },
  
  // Colores específicos para Call to Action
  ctaBlue: '#010b29',
  mainRed: '#ef4444',
  
  // Colores específicos para Footer
  footerBackground: '#060f24',
  copyrightBackground: '#03143b',
  
  button: {
    primary: '#ef4444', // primary.500
    primaryHover: '#dc2626', // primary.600
    secondary: 'transparent',
    secondaryHover: '#1e293b', // dark.800
  }
} as const;

// Clases de Tailwind para usar en componentes
export const colorClasses = {
  sidebar: {
    background: 'bg-slate-900',
    text: 'text-white',
    textHover: 'hover:text-slate-100',
    active: 'text-red-500',
    activeBg: 'bg-red-500',
  },
  button: {
    primary: 'bg-red-500 hover:bg-red-600 text-white',
    secondary: 'bg-transparent hover:bg-slate-800 text-white',
  }
} as const;
