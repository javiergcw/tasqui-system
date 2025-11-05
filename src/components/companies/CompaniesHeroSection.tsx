'use client';
import React from 'react';
import Link from 'next/link';
import { colors, colorClasses } from '@/lib/colors';

export const CompaniesHeroSection: React.FC = () => {
  return (
    <section 
      className="relative py-20" 
      style={{ 
        background: `linear-gradient(135deg, ${colors.heroGreen} 0%, ${colors.ctaGreen} 50%, ${colors.heroGreen} 100%)` 
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-5xl md:text-6xl font-bold ${colorClasses.sidebar.text} mb-6`}>
          Empresas
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center">
          <nav className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Link
              href="/"
              className={`${colorClasses.sidebar.text} hover:${colorClasses.text.blue300} transition-colors font-medium`}
            >
              Inicio
            </Link>
            <span className={`${colorClasses.sidebar.text}/60`}>&gt;</span>
            <span className={`${colorClasses.sidebar.text} font-medium`}>Empresas</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
