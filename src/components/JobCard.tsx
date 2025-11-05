'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { colors, colorClasses } from '@/lib/colors';

interface JobCardProps {
  id: string;
  companyInitial: string;
  jobTitle: string;
  jobCategory: string;
  salary: string;
  location: string;
  postedTime: string;
  jobType: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  id,
  companyInitial,
  jobTitle,
  jobCategory,
  salary,
  location,
  postedTime,
  jobType
}) => {
  const router = useRouter();

  const handleBrowseJob = () => {
    router.push(`/find-job/${id}`);
  };
  return (
    <div className="bg-white rounded p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transition-all duration-300">
      {/* Company Logo/Avatar */}
      <div className="flex-shrink-0 flex md:block">
        <div className={`w-12 h-12 md:w-16 md:h-16 bg-green-200 ${colorClasses.border.dashed} ${colorClasses.border.green500} rounded-full flex items-center justify-center`}>
          <span className="text-lg md:text-2xl font-bold text-gray-700">{companyInitial}</span>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-1 w-full">
        <h4 className={`text-lg md:text-xl font-bold ${colorClasses.text.slate800} mb-2 md:mb-3`}>
          {jobTitle}
        </h4>
        
        <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6 ${colorClasses.text.gray600} mb-3 text-sm md:text-base`}>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2" />
            </svg>
            <span>{jobCategory}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>{salary}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{postedTime}</span>
          </div>
        </div>
        
        <span className={`px-2 py-1 md:px-3 md:py-1 bg-green-100 ${colorClasses.border.dashed} ${colorClasses.border.green500} ${colorClasses.text.green500} text-xs md:text-sm font-medium rounded`}>
          {jobType}
        </span>
      </div>

      {/* Browse Job Button */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <button 
          onClick={handleBrowseJob}
          className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded font-semibold transition-colors duration-200 text-sm md:text-base text-white"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Ver Trabajo
        </button>
      </div>
    </div>
  );
};
