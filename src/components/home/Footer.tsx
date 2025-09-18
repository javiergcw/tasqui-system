"use client";
import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="text-white py-16 relative overflow-hidden"
      style={{ backgroundColor: colors.footerBackground }}
    >
      {/* Decorative dots pattern */}
      <div className="absolute top-0 right-0 w-32 h-full opacity-10">
        <div className="grid grid-cols-4 gap-2 h-full p-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Jovie Logo and Description */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl font-bold text-gray-900">J</span>
              </div>
              <span className={`text-2xl font-bold ${colorClasses.sidebar.text}`}>Jovie</span>
            </div>
            
            {/* Description */}
            <p className={`${colorClasses.text.gray300} text-sm leading-relaxed mb-6`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna. Sed eiusmod tempor incididunt ut.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <div 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = '';
                }}
              >
                <span className={`text-sm font-bold ${colorClasses.text.gray900} transition-colors`}>f</span>
              </div>
              <div 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.color = '';
                }}
              >
                <svg className={`w-4 h-4 ${colorClasses.text.gray900} transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = '';
                }}
              >
                <span className={`text-sm font-bold ${colorClasses.text.gray900} transition-colors`}>P</span>
              </div>
              <div 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.mainRed;
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = '';
                }}
              >
                <span className={`text-xs font-bold ${colorClasses.text.gray900} transition-colors`}>in</span>
              </div>
            </div>
          </div>

          {/* Section 2: For Candidate */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              For Candidate
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Account
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Resume
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Job List
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.mainRed } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Quick Links */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              Quick Links
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  About
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.mainRed }}>»</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Information */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              Information
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <div className="space-y-4">
              {/* Phone */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.mainRed; e.currentTarget.querySelector('p')!.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.mainRed} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.mainRed }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Phone:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>+101 984 754</p>
              </div>

              {/* Email */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.mainRed; e.currentTarget.querySelector('p')!.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.mainRed} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.mainRed }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Email:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>info@jovie.com</p>
              </div>

              {/* Address */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.mainRed; e.currentTarget.querySelector('p')!.style.color = colors.mainRed; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.mainRed} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.mainRed }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Address:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>123, Denver, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ backgroundColor: colors.footerBackground }}
      ></div>
    </footer>
  );
};

// Componente separado para la sección de copyright
export const CopyrightSection: React.FC = () => {
  return (
    <div 
      className="text-white py-4 text-center"
      style={{ backgroundColor: colors.copyrightBackground }}
    >
      <p className="text-sm">
        © Jovie is Proudly Owned by HiBootstrp
      </p>
    </div>
  );
};
