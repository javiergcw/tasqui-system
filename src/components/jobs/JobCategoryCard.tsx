'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

interface JobCategoryCardProps {
  name: string;
  jobs: number;
  icon: React.ReactNode;
}

export const JobCategoryCard: React.FC<JobCategoryCardProps> = ({ name, jobs, icon }) => {
  return (
    <div 
      className={`bg-white border-2 ${colorClasses.border.dashed} p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
      style={{
        borderColor: colors.primary[500]
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary[500];
        e.currentTarget.style.borderColor = colors.primary[500];
        const textElements = e.currentTarget.querySelectorAll('h3, p');
        textElements.forEach((el: Element) => {
          (el as HTMLElement).style.color = '#ffffff';
        });
        const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
        if (iconContainer) {
          iconContainer.style.backgroundColor = '#ffffff';
          iconContainer.style.borderColor = '#ffffff';
        }
        const icon = e.currentTarget.querySelector('.icon-container svg') as HTMLElement;
        if (icon) {
          icon.style.color = colors.primary[500];
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.borderColor = colors.primary[500];
        const textElements = e.currentTarget.querySelectorAll('h3, p');
        textElements.forEach((el: Element) => {
          (el as HTMLElement).style.color = '';
        });
        const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
        if (iconContainer) {
          iconContainer.style.backgroundColor = colors.primary[100];
          iconContainer.style.borderColor = colors.primary[500];
        }
        const icon = e.currentTarget.querySelector('.icon-container svg') as HTMLElement;
        if (icon) {
          icon.style.color = colors.primary[500];
        }
      }}
    >
      <div className="flex items-center space-x-4">
        <div 
          className="icon-container w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-dashed"
          style={{ 
            backgroundColor: colors.primary[100],
            borderColor: colors.primary[500]
          }}
        >
          <div style={{ color: colors.primary[500] }}>
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${colorClasses.text.slate800} mb-1`}>
            {name}
          </h3>
          <p className={`${colorClasses.text.gray600} text-sm`}>
            {jobs} new Job
          </p>
        </div>
      </div>
    </div>
  );
};
