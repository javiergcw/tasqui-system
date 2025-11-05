'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';

export const LocationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Ubicación</h3>
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635781234567!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Ubicación del Trabajo"
        />
      </div>
    </div>
  );
};
