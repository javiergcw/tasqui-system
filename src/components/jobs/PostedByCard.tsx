'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface PostedByCardProps {
  job: PublicJob | null;
  isLoading?: boolean;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const PostedByCard: React.FC<PostedByCardProps> = ({ job, isLoading = false }) => {
  const contactName = job?.company?.contact_name?.trim();
  const companyName = job?.company?.legal_name?.trim();
  const initials = contactName ? getInitials(contactName) : companyName ? getInitials(companyName) : '??';
  const email = job?.company?.contact_email || 'Correo no disponible';
  const phone = job?.company?.contact_phone || 'Teléfono no disponible';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Publicado por</h3>
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando información del publicador...</p>
      ) : !job ? (
        <p className="text-center text-gray-500">No hay información disponible del publicador.</p>
      ) : (
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-semibold">
            {initials}
          </div>
          <h4 className={`text-lg font-bold ${colorClasses.text.slate800} mb-1`}>
            {contactName || companyName || 'Empresa confidencial'}
          </h4>
          <p className={`${colorClasses.text.gray600} text-sm`}>{companyName ?? 'Empresa confidencial'}</p>
          <p className={`${colorClasses.text.gray600} text-sm`}>{email}</p>
          <p className={`${colorClasses.text.gray600} text-sm`}>{phone}</p>
        </div>
      )}
    </div>
  );
};
