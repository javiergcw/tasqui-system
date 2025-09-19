'use client';
import React from 'react';
import Image from 'next/image';
import { colorClasses } from '@/lib/colors';

export const EmployerPostedByCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-4 text-center`}>Posted By</h3>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
          <Image 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
            alt="John Doe" 
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className={`text-lg font-bold ${colorClasses.text.slate800} mb-1`}>John Doe</h4>
        <p className={`${colorClasses.text.gray600} text-sm`}>CEO of Tourt Design LTD</p>
      </div>
    </div>
  );
};
