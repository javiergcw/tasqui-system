'use client';
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

interface MyJobCardProps {
  id: string;
  companyInitial: string;
  jobTitle: string;
  jobCategory: string;
  salary: string;
  location: string;
  postedTime: string;
  jobType: string;
  status: 'Active' | 'Paused' | 'Closed';
  onView: (jobId: string) => void;
  onEdit?: (jobId: string) => void;
  onChangeStatus?: (jobId: string, currentStatus: string) => void;
}

const getStatusLabel = (status: 'Active' | 'Paused' | 'Closed'): string => {
  switch (status) {
    case 'Active':
      return 'Activo';
    case 'Paused':
      return 'Pausado';
    case 'Closed':
      return 'Cerrado';
    default:
      return status;
  }
};

export const MyJobCard: React.FC<MyJobCardProps> = ({
  id,
  companyInitial,
  jobTitle,
  jobCategory,
  salary,
  location,
  postedTime,
  jobType,
  status,
  onView,
  onEdit,
  onChangeStatus
}) => {
  return (
    <div
      className="p-6 transition-all duration-300"
      style={{
        backgroundColor: colors.lighterGreen, // Light green background
        border: `1px dashed ${colors.mainGreen}`, // Dashed border
        borderRadius: '0.5rem', // Slightly rounded corners
      }}
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
          <span className="text-2xl font-bold text-gray-700">{companyInitial}</span>
        </div>

        {/* Job Details Section */}
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${colorClasses.text.slate800} mb-1`}>
            {jobTitle}
          </h3>
          <p className="font-medium mb-2" style={{ color: colors.sidebarGreen }}>
            {jobCategory}
          </p>

          <div className={`space-y-1 ${colorClasses.text.gray600} text-sm`}>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
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
          {/* Status Badge */}
          <span
            className="px-4 py-2 text-xs font-semibold rounded-full"
            style={{ 
              backgroundColor: '#ffffff',
              color: status === 'Active' 
                ? colors.mainGreen 
                : status === 'Paused'
                ? colors.orange[500]
                : colors.gray[600]
            }}
          >
            {getStatusLabel(status)}
          </span>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* View Button */}
            <button
              onClick={() => onView(id)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: '#ffffff',
                border: `2px dashed ${colors.ctaGreen}`,
                color: colors.ctaGreen
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.ctaGreen;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = colors.ctaGreen;
              }}
              title="Ver Trabajo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            {/* Edit Button - Solo si onEdit está definido */}
            {onEdit && (
              <button
                onClick={() => onEdit(id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: `2px dashed ${colors.gray[600]}`,
                  color: colors.gray[600]
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.gray[600];
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = colors.gray[600];
                }}
                title="Editar Trabajo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            
            {/* Change Status Button - Solo si onChangeStatus está definido */}
            {onChangeStatus && (
              <button
                onClick={() => onChangeStatus(id, status)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: `2px dashed ${status === 'Active' ? colors.orange[500] : colors.mainGreen}`,
                  color: status === 'Active' ? colors.orange[500] : colors.mainGreen
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = status === 'Active' ? colors.orange[500] : colors.mainGreen;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = status === 'Active' ? colors.orange[500] : colors.mainGreen;
                }}
                title={status === 'Active' ? 'Pausar Trabajo' : 'Activar Trabajo'}
              >
                {status === 'Active' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>
          
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
