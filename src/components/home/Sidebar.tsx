'use client';
import React, { useState } from 'react';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { ActionButtons } from '../ActionButtons';
import { colorClasses,colors } from '@/lib/colors';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <header className={`${colorClasses.sidebar.background} shadow-lg ${className}`}>
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
            <div className={`px-2 pt-2 pb-3 space-y-1 ${colorClasses.sidebar.background} border-t border-slate-800`}>
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
                <div className="flex flex-col space-y-2 px-3">
                  <a
                    href="#"
                    className={`${colorClasses.sidebar.text} ${colorClasses.sidebar.textHover} font-medium text-sm transition-colors`}
                  >
                    Sign Up
                  </a>
                  <button 
                    className={`${colors.mainRed} px-4 py-2 rounded-lg font-medium text-sm transition-colors w-full`}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
