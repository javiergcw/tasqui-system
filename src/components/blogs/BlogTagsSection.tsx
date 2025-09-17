'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const BlogTagsSection: React.FC = () => {
  const tags = [
    "Business",
    "Resume", 
    "Development"
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-slate-800">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-slate-800 text-sm font-medium rounded-full cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: colors.primary[50],
                  border: `1px solid ${colors.gray[300]}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                  e.currentTarget.style.borderColor = colors.mainRed;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[50];
                  e.currentTarget.style.borderColor = colors.gray[300];
                  e.currentTarget.style.color = colors.gray[800];
                }}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
