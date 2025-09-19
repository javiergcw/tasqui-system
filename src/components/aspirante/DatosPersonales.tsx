'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';
import { colors } from '@/lib/colors';

export const DatosPersonales: React.FC = () => {
  return (
    <>
      {/* Información básica */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainRed }}>
          Basic Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Your Phone
            </label>
            <input
              type="tel"
              placeholder="Your Phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Job Title
            </label>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Dirección */}
      <div>
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainRed }}>
          Address
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Your Country
            </label>
            <input
              type="text"
              placeholder="Your Country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Your City
            </label>
            <input
              type="text"
              placeholder="Your City"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Zip Code
            </label>
            <input
              type="text"
              placeholder="City Zip"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Region
            </label>
            <input
              type="text"
              placeholder="Your Region"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Other Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainRed }}>
          Other Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Age
            </label>
            <input
              type="text"
              placeholder="Your Age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Work Experience
            </label>
            <input
              type="text"
              placeholder="Work Experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Language
            </label>
            <input
              type="text"
              placeholder="Language"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Skill
            </label>
            <input
              type="text"
              placeholder="Skills"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Social links */}
      <div>
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainRed }}>
          Social links
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Facebook
            </label>
            <input
              type="url"
              placeholder="www.facebook.com/user"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Twitter
            </label>
            <input
              type="url"
              placeholder="www.twitter.com/user"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Linkedin
            </label>
            <input
              type="url"
              placeholder="www.Linkedin.com/user"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Github
            </label>
            <input
              type="url"
              placeholder="www.Github.com/user"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainRed 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
