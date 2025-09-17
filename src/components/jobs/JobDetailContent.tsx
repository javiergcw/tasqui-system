'use client';
import React from 'react';
import { colors } from '@/lib/colors';
import { JobDetailHeader } from './JobDetailHeader';

export const JobDetailContent: React.FC = () => {
  return (
    <div className="lg:col-span-2">
      <JobDetailHeader />
      <div className="bg-white p-4 md:p-6 lg:p-8 -mt-4 md:-mt-6 lg:-mt-8">
        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Description</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Requirements</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="space-y-3">
            {[
              "Work experience",
              "Skills (soft skills and/or technical skills)",
              "Personal qualities and attributes.",
              "Support software roll-outs to production.",
              "Guide and mentor junior engineers. Serve as team lead if appropriate."
            ].map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Details Section */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 max-w-2xl">
            <div className="space-y-4">
              <div>
                <span className="text-gray-600 font-medium">Company: </span>
                <span className="text-slate-800 font-semibold">Tourt Design LTD</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Location: </span>
                <span className="text-slate-800 font-semibold">Wellesley Rd, London</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Job Type: </span>
                <span className="text-slate-800 font-semibold">Full Time</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Email: </span>
                <span className="text-slate-800 font-semibold">hello@company.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600 font-medium">Experience: </span>
                <span className="text-slate-800 font-semibold">2 Years</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Language: </span>
                <span className="text-slate-800 font-semibold">English</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Salary: </span>
                <span className="text-slate-800 font-semibold">$10,000</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Website: </span>
                <span className="text-slate-800 font-semibold">www.company.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Now Button */}
        <div className="mt-8">
          <button
            className="py-4 px-8 text-white font-semibold transition-colors duration-200"
            style={{ backgroundColor: colors.primary[500] }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[500];
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
