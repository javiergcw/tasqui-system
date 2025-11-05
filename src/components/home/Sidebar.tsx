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
    { label: 'Home', href: '#', hasDropdown: true, isActive: true },
    { label: 'About', href: '#', hasDropdown: false },
    { 
      label: 'Jobs', 
      href: '#', 
      hasDropdown: true,
      subItems: [
        { label: 'Find A Job', href: '/find-job' },
        { label: 'Job Categories', href: '#' },
        { label: 'Browse Jobs', href: '#' }
      ]
    },
    { label: 'Candidates', href: '#', hasDropdown: true },
    { label: 'Pages', href: '#', hasDropdown: true },
    { label: 'Blog', href: '/blogs', hasDropdown: false },
    { label: 'Contact Us', href: '#', hasDropdown: false },
  ];

  return (
    <header 
      className={`shadow-lg ${className}`}
      style={{ backgroundColor: colors.ctaGreen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Navigation - Solo visible en desktop */}
          <div className="hidden lg:block">
            <Navigation items={navigationItems} />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center">
            <ActionButtons />
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
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
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div 
              className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-800"
              style={{ backgroundColor: colors.sidebarGreen }}
            >
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium ${colorClasses.sidebar.text} ${colorClasses.sidebar.textHover} hover:bg-slate-800 rounded-md transition-colors`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-slate-800">
                {user ? (
                  <div className="px-3">
                    <div className="flex items-center space-x-2 mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: colors.mainGreen }}
                      >
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold">{user.email}</p>
                        <p className="text-slate-300 text-xs capitalize">{user.role?.toLowerCase()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={logout}
                      className="w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                      style={{ backgroundColor: colors.mainGreen }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 px-3">
                    <Link
                      href="/register"
                      className={`${colorClasses.sidebar.text} ${colorClasses.sidebar.textHover} font-medium text-sm transition-colors`}
                    >
                      Sign Up
                    </Link>
                    <Link href="/login">
                      <button 
                        className={`${colors.mainGreen} px-4 py-2 rounded-lg font-medium text-sm transition-colors w-full`}
                      >
                        Sign In
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
