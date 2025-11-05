'use client';
import React from 'react';
import { CallToActionCard } from '../CallToActionCard';
import { colors } from '@/lib/colors';

export const CallToActionSection: React.FC = () => {
  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.ctaGreen }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Looking For a Job Card */}
          <CallToActionCard
            title="¿Buscas Trabajo?"
            description="Tu próximo rol podría estar en una de estas organizaciones líderes. Regístrate y encuentra la oportunidad perfecta para tu carrera profesional."
            buttonText="Aplicar Ahora >>"
            backgroundColor="red"
            href="/register?role=employee"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.mainGreen }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          
          {/* Are You Recruiting Card */}
          <CallToActionCard
            title="¿Estás Reclutando?"
            description="Encuentra el mejor talento para tu empresa. Conecta con profesionales calificados y construye un equipo de alto rendimiento."
            buttonText="Publicar Vacante >>"
            backgroundColor="blue"
            href="/register?role=company"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.mainGreen }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};
