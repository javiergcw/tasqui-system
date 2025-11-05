'use client';
import React from 'react';
import { BlogRecentPostsCard } from './BlogRecentPostsCard';
import { BlogCategoriesCard } from './BlogCategoriesCard';
import { BlogTagsCard } from './BlogTagsCard';

export const BlogDetailSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
   {/*    <BlogSearchCard /> */}
      <BlogRecentPostsCard />
      <BlogCategoriesCard />
      <BlogTagsCard />
    </div>
  );
};
