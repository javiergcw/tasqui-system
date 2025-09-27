'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const ShareInCard: React.FC = () => {
  const socialIcons = [
    { name: 'Facebook', icon: 'f' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'Pinterest', icon: 'P' },
    { name: 'LinkedIn', icon: 'in' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Share In</h3>
      <div className="flex gap-3 justify-center">
        {socialIcons.map((social, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-md flex items-center justify-center text-gray-600 font-bold transition-colors duration-200 border"
            style={{ 
              backgroundColor: '#ffffff',
              borderColor: colors.gray[300]
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
              e.currentTarget.style.borderColor = colors.mainGreen;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = colors.gray[300];
              e.currentTarget.style.color = colors.gray[600];
            }}
            title={`Share on ${social.name}`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
