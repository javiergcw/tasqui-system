'use client';
import React from 'react';
import { colors } from '@/lib/colors';

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div 
      className="text-center p-8 border border-dashed rounded-lg hover:text-white transition-all duration-300 cursor-pointer group"
      style={{ borderColor: colors.mainGreen }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.mainGreen;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '';
      }}
    >
      <div 
        className="w-20 h-20 border border-dashed group-hover:bg-green-200 group-hover:border-green-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300"
        style={{ borderColor: colors.lightGreen }}
      >
        <div 
          className="w-12 h-12 border border-dashed group-hover:bg-green-300 group-hover:border-green-300 rounded-full flex items-center justify-center relative"
          style={{ borderColor: colors.lightGreen }}
        >
          <div 
            className="w-6 h-6 border border-dashed group-hover:bg-green-400 group-hover:border-green-400 rounded-full flex items-center justify-center"
            style={{ borderColor: colors.mainGreen }}
          >
            <div 
              className="w-3 h-3 group-hover:bg-green-500 rounded-full"
              style={{ backgroundColor: colors.mainGreen }}
            ></div>
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 border border-dashed group-hover:bg-green-400 group-hover:border-green-400 rounded-full flex items-center justify-center"
            style={{ borderColor: colors.mainGreen }}
          >
            <div 
              className="w-2 h-2 group-hover:bg-green-500 rounded-full"
              style={{ backgroundColor: colors.mainGreen }}
            ></div>
          </div>
        </div>
      </div>
      <h4 className="text-2xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};
