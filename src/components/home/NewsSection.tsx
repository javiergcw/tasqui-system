'use client';
import React from 'react';
import { ArticleCard } from '../ArticleCard';

export const NewsSection: React.FC = () => {
  const articles = [
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
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            News, Tips & Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
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
      </div>
    </section>
  );
};
