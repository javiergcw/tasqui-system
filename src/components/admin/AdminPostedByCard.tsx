'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';
import type { AdminJob } from '@/models/admin/job.model';

interface AdminPostedByCardProps {
  job: AdminJob;
}

export const AdminPostedByCard: React.FC<AdminPostedByCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Publicado Por</h3>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-600">
            {job.title.charAt(0).toUpperCase()}
          </span>
        </div>
        <h4 className={`text-lg font-bold ${colorClasses.text.slate800} mb-1`}>Admin</h4>
        <p className={`${colorClasses.text.gray600} text-sm`}>Administrador del Sistema</p>
      </div>
    </div>
  );
};

