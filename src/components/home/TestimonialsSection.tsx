'use client';
import React, { useState } from 'react';
import { TestimonialCard } from '../TestimonialCard';
import { colors } from '@/lib/colors';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      quote: "Tasqui ha transformado completamente nuestra forma de encontrar talento. La plataforma es intuitiva y hemos encontrado candidatos excepcionales que se ajustan perfectamente a nuestra cultura empresarial. La calidad de los profesionales es impresionante.",
      clientName: "María González",
      clientRole: "Directora de Recursos Humanos"
    },
    {
      quote: "Como profesional independiente, encontrar oportunidades laborales de calidad era un desafío. Con Tasqui, he conectado con empresas que valoran mi experiencia y habilidades. La plataforma me ha abierto puertas que nunca imaginé.",
      clientName: "Carlos Rodríguez",
      clientRole: "Diseñador Gráfico"
    },
    {
      quote: "El servicio y soporte excepcional durante todo el proceso. El equipo fue profesional, respondió rápidamente y entregó exactamente lo que necesitábamos. Recomiendo ampliamente sus servicios a cualquiera que busque trabajo de calidad.",
      clientName: "Ana Martínez",
      clientRole: "Gerente de Marketing"
    },
    {
      quote: "Resultados sobresalientes que superaron nuestras expectativas. La atención al detalle y el enfoque creativo marcaron la diferencia. No podríamos estar más contentos con el resultado final. Tasqui es sin duda la mejor plataforma de empleo.",
      clientName: "Diego López",
      clientRole: "CEO"
    }
  ];

  const nextTestimonial = () => {
    if (isTransitioning) return;
    console.log('Next clicked, currentIndex:', currentIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonials.length - 1 ? 0 : nextIndex;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    console.log('Prev clicked, currentIndex:', currentIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const prevIndexCalc = prevIndex - 1;
        return prevIndexCalc < 0 ? testimonials.length - 2 : prevIndexCalc;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 2);

  return (
    <section className="bg-white py-12 md:py-20">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Descubre las experiencias de empresas y profesionales que han encontrado éxito con Tasqui. Nuestra comunidad comparte sus historias de crecimiento y conexión laboral.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 items-stretch h-auto md:h-[320px]">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 transform -translate-x-8' : 'opacity-100 transform translate-x-0'
              }`}
            >
              <TestimonialCard
                quote={testimonial.quote}
                clientName={testimonial.clientName}
                clientRole={testimonial.clientRole}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-4 md:gap-6 mt-4 md:mt-6">
          <button
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: colors.mainGreen, color: 'white' }}
            onClick={prevTestimonial}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.lightGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: colors.mainGreen, color: 'white' }}
            onClick={nextTestimonial}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.lightGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
