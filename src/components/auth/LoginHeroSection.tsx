'use client';
import React from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';

export const LoginHeroSection: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        background: `linear-gradient(135deg, ${colors.dark[800]} 0%, ${colors.dark[900]} 100%)`
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Iniciar Sesión
          </h1>
          
          <nav className="flex justify-center items-center space-x-2 text-white/80">
            <Link 
              href="/" 
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-white/60">&gt;</span>
            <span className="text-white">Login</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
