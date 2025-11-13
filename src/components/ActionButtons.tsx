'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';
import { getUser, logout } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';

interface ActionButtonsProps {
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ className = '' }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Obtener usuario del localStorage
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
  };

  // Si el usuario está logueado, mostrar su información
  if (user) {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        {/* User Avatar/Email */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          {/* Avatar */}
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: colors.mainGreen }}
          >
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          {/* Email */}
          <span className="text-white text-sm font-medium hidden md:block">
            {user.email}
          </span>
          
          {/* Dropdown Icon */}
          <svg 
            className="w-4 h-4 text-white"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50 overflow-hidden"
               style={{ backgroundColor: colors.sidebarGreen, border: `1px solid ${colors.mainGreen}` }}>
            <div className="py-2">
              {/* User Info */}
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-white text-sm font-semibold">{user.email}</p>
                <p className="text-slate-300 text-xs capitalize">{user.role?.toLowerCase()}</p>
              </div>
              
              {/* Admin Navigation Menu */}
              {user.role === 'ADMIN' && (
                <div className="py-2 border-b border-slate-700">
                  <Link
                    href="/admin/my-jobs"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Mis Trabajos</span>
                  </Link>
                  
                  <Link
                    href="/admin/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Mi Perfil</span>
                  </Link>
                </div>
              )}

              {/* Employee Navigation Menu */}
              {user.role === 'EMPLOYEE' && (
                <div className="py-2 border-b border-slate-700">
                  <Link
                    href="/find-job"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Buscar Trabajos</span>
                  </Link>
                  
                  <Link
                    href="/blogs"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span>Blog</span>
                  </Link>
                  
                  <Link
                    href="/partners"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Partners</span>
                  </Link>
                  
                  <Link
                    href="/employee/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Mi Perfil</span>
                  </Link>
                </div>
              )}

              {/* Company Navigation Menu */}
              {user.role === 'COMPANY' && (
                <div className="py-2 border-b border-slate-700">
                  <Link
                    href="/company/my-jobs"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Mis Trabajos</span>
                  </Link>
                  
                  <Link
                    href="/company/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Mi Perfil</span>
                  </Link>
                </div>
              )}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Si no está logueado, mostrar botones de Sign Up y Sign In
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Sign Up Link */}
      <Link
        href="/register"
        className="text-white hover:text-slate-100 font-medium text-sm transition-colors duration-200 border border-white px-4 py-2 rounded-lg whitespace-nowrap"
      >
        Registrarse
      </Link>
      
      {/* Sign In Button */}
      <Link href="/login">
        <button 
          className="text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 whitespace-nowrap"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Iniciar Sesión
        </button>
      </Link>
    </div>
  );
};
