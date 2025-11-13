'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { ActionButtons } from '../ActionButtons';
import { colorClasses, colors } from '@/lib/colors';
import { getUser, logout } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  subItems?: { label: string; href: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    
    // Escuchar cambios en el localStorage para actualizar el usuario
    const handleStorageChange = () => {
      const updatedUser = getUser();
      setUser(updatedUser);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Navegación para usuarios no logueados (rutas públicas)
  const publicNavigationItems: NavItem[] = [
    { label: 'Inicio', href: '/', hasDropdown: false },
    { label: 'Buscar Trabajos', href: '/find-job', hasDropdown: false },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Partners', href: '/partners', hasDropdown: false },
  ];

  // Navegación para admin (sin rutas que requieren ID o parámetros)
  const adminNavigationItems: NavItem[] = [
    { label: 'Inicio', href: '/', hasDropdown: false },
    { label: 'Buscar Trabajos', href: '/find-job', hasDropdown: false },
    {
      label: 'Trabajos',
      href: '#',
      hasDropdown: true,
      subItems: [
        { label: 'Mis Trabajos', href: '/admin/my-jobs' },
      ]
    },
    { label: 'Perfil', href: '/admin/profile', hasDropdown: false },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Partners', href: '/partners', hasDropdown: false },
  ];

  // Navegación para empleados (solo rutas públicas + perfil)
  const employeeNavigationItems: NavItem[] = [
    { label: 'Inicio', href: '/', hasDropdown: false },
    { label: 'Buscar Trabajos', href: '/find-job', hasDropdown: false },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Partners', href: '/partners', hasDropdown: false },
    { label: 'Mi Perfil', href: '/employee/profile', hasDropdown: false },
  ];

  // Navegación para company (rutas públicas + rutas de company sin parámetros)
  const companyNavigationItems: NavItem[] = [
    { label: 'Inicio', href: '/', hasDropdown: false },
    { label: 'Buscar Trabajos', href: '/find-job', hasDropdown: false },
    {
      label: 'Trabajos',
      href: '#',
      hasDropdown: true,
      subItems: [
        { label: 'Mis Trabajos', href: '/company/my-jobs' },
      ]
    },
    { label: 'Perfil', href: '/company/profile', hasDropdown: false },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Partners', href: '/partners', hasDropdown: false },
  ];

  const navigationItems = 
    user?.role === 'ADMIN' 
      ? adminNavigationItems 
      : user?.role === 'EMPLOYEE' 
      ? employeeNavigationItems 
      : user?.role === 'COMPANY'
      ? companyNavigationItems
      : publicNavigationItems;

  return (
    <header
      className={`shadow-lg ${className}`}
      style={{ backgroundColor: colors.ctaGreen }}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="flex items-center h-20 w-full">

          {/* Logo - alineado extremo izquierdo */}
          <div className="flex-shrink-0 mr-auto">
            <Logo />
          </div>

          {/* Navegación centrada */}
          <div className="hidden lg:flex justify-center flex-grow">
            <Navigation items={navigationItems} />
          </div>

          {/* Botones de acción - alineado extremo derecho */}
          <div className="hidden lg:flex items-center ml-auto space-x-4">
            <ActionButtons />
          </div>

          {/* Menú móvil */}
          <div className="lg:hidden flex-shrink-0">
            <button
              className={`${colorClasses.sidebar.text} ${colorClasses.sidebar.textHover} p-2`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {/* Navegación móvil */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.href !== '#' ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="px-4 py-2 text-white">{item.label}</div>
                    )}
                    {item.hasDropdown && item.subItems && (
                      <div className="pl-6 space-y-1 mt-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors duration-200 text-sm"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Botones de acción móvil */}
              <div className="pt-4 border-t border-white/20">
                <ActionButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>



  );
};
