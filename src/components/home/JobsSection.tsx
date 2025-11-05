import React from 'react';
import { JobCard } from '../JobCard';
import { colorClasses } from '@/lib/colors';

export const JobsSection: React.FC = () => {
  const jobs = [
    {
      id: "1",
      companyInitial: "T",
      jobTitle: "Diseñador Web, Diseñador Gráfico, Diseñador UI/UX",
      jobCategory: "Diseñador Gráfico",
      salary: "$2.500.000-$3.000.000",
      location: "Bogotá, Colombia",
      postedTime: "hace 9 días",
      jobType: "Tiempo Completo"
    },
    {
      id: "2",
      companyInitial: "V",
      jobTitle: "Desarrollador Web y Desarrollador de Software",
      jobCategory: "Desarrollador Web",
      salary: "$3.500.000-$5.000.000",
      location: "Medellín, Colombia",
      postedTime: "hace 5 días",
      jobType: "Tiempo Completo"
    },
    {
      id: "3",
      companyInitial: "E",
      jobTitle: "Contador Público",
      jobCategory: "Contabilidad",
      salary: "$2.000.000-$2.800.000",
      location: "Cali, Colombia",
      postedTime: "hace 2 días",
      jobType: "Tiempo Completo"
    }
  ];

  return (
    <section className={`${colorClasses.background.gray50} py-12 md:py-20`} style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Trabajos Que Te Pueden Interesar
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Descubre las mejores oportunidades laborales disponibles en Tasqui. Conectamos profesionales calificados con empresas que buscan talento comprometido y con experiencia.
          </p>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              id={job.id}
              companyInitial={job.companyInitial}
              jobTitle={job.jobTitle}
              jobCategory={job.jobCategory}
              salary={job.salary}
              location={job.location}
              postedTime={job.postedTime}
              jobType={job.jobType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
