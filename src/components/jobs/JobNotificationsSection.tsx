'use client';
import React, { useState } from 'react';
import { colors, colorClasses } from '@/lib/colors';

export const JobNotificationsSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar la suscripción
    console.log('Email suscrito:', email);
    setEmail('');
  };

  return (
    <section 
      className="py-16"
      style={{ backgroundColor: colors.mainGreen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl lg:text-4xl font-bold ${colorClasses.sidebar.text} mb-4`}>
              Get New Job Notifications
            </h2>
            <p className={`text-lg ${colorClasses.sidebar.text}/90`}>
              Subscribe & get all related jobs notification
            </p>
          </div>

          {/* Email Subscription Form */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[280px] bg-white"
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 ${colorClasses.sidebar.text} font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap`}
                style={{ 
                  backgroundColor: colors.dark[800],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[900];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[800];
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
