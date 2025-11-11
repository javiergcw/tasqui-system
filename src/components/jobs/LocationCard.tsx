'use client';
import React, { useMemo } from 'react';
import { colorClasses } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface LocationCardProps {
  job: PublicJob | null;
  isLoading?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({ job, isLoading = false }) => {
  const location = job?.location ?? 'Ubicación no especificada';

  const mapSrc = useMemo(() => {
    if (!job?.location) {
      return null;
    }

    const encodedLocation = encodeURIComponent(job.location);
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  }, [job]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Ubicación</h3>
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando ubicación...</p>
      ) : (
        <>
          <p className={`${colorClasses.text.slate800} text-center font-semibold mb-4`}>{location}</p>
          {mapSrc ? (
            <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Ubicación del Trabajo"
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              No se proporcionó una ubicación específica.
            </div>
          )}
        </>
      )}
    </div>
  );
};
