'use client';
import React from 'react';
import { BlogTagsSection } from './BlogTagsSection';
import Image from 'next/image';
import { colorClasses } from '@/lib/colors';

export const BlogDetailContent: React.FC = () => {
  return (
    <div className="bg-white p-8">
      <h2 className={`text-3xl font-bold ${colorClasses.text.slate800} mb-4`}>
        ¿Cómo Presentarte en una Entrevista de Trabajo?
      </h2>
      
      <div className={`flex items-center space-x-4 mb-6 ${colorClasses.text.gray600}`}>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Por Admin</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>7 Feb, 2024</span>
        </div>
      </div>

      <div className="mb-8">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Imagen del artículo del blog"
          width={1000}
          height={256}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Presentarte correctamente en una entrevista de trabajo es fundamental para causar una buena primera impresión. Esta es tu oportunidad de mostrar profesionalismo, confianza y entusiasmo por el puesto. En este artículo, exploraremos las mejores técnicas para hacer una presentación efectiva.
        </p>
        
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Una presentación exitosa debe ser concisa, relevante y memorable. Debes destacar tus habilidades más importantes relacionadas con el puesto, mostrar tu personalidad profesional y demostrar tu interés genuino en la empresa y el rol.
        </p>

        <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Puntos Clave a Recordar</h3>
        <ul className={`list-disc list-inside ${colorClasses.text.gray600} mb-6 space-y-2`}>
          <li>Sé seguro y mantén contacto visual</li>
          <li>Mantén tu presentación concisa y relevante</li>
          <li>Destaca tu experiencia más relevante</li>
          <li>Muestra entusiasmo por el puesto</li>
        </ul>

        <p className={`${colorClasses.text.gray600} mb-6`}>
          Recuerda que la primera impresión cuenta mucho. Una presentación bien estructurada puede abrirte muchas puertas y establecer el tono positivo para el resto de la entrevista. Practica tu presentación antes de la entrevista para sentirte más cómodo y confiado.
        </p>

        <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Conclusión</h3>
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Una presentación efectiva en una entrevista de trabajo es una combinación de preparación, confianza y autenticidad. Con estas técnicas, estarás mejor preparado para destacar y conseguir el trabajo de tus sueños. Recuerda siempre ser tú mismo y mostrar tu pasión por lo que haces.
        </p>
      </div>

      {/* Sección de Etiquetas */}
      <div className={`mt-8 pt-8 border-t ${colorClasses.border.gray200}`}>
        <BlogTagsSection />
      </div>

      {/* Sección de Comentarios */}
{/*       <div className="mt-8">
        <BlogCommentSection />
      </div> */}
    </div>
  );
};
