'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { RegisterHeroSection } from '@/components/auth/RegisterHeroSection';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { CompanyRegisterForm } from '@/components/auth/CompanyRegisterForm';
import { EmployeeRegisterForm } from '@/components/auth/EmployeeRegisterForm';
import { Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { employeeRegisterUseCase, companyRegisterUseCase } from '@/use-cases';
import type { EmployeeRegisterRequest, CompanyRegisterRequest } from '@/models';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<'company' | 'employee' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'employee' || role === 'company') {
      setSelectedRole(role);
    }
  }, [searchParams]);

  const handleRoleSelect = (role: 'company' | 'employee') => {
    setSelectedRole(role);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
  };

  const handleEmployeeSubmit = async (formData: any) => {
    setIsLoading(true);
    
    try {
      // Mapear los datos del formulario al formato de la API
      const requestData: EmployeeRegisterRequest = {
        email: formData.email,
        password: formData.password,
        role: 'EMPLOYEE',
        employee_first_name: formData.first_name,
        employee_last_name: formData.last_name,
        employee_headline: formData.headline,
        employee_location: formData.location,
        employee_bio: formData.bio,
        employee_country: formData.country,
        employee_region: formData.region,
        employee_city: formData.city,
        employee_zip_code: formData.zip_code,
        employee_primary_language: formData.primary_language,
        employee_linkedin_url: formData.linkedin_url,
      };

      await employeeRegisterUseCase.execute(requestData);
      
      setToast({
        show: true,
        message: 'Registro exitoso! Bienvenido a Tasqui Jobs',
        type: 'success'
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al registrar empleado',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySubmit = async (formData: any) => {
    setIsLoading(true);
    
    try {
      // Mapear los datos del formulario al formato de la API
      const requestData: CompanyRegisterRequest = {
        email: formData.email,
        password: formData.password,
        role: 'COMPANY' as const,
        company_legal_name: formData.company_legal_name,
        company_contact_name: formData.company_contact_name,
        company_contact_email: formData.company_contact_email,
        company_contact_phone: formData.company_contact_phone,
        company_billing_plan: formData.company_billing_plan,
        company_max_open_jobs: formData.company_max_open_jobs,
      };

      await companyRegisterUseCase.execute(requestData);
      
      setToast({
        show: true,
        message: 'Registro exitoso! Bienvenido a Tasqui Jobs',
        type: 'success'
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al registrar empresa',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
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
            <CompanyRegisterForm onSubmit={handleCompanySubmit} isLoading={isLoading} />
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
            <EmployeeRegisterForm onSubmit={handleEmployeeSubmit} isLoading={isLoading} />
          </div>
        )}
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
