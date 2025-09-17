'use client';
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => {
  return (
    <div className="text-center">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Number */}
      <div className="text-4xl font-bold text-white mb-2">
        {number}
      </div>
      
      {/* Label */}
      <div className="text-white text-lg">
        {label}
      </div>
    </div>
  );
};
