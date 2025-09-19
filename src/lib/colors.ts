// Sistema de colores para la aplicación
export const colors = {
  // Colores principales
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Rojo principal
    600: '#dc2626',
  },
  
  // Azul oscuro para el fondo del sidebar
  dark: {
    800: '#1e293b',
    900: '#0f172a', // Azul muy oscuro para sidebar
  },
  
  // Colores específicos para Call to Action
  ctaBlue: '#010b29',
  mainRed: '#ef4444',
  
  // Colores específicos para Footer
  footerBackground: '#060f24',
  copyrightBackground: '#03143b',
  
  // Colores grises
  gray: {
    300: '#d1d5db',
    600: '#4b5563',
    800: '#1f2937',
  },
  
  // Colores naranjas
  orange: {
    500: '#f97316',
  },
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
    pagination: 'bg-white border border-gray-300 hover:bg-slate-900 hover:text-white hover:border-slate-900',
    paginationActive: 'bg-slate-900 text-white shadow-lg',
    paginationDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  },
  background: {
    gray50: 'bg-gray-50',
    red50: 'bg-red-50',
    red100: 'bg-red-100',
    pink200: 'bg-pink-200',
  },
  border: {
    gray200: 'border-gray-200',
    red500: 'border-red-500',
    dashed: 'border-dashed',
  },
  text: {
    blue600: 'text-blue-600',
    blue300: 'text-blue-300',
    red500: 'text-red-500',
    gray600: 'text-gray-600',
    gray300: 'text-gray-300',
    gray900: 'text-gray-900',
    slate800: 'text-slate-800',
  },
  gradient: {
    purpleOrange: 'bg-gradient-to-r from-purple-500 to-orange-500',
    greenBlue: 'bg-gradient-to-r from-green-500 to-blue-500',
  },
} as const;
