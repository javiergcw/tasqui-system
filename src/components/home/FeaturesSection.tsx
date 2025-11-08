'use client';
import React from 'react';
import { FeatureCard } from './FeatureCard';

const SchoolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3l9 6-9 6-9-6 9-6z" />
    <path d="M3 10.5v6l9 6 9-6v-6" />
    <path d="M12 21v-9" />
  </svg>
);

const ConnectIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    <path d="M17 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M9.5 10.5l5 5" />
    <path d="M11.5 8.5 14 11" />
    <path d="M5 17l3.5-3.5" />
    <path d="M16 7l3-3" />
  </svg>
);

const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M14 8h7v7" />
  </svg>
);

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Formación Profesional",
      description: "Cursos especializados diseñados para desarrollar competencias clave y habilidades profesionales. Aprende a tu ritmo con programas adaptados a tus objetivos de carrera.",
      icon: SchoolIcon
    },
    {
      title: "Conectamos Talento con Empleo", 
      description: "Encuentra oportunidades laborales que se alinean con tu perfil profesional. Conectamos candidatos calificados con empresas que buscan el mejor talento.",
      icon: ConnectIcon
    },
    {
      title: "Desarrollo de Alto Desempeño",
      description: "Formamos profesionales con inclusión social y cultural. Plataforma virtual accesible 24/7 que impulsa tu crecimiento profesional y mejora tu calidad de vida.",
      icon: TrendingUpIcon
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
