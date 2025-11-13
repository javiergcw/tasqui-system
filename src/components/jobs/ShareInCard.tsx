'use client';
import React from 'react';
import { colors } from '@/lib/colors';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

interface ShareInCardProps {
  job: PublicJob | null;
}

export const ShareInCard: React.FC<ShareInCardProps> = ({ job }) => {
  // Obtener la URL actual de la página
  const getShareUrl = (): string => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Obtener el texto para compartir
  const getShareText = (): string => {
    if (!job) {
      return 'Oportunidad de trabajo';
    }
    return `${job.title || 'Oportunidad de trabajo'} - ${job.location || ''}`;
  };

  // Compartir en LinkedIn
  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    const title = job?.title ? encodeURIComponent(job.title) : '';
    const summary = job?.description 
      ? encodeURIComponent(job.description.substring(0, 200).replace(/\s+/g, ' ').trim()) 
      : encodeURIComponent(getShareText());
    // LinkedIn usa mini=true para mostrar preview y acepta title y summary como parámetros
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}${title ? `&title=${title}` : ''}${summary ? `&summary=${summary}` : ''}&mini=true`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  // Compartir en Facebook
  const shareOnFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Compartir en X (Twitter)
  const shareOnX = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(getShareText());
    const xUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  const socialNetworks = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      onClick: shareOnLinkedIn,
      color: '#0077B5'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      onClick: shareOnFacebook,
      color: '#1877F2'
    },
    {
      name: 'X',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      onClick: shareOnX,
      color: '#000000'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Compartir en</h3>
      <div className="flex gap-3 justify-center">
        {socialNetworks.map((social, index) => (
          <button
            key={index}
            onClick={social.onClick}
            className="w-12 h-12 rounded-md flex items-center justify-center transition-all duration-200 border-2 hover:scale-110"
            style={{ 
              backgroundColor: '#ffffff',
              borderColor: colors.gray[300],
              color: colors.gray[600]
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = social.color;
              e.currentTarget.style.borderColor = social.color;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = colors.gray[300];
              e.currentTarget.style.color = colors.gray[600];
            }}
            title={`Compartir en ${social.name}`}
            aria-label={`Compartir en ${social.name}`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
