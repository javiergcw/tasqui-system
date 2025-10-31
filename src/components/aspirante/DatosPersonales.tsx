'use client';
import React from 'react';
import { colorClasses } from '@/lib/colors';
import { colors } from '@/lib/colors';
import type { EmployeeProfile } from '@/models';

interface DatosPersonalesProps {
  profile?: EmployeeProfile | null;
}

export const DatosPersonales: React.FC<DatosPersonalesProps> = ({ profile }) => {
  return (
    <>
      {/* Información básica */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
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
              value={profile ? `${profile.first_name} ${profile.last_name}` : ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Headline
            </label>
            <input
              type="text"
              placeholder="Headline"
              value={profile?.headline || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
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
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
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
              value={profile?.country || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              value={profile?.city || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              value={profile?.zip_code || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              value={profile?.region || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
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
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              value={profile?.primary_language || 'N/A'}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="mt-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Bio
            </label>
            <textarea
              placeholder="Your Bio"
              rows={4}
              value={profile?.bio || 'N/A'}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
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
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              value={profile?.linkedin_url || 'N/A'}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
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
              defaultValue="N/A"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
