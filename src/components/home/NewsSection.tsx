'use client';
import React from 'react';
import { ArticleCard } from '../ArticleCard';

export const NewsSection: React.FC = () => {
  const articles = [
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
      date: "15 Feb, 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "La Razón Por La Que Desarrollador de Software es el Mejor Trabajo",
      snippet: "Explora las ventajas y oportunidades que ofrece la carrera de desarrollo de software en el mercado laboral actual.",
      author: "Admin",
      date: "22 Feb, 2024"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Noticias, Consejos y Artículos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente al día con las últimas tendencias del mercado laboral, consejos profesionales y artículos que te ayudarán a impulsar tu carrera con Tasqui.
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
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
      </div>
    </section>
  );
};
