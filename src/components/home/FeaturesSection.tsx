'use client';
import React from 'react';
import { colors } from '@/lib/colors';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            Why You Choose Us Among<br />
            Other Job Site?
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Advertise Job */}
          <div 
            className="text-center p-8 border border-dashed rounded-lg hover:text-white transition-all duration-300 cursor-pointer group"
            style={{ borderColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <div 
              className="w-20 h-20 border border-dashed group-hover:bg-pink-200 group-hover:border-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300"
              style={{ borderColor: colors.primary[300] }}
            >
              <div 
                className="w-12 h-12 border border-dashed group-hover:bg-pink-300 group-hover:border-pink-300 rounded-full flex items-center justify-center relative"
                style={{ borderColor: colors.primary[400] }}
              >
                <div 
                  className="w-6 h-6 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-3 h-3 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-2 h-2 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-300">
              Advertise Job
            </h4>
            <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          
          {/* Card 2 - Recruiter Profiles */}
          <div 
            className="text-center p-8 border border-dashed rounded-lg hover:text-white transition-all duration-300 cursor-pointer group"
            style={{ borderColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <div 
              className="w-20 h-20 border border-dashed group-hover:bg-pink-200 group-hover:border-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300"
              style={{ borderColor: colors.primary[300] }}
            >
              <div 
                className="w-12 h-12 border border-dashed group-hover:bg-pink-300 group-hover:border-pink-300 rounded-full flex items-center justify-center relative"
                style={{ borderColor: colors.primary[400] }}
              >
                <div 
                  className="w-6 h-6 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-3 h-3 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-2 h-2 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-300">
              Recruiter Profiles
            </h4>
            <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          
          {/* Card 3 - Find Your Dream Job */}
          <div 
            className="text-center p-8 border border-dashed rounded-lg hover:text-white transition-all duration-300 cursor-pointer group"
            style={{ borderColor: colors.mainRed }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainRed;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <div 
              className="w-20 h-20 border border-dashed group-hover:bg-pink-200 group-hover:border-pink-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300"
              style={{ borderColor: colors.primary[300] }}
            >
              <div 
                className="w-12 h-12 border border-dashed group-hover:bg-pink-300 group-hover:border-pink-300 rounded-full flex items-center justify-center relative"
                style={{ borderColor: colors.primary[400] }}
              >
                <div 
                  className="w-6 h-6 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-3 h-3 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 border border-dashed group-hover:bg-pink-400 group-hover:border-pink-400 rounded-full flex items-center justify-center"
                  style={{ borderColor: colors.mainRed }}
                >
                  <div 
                    className="w-2 h-2 group-hover:bg-pink-500 rounded-full"
                    style={{ backgroundColor: colors.mainRed }}
                  ></div>
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-800 group-hover:text-white mb-4 transition-colors duration-300">
              Find Your Dream Job
            </h4>
            <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors duration-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
