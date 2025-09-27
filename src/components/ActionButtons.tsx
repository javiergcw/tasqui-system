import React from 'react';
import { colors } from '@/lib/colors';

interface ActionButtonsProps {
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Sign Up Link */}
      <a
        href="#"
        className="text-white hover:text-slate-100 font-medium text-sm transition-colors duration-200"
      >
        Sign Up
      </a>
      
      {/* Sign In Button */}
      <button 
        className="text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
        style={{ backgroundColor: colors.mainGreen }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.mainGreen;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.mainGreen;
        }}
      >
        Sign In
      </button>
    </div>
  );
};
