'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { RegisterHeroSection } from '@/components/auth/RegisterHeroSection';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { CompanyRegisterForm } from '@/components/auth/CompanyRegisterForm';
import { EmployeeRegisterForm } from '@/components/auth/EmployeeRegisterForm';
import { colorClasses } from '@/lib/colors';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<'company' | 'employee' | null>(null);

  const handleRoleSelect = (role: 'company' | 'employee') => {
    setSelectedRole(role);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <RegisterHeroSection />
        
        {/* Conditional Rendering based on selected role */}
        {!selectedRole ? (
          <RoleSelector onRoleSelect={handleRoleSelect} />
        ) : selectedRole === 'company' ? (
          <div>
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <button
                onClick={handleBackToRoleSelection}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a selección de rol
              </button>
            </div>
            <CompanyRegisterForm />
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <button
                onClick={handleBackToRoleSelection}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a selección de rol
              </button>
            </div>
            <EmployeeRegisterForm />
          </div>
        )}
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
