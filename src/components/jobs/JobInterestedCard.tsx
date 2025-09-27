'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { colors, colorClasses } from '@/lib/colors';

interface JobInterestedCardProps {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  category: string;
  jobType: string;
  postedTime: string;
  contractType: string | null;
}

export const JobInterestedCard: React.FC<JobInterestedCardProps> = ({
  id,
  jobTitle,
  companyName,
  location,
  category,
  jobType,
  postedTime,
  contractType,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/find-job/${id}`);
  };
  return (
    <div
      className="p-6 transition-all duration-300 cursor-pointer hover:shadow-lg"
      style={{
        backgroundColor: colors.lighterGreen, // Lighter green background
        border: `1px dashed ${colors.mainGreen}`, // Dashed border
        borderRadius: '0.5rem', // Slightly rounded corners
      }}
      onClick={handleCardClick}
    >
      <div className="flex items-start space-x-4">
        {/* Logo Section */}
        <div
          className="flex-shrink-0 w-16 h-16 flex items-center justify-center"
          style={{
            backgroundColor: '#ffffff', // White background for logo area
            border: `2px dashed ${colors.mainGreen}`, // Dashed border for logo area
            borderRadius: '0.25rem', // Slightly rounded corners for logo area
          }}
        >
          {/* Placeholder for the green V logo */}
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#4CAF50" /> {/* Brighter green */}
            <path d="M12 2L7 7L12 12L17 7L12 2Z" fill="#2E7D32" /> {/* Darker green */}
          </svg>
        </div>

        {/* Job Details Section */}
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${colorClasses.text.slate800} mb-1`}>
            {jobTitle}
          </h3>
          <p className={`${colorClasses.text.green500} font-medium mb-2`}>
            {companyName}
          </p>

          <div className={`space-y-1 ${colorClasses.text.gray600} text-sm`}>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>{category}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.564 23.564 0 0112 15c-3.183 0-6.22-1.04-8.755-2.745M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14m0 0a1 1 0 001 1h12a1 1 0 001-1M7 10h6m-6 4h6" />
              </svg>
              <span>{jobType}</span>
            </div>
          </div>
        </div>

        {/* Status/Actions Section */}
        <div className="flex flex-col items-center space-y-4">
          {contractType && (
            <span
              className="px-4 py-2 text-xs font-semibold rounded-full"
              style={{ 
                backgroundColor: '#ffffff',
                color: colors.mainGreen
              }}
            >
              {contractType}
            </span>
          )}
          
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ 
              backgroundColor: '#ffffff',
              border: `2px dashed ${colors.mainGreen}`,
              color: colors.mainGreen
            }}
            onClick={(e) => {
              e.stopPropagation(); // Evita que se active la navegación del card
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = colors.mainGreen;
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{postedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
