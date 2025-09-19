'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const ApplyNowButton: React.FC = () => {
  return (
    <button
      className="w-full py-4 px-6 text-white font-semibold rounded-lg transition-colors duration-200"
      style={{ backgroundColor: colors.mainRed }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary[600];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.mainRed;
      }}
    >
      Apply Now
    </button>
  );
};
