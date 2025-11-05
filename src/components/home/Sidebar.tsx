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

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const navigationItems = [
    { label: 'Inicio', href: '#', hasDropdown: true, isActive: true },
    { label: 'Acerca de', href: '#', hasDropdown: false },
    {
      label: 'Empleos',
      href: '#',
      hasDropdown: true,
      subItems: [
        { label: 'Buscar Empleo', href: '/find-job' },
        { label: 'Categorías de Empleos', href: '#' },
        { label: 'Explorar Empleos', href: '#' }
      ]
    },
    { label: 'Candidatos', href: '#', hasDropdown: true },
    { label: 'Páginas', href: '#', hasDropdown: true },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Contáctanos', href: '#', hasDropdown: false },
  ];

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
      </div>
    </header>



  );
};
