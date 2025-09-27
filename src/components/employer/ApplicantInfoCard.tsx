'use client';
import Image from 'next/image';
import { colors } from '@/lib/colors';

interface ApplicantInfoCardProps {
  applicantId: string;
}

export const ApplicantInfoCard = ({ applicantId }: ApplicantInfoCardProps) => {
  // Mock data - en una aplicación real, esto vendría de una API
  const applicant = {
    id: applicantId,
    name: 'John Smith',
    title: 'Web Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    phone: '+101 023 0342',
    email: 'john@gmail.com',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Foto de perfil */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={applicant.image}
            alt={applicant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{applicant.name}</h2>
        <p className="text-lg text-gray-600">{applicant.title}</p>
      </div>

      {/* Información de contacto */}
      <div className="space-y-4 mb-6 text-center">
        <div className="flex items-center justify-center space-x-3">
          <div 
            className="w-5 h-5 flex items-center justify-center"
            style={{ color: colors.mainGreen }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <span className="text-gray-700">{applicant.phone}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-3">
          <div 
            className="w-5 h-5 flex items-center justify-center"
            style={{ color: colors.mainGreen }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700">{applicant.email}</span>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="flex justify-center space-x-3">
        <a
          href={applicant.social.facebook}
          className="w-8 h-8 flex items-center justify-center border-2 transition-colors duration-200"
          style={{ 
            borderColor: colors.gray[300],
            color: colors.gray[300]
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.ctaGreen;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.gray[300];
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        
        <a
          href={applicant.social.twitter}
          className="w-8 h-8 flex items-center justify-center border-2 transition-colors duration-200"
          style={{ 
            borderColor: colors.gray[300],
            color: colors.gray[300]
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.ctaGreen;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.gray[300];
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        
        <a
          href={applicant.social.linkedin}
          className="w-8 h-8 flex items-center justify-center border-2 transition-colors duration-200"
          style={{ 
            borderColor: colors.gray[300],
            color: colors.gray[300]
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.ctaGreen;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.gray[300];
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};
