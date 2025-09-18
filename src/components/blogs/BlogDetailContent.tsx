'use client';
import React from 'react';
import { BlogTagsSection } from './BlogTagsSection';
import { BlogCommentSection } from './BlogCommentSection';
import Image from 'next/image';
import { colorClasses } from '@/lib/colors';

export const BlogDetailContent: React.FC = () => {
  return (
    <div className="bg-white p-8">
      <h2 className={`text-3xl font-bold ${colorClasses.text.slate800} mb-4`}>
        How to Introduce Yourself in Job Interview?
      </h2>
      
      <div className={`flex items-center space-x-4 mb-6 ${colorClasses.text.gray600}`}>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>By Admin</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>7 Feb, 2024</span>
        </div>
      </div>

      <div className="mb-8">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Blog post image"
          width={1000}
          height={256}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Key Points to Remember</h3>
        <ul className={`list-disc list-inside ${colorClasses.text.gray600} mb-6 space-y-2`}>
          <li>Be confident and maintain eye contact</li>
          <li>Keep your introduction concise and relevant</li>
          <li>Highlight your most relevant experience</li>
          <li>Show enthusiasm for the role</li>
        </ul>

        <p className={`${colorClasses.text.gray600} mb-6`}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Conclusion</h3>
        <p className={`${colorClasses.text.gray600} mb-6`}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
      </div>

      {/* Tags Section */}
      <div className={`mt-8 pt-8 border-t ${colorClasses.border.gray200}`}>
        <BlogTagsSection />
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <BlogCommentSection />
      </div>
    </div>
  );
};
