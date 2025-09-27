'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const ApplyNowButton: React.FC = () => {
  return (
    <button
      className="w-full py-4 px-6 text-white font-semibold rounded-lg transition-colors duration-200"
      style={{ backgroundColor: colors.mainGreen }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.hoverGreen;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.mainGreen;
      }}
    >
      Apply Now
    </button>
  );
};
