'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="absolute inset-0 bg-slate-900/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-slate-300 font-medium">
                Find Jobs, Employment & Career Opportunities
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block">Job Board For Hiring</span>
                <span className="block text-white">Creative Designers</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                style={{ backgroundColor: colors.mainRed }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                }}
              >
                Upload your CV
              </button>
              <button 
                className="text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                style={{ backgroundColor: colors.mainRed }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Right Content - Circular Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                  alt="Professional woman"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
                style={{ backgroundColor: colors.mainRed }}
              ></div>
              <div 
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full"
                style={{ backgroundColor: colors.ctaBlue }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};
