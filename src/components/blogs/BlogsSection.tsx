'use client';
import React, { useState } from 'react';
import { ArticleCard } from '../ArticleCard';
import { colorClasses, colors } from '@/lib/colors';

export const BlogsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const allArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "¿Cómo Presentarte en una Entrevista de Trabajo?",
      snippet: "Aprende las mejores técnicas para hacer una presentación efectiva en tu próxima entrevista laboral y destacar entre los demás candidatos.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Buscando Productos Altamente Motivados para Construir",
      snippet: "Descubre cómo identificar y desarrollar productos innovadores que impulsen tu carrera y generen impacto en el mercado laboral.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "La Razón Por La Que Desarrollador de Software es el Mejor Trabajo",
      snippet: "Explora las ventajas y oportunidades que ofrece la carrera de desarrollo de software en el mercado laboral actual.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Trabajo Remoto: El Futuro del Empleo",
      snippet: "Descubre cómo el trabajo remoto está transformando el mercado laboral y qué habilidades necesitas para adaptarte a esta nueva realidad.",
      author: "Admin",
      date: "6 Feb, 2024"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Construyendo una Red Profesional Sólida",
      snippet: "Aprende estrategias efectivas para construir y mantener una red profesional que impulse tu carrera y abra nuevas oportunidades.",
      author: "Admin",
      date: "5 Feb, 2024"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Estrategias de Desarrollo Profesional para 2024",
      snippet: "Conoce las tendencias y estrategias más importantes para desarrollar tu carrera profesional en el año 2024.",
      author: "Admin",
      date: "4 Feb, 2024"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "El Arte de la Comunicación Efectiva en el Trabajo",
      snippet: "Mejora tus habilidades de comunicación profesional y aprende a expresarte de manera clara y efectiva en el entorno laboral.",
      author: "Admin",
      date: "3 Feb, 2024"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Consejos de Gestión del Tiempo para Profesionales Ocupados",
      snippet: "Descubre técnicas y herramientas para gestionar mejor tu tiempo y aumentar tu productividad en el trabajo.",
      author: "Admin",
      date: "2 Feb, 2024"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Habilidades de Liderazgo que Todo Gerente Debe Tener",
      snippet: "Explora las competencias esenciales de liderazgo necesarias para gestionar equipos exitosamente y alcanzar objetivos organizacionales.",
      author: "Admin",
      date: "1 Feb, 2024"
    }
  ];

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = allArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${colorClasses.text.slate800} mb-6`}>
            Últimos Artículos del Blog
          </h2>
          <p className={`text-lg ${colorClasses.text.gray600} max-w-3xl mx-auto`}>
            Mantente al día con nuestros últimos artículos sobre consejos profesionales, desarrollo de carrera y tendencias del mercado laboral. Encuentra contenido útil para impulsar tu crecimiento profesional.
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {currentArticles.map((article, index) => (
            <ArticleCard
              key={index}
              id={article.id}
              image={article.image}
              title={article.title}
              snippet={article.snippet}
              author={article.author}
              date={article.date}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              currentPage === 1
                ? colorClasses.button.paginationDisabled
                : 'bg-white border border-gray-300'
            }`}
            style={currentPage !== 1 ? { color: colors.mainGreen } : {}}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = colors.heroGreen;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = colors.heroGreen;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = colors.mainGreen;
                e.currentTarget.style.borderColor = colors.gray[300];
              }
            }}
          >
            <svg 
              className="w-5 h-5 transition-transform duration-300 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                currentPage === page
                  ? ''
                  : 'bg-white border border-gray-300'
              }`}
              style={currentPage === page 
                ? { backgroundColor: colors.heroGreen, color: '#ffffff', borderColor: colors.mainGreen }
                : { color: colors.mainGreen }
              }
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = colors.heroGreen;
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = colors.heroGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = colors.mainGreen;
                  e.currentTarget.style.borderColor = colors.gray[300];
                }
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              currentPage === totalPages
                ? colorClasses.button.paginationDisabled
                : 'bg-white border border-gray-300'
            }`}
            style={currentPage !== totalPages ? { color: colors.mainGreen } : {}}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = colors.heroGreen;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = colors.heroGreen;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = colors.mainGreen;
                e.currentTarget.style.borderColor = colors.gray[300];
              }
            }}
          >
            <svg 
              className="w-5 h-5 transition-transform duration-300 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
