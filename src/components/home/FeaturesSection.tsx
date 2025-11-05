'use client';
import React from 'react';
import { FeatureCard } from './FeatureCard';
import { School, ConnectWithoutContact, TrendingUp } from '@mui/icons-material';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Formación Profesional",
      description: "Cursos especializados diseñados para desarrollar competencias clave y habilidades profesionales. Aprende a tu ritmo con programas adaptados a tus objetivos de carrera.",
      icon: School
    },
    {
      title: "Conectamos Talento con Empleo", 
      description: "Encuentra oportunidades laborales que se alinean con tu perfil profesional. Conectamos candidatos calificados con empresas que buscan el mejor talento.",
      icon: ConnectWithoutContact
    },
    {
      title: "Desarrollo de Alto Desempeño",
      description: "Formamos profesionales con inclusión social y cultural. Plataforma virtual accesible 24/7 que impulsa tu crecimiento profesional y mejora tu calidad de vida.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="bg-white pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            ¿Por Qué Elegirnos Entre<br />
            Otras Plataformas?
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Somos una plataforma integral que combina formación profesional con oportunidades de empleo. Formamos profesionales de alto desempeño mientras conectamos talento con empresas que valoran el desarrollo continuo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
