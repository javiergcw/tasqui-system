'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const BlogTagsCard: React.FC = () => {
  const tags = [
    "Web Design",
    "Job Tips", 
    "UX Design",
    "Tips & Tricks",
    "Writing",
    "Business",
    "Resume"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Red line on the border */}
      <div className="absolute left-0 top-6 w-1 h-6" style={{ backgroundColor: colors.mainGreen }}></div>

      <div className="flex items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Tags</h3>
      </div>
      <div className="border-b border-dashed border-gray-200 mb-4"></div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-slate-800 text-sm font-medium rounded-md text-center cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              border: `1px dashed ${colors.gray[300]}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
              e.currentTarget.style.borderColor = colors.mainGreen;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = colors.gray[300];
              e.currentTarget.style.color = colors.gray[800];
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
