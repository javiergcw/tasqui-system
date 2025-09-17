'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

export const BlogSearchCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Red line on the border */}
      <div className="absolute left-0 top-6 w-1 h-6" style={{ backgroundColor: colors.mainRed }}></div>

      <div className="flex items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Search</h3>
      </div>
      <div className="border-b border-dashed border-gray-200 mb-4"></div>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
