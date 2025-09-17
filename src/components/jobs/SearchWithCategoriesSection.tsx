'use client';
import React from 'react';
import { SearchBar } from '../SearchBar';
import { JobsCategorySection } from './JobsCategorySection';

export const SearchWithCategoriesSection: React.FC = () => {
  return (
    <div className="relative py-12 bg-white">
       {/* Buscador encima de las categorías */}
       <div className="max-w-7xl mx-auto mt-16 mb-10">
        <SearchBar />
      </div>


      {/* Sección de categorías */}
      <div className="max-w-6xl mx-auto">
        <JobsCategorySection />
      </div>
    </div>
  );
};
