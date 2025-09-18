'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  clientRole: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  clientName, 
  clientRole 
}) => {
  return (
    <div className="flex flex-col md:block">
      <div 
        className={`${colorClasses.background.red50} p-4 md:p-8 rounded-lg transition-all duration-300 cursor-pointer group h-full flex flex-col`}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.mainRed;
          // Cambiar color solo del texto del testimonio (dentro de la card)
          const testimonialText = e.currentTarget.querySelector('p');
          if (testimonialText) {
            (testimonialText as HTMLElement).style.color = 'white';
          }
          // Cambiar color del icono SVG
          const svgElement = e.currentTarget.querySelector('svg');
          if (svgElement) {
            (svgElement as unknown as HTMLElement).style.fill = 'white';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '';
          // Restaurar color del texto del testimonio
          const testimonialText = e.currentTarget.querySelector('p');
          if (testimonialText) {
            (testimonialText as HTMLElement).style.color = '';
          }
          // Restaurar color del icono SVG
          const svgElement = e.currentTarget.querySelector('svg');
          if (svgElement) {
            (svgElement as unknown as HTMLElement).style.fill = colors.mainRed;
          }
        }}
      >
        {/* Quote Icon */}
        <div className="mb-3 md:mb-4">
          <svg 
            className="w-8 h-8 md:w-12 md:h-12 transition-colors duration-300" 
            fill={colors.mainRed} 
            viewBox="0 0 24 24"
            style={{ fill: colors.mainRed }}
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        
        {/* Testimonial Text */}
        <p className="text-gray-800 italic text-sm md:text-base leading-relaxed transition-colors duration-300 flex-grow">
          {quote}
        </p>
      </div>
      
      {/* Client Info - Outside the card - Show after card on both mobile and desktop */}
      <div className="mt-3 md:mt-4">
        <h4 className="font-bold text-gray-800 text-base md:text-lg mb-1">
          {clientName}
        </h4>
        <p className="text-gray-500 text-xs md:text-sm">
          {clientRole}
        </p>
      </div>
    </div>
  );
};
