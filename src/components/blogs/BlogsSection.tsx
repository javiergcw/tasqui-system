'use client';
import React, { useState } from 'react';
import { ArticleCard } from '../ArticleCard';
import { colors } from '@/lib/colors';

export const BlogsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const allArticles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "How to Introduce Yourself in Job Interview?",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Looking for Highly Motivated Product to Build",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "The Reason Why Software Developer is the Best Job",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "7 Feb, 2024"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Remote Work: The Future of Employment",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "6 Feb, 2024"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Building a Strong Professional Network",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "5 Feb, 2024"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Career Development Strategies for 2024",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "4 Feb, 2024"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "The Art of Effective Communication in the Workplace",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "3 Feb, 2024"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Time Management Tips for Busy Professionals",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "2 Feb, 2024"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Leadership Skills Every Manager Should Have",
      snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      author: "Admin",
      date: "1 Feb, 2024"
    }
  ];

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = allArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {currentArticles.map((article, index) => (
            <ArticleCard
              key={index}
              id={article.id}
              image={article.image}
              title={article.title}
              snippet={article.snippet}
              author={article.author}
              date={article.date}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 hover:scale-105'
            }`}
            style={{
              color: currentPage === 1 ? undefined : colors.mainRed
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = colors.ctaBlue;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = colors.ctaBlue;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = colors.mainRed;
                e.currentTarget.style.borderColor = '#d1d5db';
              }
            }}
          >
            <svg 
              className="w-5 h-5 transition-transform duration-300 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                currentPage === page
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-white border border-gray-300 hover:scale-105'
              }`}
              style={{
                backgroundColor: currentPage === page ? colors.ctaBlue : undefined,
                color: currentPage === page ? undefined : colors.mainRed
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = colors.ctaBlue;
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = colors.ctaBlue;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = colors.mainRed;
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 hover:scale-105'
            }`}
            style={{
              color: currentPage === totalPages ? undefined : colors.mainRed
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = colors.ctaBlue;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = colors.ctaBlue;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = colors.mainRed;
                e.currentTarget.style.borderColor = '#d1d5db';
              }
            }}
          >
            <svg 
              className="w-5 h-5 transition-transform duration-300 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
