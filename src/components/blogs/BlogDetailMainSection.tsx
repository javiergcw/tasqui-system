'use client';
import React from 'react';
import { BlogDetailContent } from './BlogDetailContent';
import { BlogDetailSidebar } from './BlogDetailSidebar';

export const BlogDetailMainSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogDetailSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogDetailContent />
          </div>
        </div>
      </div>
    </section>
  );
};
