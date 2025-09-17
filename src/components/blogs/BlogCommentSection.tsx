'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

export const BlogCommentSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', comment: '' });
    alert('Comment submitted successfully!');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm relative">
      {/* Red line on the border */}
      <div className="absolute left-0 top-8 w-1 h-6" style={{ backgroundColor: colors.mainRed }}></div>

      {/* Section Header */}
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Leave a Reply</h3>
      </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                style={{ backgroundColor: colors.primary[50] }}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                style={{ backgroundColor: colors.primary[50] }}
                required
              />
            </div>

            {/* Comment Field */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-slate-800 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Your Comment"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical"
                style={{ backgroundColor: colors.primary[50] }}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-8 py-3 text-white font-semibold rounded-lg transition-colors duration-200"
                style={{ backgroundColor: colors.mainRed }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                }}
              >
                Post a Comment
              </button>
            </div>
          </form>
    </div>
  );
};
