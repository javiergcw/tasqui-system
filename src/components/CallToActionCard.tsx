'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/colors';

interface CallToActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  backgroundColor: 'red' | 'blue';
  href?: string;
}

export const CallToActionCard: React.FC<CallToActionCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  backgroundColor,
  href
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };
  
  return (
    <div 
      className={`rounded-lg p-6 text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105`}
      style={backgroundColor === 'blue' ? { backgroundColor: colors.ctaGreen } : { backgroundColor: colors.mainGreen }}
      onClick={handleClick}
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
          <div 
            className="text-white text-base font-semibold transition-colors duration-200 inline-block"
            style={{
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = backgroundColor === 'red' ? colors.ctaGreen : colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            {buttonText}
          </div>
        </div>
      </div>
    </div>
  );
};
