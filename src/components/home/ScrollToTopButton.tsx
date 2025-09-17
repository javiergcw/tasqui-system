'use client';
import React, { useState, useEffect, useRef } from 'react';
import { colors } from '@/lib/colors';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  // Detectar dirección del scroll y mostrar/ocultar botón
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      // Determinar dirección del scroll
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;

      // Mostrar botón solo si está más de 300px abajo
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave al inicio con animación
  const scrollToTop = () => {
    setIsAnimating(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Ocultar botón después de la animación
    setTimeout(() => {
      setIsAnimating(false);
      setIsVisible(false);
    }, 800);
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg transition-all duration-500 hover:scale-110 z-50 ${
            isAnimating 
              ? 'animate-[slideUp_0.8s_ease-out_forwards]' 
              : scrollDirection === 'up' 
                ? 'animate-[slideUp_0.6s_ease-out_forwards]' 
                : 'animate-[slideIn_0.3s_ease-out_forwards]'
          }`}
          style={{ backgroundColor: colors.mainRed }}
          onMouseEnter={(e) => {
            if (!isAnimating) {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }
          }}
          onMouseLeave={(e) => {
            if (!isAnimating) {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }
          }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Icono de doble flecha hacia arriba con animación */}
            <svg 
              className="w-5 h-5 text-white animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
            <svg 
              className="w-3 h-3 text-white animate-bounce -mt-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ animationDelay: '0.1s' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </div>
        </button>
      )}
      
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        
        @keyframes slideIn {
          0% {
            transform: translateY(100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
