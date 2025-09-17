'use client';
import React from 'react';
import { colors } from '@/lib/colors';

interface CallToActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  backgroundColor: 'red' | 'blue';
}

export const CallToActionCard: React.FC<CallToActionCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  backgroundColor
}) => {
  const bgColor = backgroundColor === 'red' ? '' : '';
  
  return (
    <div 
      className={`${bgColor} rounded-lg p-6 text-white relative overflow-hidden`}
      style={backgroundColor === 'blue' ? { backgroundColor: colors.ctaBlue } : { backgroundColor: colors.mainRed }}
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        
        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">
            {title}
          </h3>
          <p className="text-base mb-4 opacity-90">
            {description}
          </p>
          <a 
            href="#" 
            className="text-white text-base font-semibold transition-colors duration-200"
            style={{
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = backgroundColor === 'red' ? colors.ctaBlue : colors.mainRed;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};
