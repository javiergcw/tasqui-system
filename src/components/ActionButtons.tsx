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
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden"
               style={{ backgroundColor: colors.sidebarGreen, border: `1px solid ${colors.mainGreen}` }}>
            <div className="py-2">
              {/* User Info */}
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-white text-sm font-semibold">{user.email}</p>
                <p className="text-slate-300 text-xs capitalize">{user.role?.toLowerCase()}</p>
              </div>
              
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
        className="text-white hover:text-slate-100 font-medium text-sm transition-colors duration-200"
      >
        Sign Up
      </Link>
      
      {/* Sign In Button */}
      <Link href="/login">
        <button 
          className="text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};
