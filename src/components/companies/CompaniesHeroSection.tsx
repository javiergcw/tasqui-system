'use client';
import React from 'react';
import Link from 'next/link';

export const CompaniesHeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-800 to-slate-900 py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Company
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center">
          <nav className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Link
              href="/"
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </Link>
            <span className="text-white/60">&gt;</span>
            <span className="text-white font-medium">Company</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
