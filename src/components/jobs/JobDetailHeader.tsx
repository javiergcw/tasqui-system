'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

export const JobDetailHeader: React.FC = () => {
  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#4CAF50" />
            <path d="M12 2L7 7L12 12L17 7L12 2Z" fill="#2E7D32" />
          </svg>
        </div>

        {/* Job Details Section */}
        <div className="flex-1">
          <h1 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>
            Diseñador Web, Diseñador Gráfico, Diseñador UI/UX
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={colorClasses.text.gray600}>Bogotá, Colombia</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className={colorClasses.text.gray600}>Diseño Gráfico</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.564 23.564 0 0112 15c-3.183 0-6.22-1.04-8.755-2.745M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14m0 0a1 1 0 001 1h12a1 1 0 001-1M7 10h6m-6 4h6" />
              </svg>
              <span className={colorClasses.text.gray600}>Freelance</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.mainGreen }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="text-sm font-medium" style={{ color: colors.mainGreen }}>
              Aplicar antes del: 01 de Junio, 2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
