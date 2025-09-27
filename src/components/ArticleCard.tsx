'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { colors, colorClasses } from '@/lib/colors';

interface ArticleCardProps {
  image: string;
  title: string;
  snippet: string;
  author: string;
  date: string;
  id?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  snippet,
  author,
  date,
  id
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (id) {
      router.push(`/blogs/${id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Article Image */}
      <div className="w-full h-64 overflow-hidden">
        <Image 
          src={image}
          alt={title}
          width={400}
          height={256}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Article Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke={colors.mainGreen} 
              viewBox="0 0 24 24"
              style={{ stroke: colors.mainGreen }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke={colors.mainGreen} 
              viewBox="0 0 24 24"
              style={{ stroke: colors.mainGreen }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
        </div>
        
        {/* Article Title */}
        <h3 className={`text-xl font-bold ${colorClasses.text.slate800} mb-3 hover:${colorClasses.text.blue600} transition-colors duration-200`}>
          {title}
        </h3>
        
        {/* Article Snippet */}
        <p className={`${colorClasses.text.gray600} text-sm leading-relaxed mb-4`}>
          {snippet}
        </p>
        
        {/* Read More Link */}
        <div 
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.mainGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.mainGreen;
          }}
        >
          Read More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  );
};
