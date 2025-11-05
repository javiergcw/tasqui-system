'use client';
import React from 'react';
import { colors } from '@/lib/colors';

interface CompanyCardProps {
  logo: React.ReactNode;
  companyName: string;
  location: string;
  openPositions: number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  logo,
  companyName,
  location,
  openPositions
}) => {
  return (
    <div 
      className="bg-white border border-dashed rounded p-8 text-center"
      style={{ borderColor: colors.mainGreen }}
    >
      {/* Company Logo */}
      <div className="flex justify-center mb-4">
        {logo}
      </div>
      
      {/* Company Name */}
      <h4 className="text-lg font-bold text-slate-800 mb-3">
        {companyName}
      </h4>
      
      {/* Location */}
      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{location}</span>
      </div>
      
      {/* Open Positions Button */}
      <button 
        className="text-white px-6 py-3 rounded font-semibold transition-colors duration-200 w-full"
        style={{ backgroundColor: colors.mainGreen }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.hoverGreen;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.mainGreen;
        }}
      >
        {openPositions} {openPositions === 1 ? 'vacante disponible' : 'vacantes disponibles'}
      </button>
    </div>
  );
};
