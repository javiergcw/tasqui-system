'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

export const BlogCategoriesCard: React.FC = () => {
  const categories = [
    { name: 'Career Tips', count: 5 },
    { name: 'Job Search', count: 3 },
    { name: 'Interview', count: 8 },
    { name: 'Resume', count: 2 },
    { name: 'Networking', count: 4 },
    { name: 'Skills', count: 6 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Red line on the border */}
      <div className="absolute left-0 top-6 w-1 h-6" style={{ backgroundColor: colors.mainRed }}></div>

      <div className="flex items-center mb-4">
        <h3 className={`text-xl font-bold ${colorClasses.text.slate800}`}>Categories</h3>
      </div>
      <div className="border-b border-dashed border-gray-200 mb-4"></div>
      <div className="space-y-2">
        {categories.map((category, index) => (
           <a 
             key={index}
             href="#" 
             className={`flex justify-between items-center ${colorClasses.text.gray600} transition-colors py-1 hover:${colorClasses.text.red500}`}
           >
            <span>{category.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
