'use client';
import React from 'react';
import { JobInterestedCard } from './JobInterestedCard';
import { colorClasses } from '@/lib/colors';

export const JobsInterestedSection: React.FC = () => {
  const jobs = [
    {
      id: 1,
      jobTitle: "Operador de Sala de Correo",
      companyName: "Tourt Design S.A.",
      location: "Bogotá, Colombia",
      category: "Contabilidad",
      jobType: "Freelance",
      postedTime: "hace 1 hora",
      contractType: "Tiempo Completo"
    },
    {
      id: 2,
      jobTitle: "Digitador de Datos",
      companyName: "Techno Inc.",
      location: "Medellín, Colombia",
      category: "Digitación",
      jobType: "Freelance",
      postedTime: "hace 3 horas",
      contractType: null
    },
    {
      id: 3,
      jobTitle: "Diseñador Gráfico",
      companyName: "Devon Design",
      location: "Cali, Colombia",
      category: "Diseño Gráfico",
      jobType: "Freelance",
      postedTime: "hace 4 horas",
      contractType: null
    },
    {
      id: 4,
      jobTitle: "Desarrollador Web",
      companyName: "MegaNews S.A.",
      location: "Barranquilla, Colombia",
      category: "Desarrollo",
      jobType: "Freelance",
      postedTime: "hace 5 horas",
      contractType: null
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${colorClasses.text.slate800} mb-4`}>
            Trabajos Que Te Pueden Interesar
          </h2>
          <p className={`text-lg ${colorClasses.text.gray600} max-w-3xl mx-auto`}>
            Descubre oportunidades laborales personalizadas basadas en tu perfil. Encuentra trabajos que se ajusten a tus habilidades y experiencia profesional en Tasqui.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobInterestedCard
              key={job.id}
              id={job.id}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              location={job.location}
              category={job.category}
              jobType={job.jobType}
              postedTime={job.postedTime}
              contractType={job.contractType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
