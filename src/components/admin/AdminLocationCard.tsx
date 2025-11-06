'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminLocationCardProps {
  job: AdminJob;
}

export const AdminLocationCard: React.FC<AdminLocationCardProps> = ({ job }) => {
  // Crear URL de Google Maps con la ubicación del trabajo
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6F4b0Gx0xQ&q=${encodeURIComponent(job.location)}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Ubicación</h3>
      <div className="mb-2">
        <p className={`${colorClasses.text.gray600} text-sm text-center`}>{job.location}</p>
      </div>
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de Ubicación: ${job.location}`}
        />
      </div>
    </div>
  );
};

