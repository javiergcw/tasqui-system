'use client';
import React from 'react';
import { colors } from '@/lib/colors';
import { SvgIconComponent } from '@mui/icons-material';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: SvgIconComponent;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.backgroundColor = colors.mainGreen;
    card.style.borderColor = colors.mainGreen;
    
    // Cambiar colores de los círculos del icono
    const outerCircle = card.querySelector('[data-circle="outer"]') as HTMLElement;
    const middleCircle = card.querySelector('[data-circle="middle"]') as HTMLElement;
    const innerCircle = card.querySelector('[data-circle="inner"]') as HTMLElement;
    const iconElement = card.querySelector('[data-icon]') as HTMLElement;
    const smallCircle = card.querySelector('[data-circle="small"]') as HTMLElement;
    const smallCircleDot = card.querySelector('[data-circle="small-dot"]') as HTMLElement;
    
    if (outerCircle) {
      outerCircle.style.backgroundColor = colors.sidebarGreen;
      outerCircle.style.borderColor = colors.sidebarGreen;
      outerCircle.style.transform = 'scale(1.05)';
    }
    if (middleCircle) {
      middleCircle.style.backgroundColor = colors.heroGreen;
      middleCircle.style.borderColor = colors.heroGreen;
      middleCircle.style.transform = 'scale(1.05)';
    }
    if (innerCircle) {
      innerCircle.style.backgroundColor = colors.hoverGreen;
      innerCircle.style.borderColor = colors.hoverGreen;
    }
    if (iconElement) {
      iconElement.style.color = '#ffffff';
      iconElement.style.transform = 'scale(1.1)';
    }
    if (smallCircle) {
      smallCircle.style.backgroundColor = colors.hoverGreen;
      smallCircle.style.borderColor = colors.hoverGreen;
    }
    if (smallCircleDot) {
      smallCircleDot.style.backgroundColor = '#ffffff';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.backgroundColor = '';
    card.style.borderColor = colors.mainGreen;
    
    // Restaurar colores originales de los círculos
    const outerCircle = card.querySelector('[data-circle="outer"]') as HTMLElement;
    const middleCircle = card.querySelector('[data-circle="middle"]') as HTMLElement;
    const innerCircle = card.querySelector('[data-circle="inner"]') as HTMLElement;
    const iconElement = card.querySelector('[data-icon]') as HTMLElement;
    const smallCircle = card.querySelector('[data-circle="small"]') as HTMLElement;
    const smallCircleDot = card.querySelector('[data-circle="small-dot"]') as HTMLElement;
    
    if (outerCircle) {
      outerCircle.style.backgroundColor = '';
      outerCircle.style.borderColor = colors.lightGreen;
      outerCircle.style.transform = 'scale(1)';
    }
    if (middleCircle) {
      middleCircle.style.backgroundColor = '';
      middleCircle.style.borderColor = colors.lightGreen;
      middleCircle.style.transform = 'scale(1)';
    }
    if (innerCircle) {
      innerCircle.style.backgroundColor = '';
      innerCircle.style.borderColor = colors.mainGreen;
    }
    if (iconElement) {
      iconElement.style.color = colors.ctaGreen;
      iconElement.style.transform = 'scale(1)';
    }
    if (smallCircle) {
      smallCircle.style.backgroundColor = '';
      smallCircle.style.borderColor = colors.mainGreen;
    }
    if (smallCircleDot) {
      smallCircleDot.style.backgroundColor = colors.ctaGreen;
    }
  };

  return (
    <div 
      className="text-center p-8 border border-dashed rounded-lg hover:text-white transition-all duration-300 cursor-pointer group transform hover:scale-[1.02] hover:shadow-xl"
      style={{ borderColor: colors.mainGreen }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        data-circle="outer"
        className="w-20 h-20 border border-dashed rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300"
        style={{ 
          borderColor: colors.lightGreen,
        }}
      >
        <div 
          data-circle="middle"
          className="w-12 h-12 border border-dashed rounded-full flex items-center justify-center relative transition-all duration-300"
          style={{ borderColor: colors.lightGreen }}
        >
          <div 
            data-circle="inner"
            className="flex items-center justify-center transition-all duration-300"
            style={{ borderColor: colors.mainGreen }}
          >
            <Icon 
              data-icon
              className="transition-all duration-300"
              style={{ 
                fontSize: '2rem',
                color: colors.ctaGreen,
              }}
            />
          </div>
          <div 
            data-circle="small"
            className="absolute -bottom-1 -right-1 w-4 h-4 border border-dashed rounded-full flex items-center justify-center transition-all duration-300"
            style={{ borderColor: colors.mainGreen }}
          >
            <div 
              data-circle="small-dot"
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: colors.ctaGreen }}
            ></div>
          </div>
        </div>
      </div>
      <h4 className="text-2xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};
