'use client';
import React, { useState } from 'react';

interface FilterData {
  status: string;
  city: string;
  modality: string;
  date: string;
}

interface MyJobsFilterProps {
  onFilterChange: (filters: FilterData) => void;
}

export const MyJobsFilter: React.FC<MyJobsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterData>({
    status: '',
    city: '',
    modality: '',
    date: ''
  });

  const handleFilterChange = (key: keyof FilterData, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { status: '', city: '', modality: '', date: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* City Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">All Cities</option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="birmingham">Birmingham</option>
              <option value="leeds">Leeds</option>
              <option value="glasgow">Glasgow</option>
              <option value="edinburgh">Edinburgh</option>
            </select>
          </div>

          {/* Modality Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Modality</label>
            <select
              value={filters.modality}
              onChange={(e) => handleFilterChange('modality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Date Posted</label>
            <select
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-sm"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </div>

      {/* Active Filters Display */}
      {(filters.status || filters.city || filters.modality || filters.date) && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Status: {filters.status}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.city && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                City: {filters.city}
                <button
                  onClick={() => handleFilterChange('city', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.modality && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Type: {filters.modality}
                <button
                  onClick={() => handleFilterChange('modality', '')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.date && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Date: {filters.date}
                <button
                  onClick={() => handleFilterChange('date', '')}
                  className="ml-1 hover:text-yellow-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
