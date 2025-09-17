'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const BlogRecentPostsCard: React.FC = () => {
  const recentPosts = [
    {
      id: 1,
      title: "Looking for Highly Motivated Product to Build",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "7 Feb, 2024"
    },
    {
      id: 2,
      title: "How to Introduce Yourself in Job Interview?",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "7 Feb, 2024"
    },
    {
      id: 3,
      title: "Economy Growth is Being Increased by IT Sectors",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "6 Feb, 2024"
    },
    {
      id: 4,
      title: "10 Things You Should Know Before Apply",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "5 Feb, 2024"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Red line on the border */}
      <div className="absolute left-0 top-6 w-1 h-6" style={{ backgroundColor: colors.mainRed }}></div>

      <div className="flex items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Popular Post</h3>
      </div>
      <div className="border-b border-dashed border-gray-200 mb-4"></div>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="flex space-x-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
            <img
              src={post.image}
              alt={post.title}
              className="w-16 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
               <h4 
                 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2 transition-colors"
                 style={{ color: 'inherit' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = colors.mainRed;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = '';
                 }}
               >
                {post.title}
              </h4>
              <p className="text-gray-600 text-xs">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
