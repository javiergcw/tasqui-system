'use client';

import { useState } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, PostJobHeroSection, PostJobFormSection, Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { createJobUseCase } from '@/use-cases';

export default function AdminPostJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    
    try {
      // Extraer el rango de salario del campo salary
      let salaryMin = 0;
      let salaryMax = 0;
      let currency = 'USD';
      
      // Intentar parsear el salario si está en formato "$20,000 - $30,000"
      if (formData.salary && formData.salary.trim() !== '') {
        const salaryParts = formData.salary.split('-').map((s: string) => s.trim());
        if (salaryParts.length === 2) {
          salaryMin = parseFloat(salaryParts[0].replace(/[^0-9.]/g, ''));
          salaryMax = parseFloat(salaryParts[1].replace(/[^0-9.]/g, ''));
          // Detectar moneda
          if (formData.salary.includes('€')) currency = 'EUR';
          else if (formData.salary.includes('$')) currency = 'USD';
        } else {
          salaryMin = parseFloat(formData.salary.replace(/[^0-9.]/g, ''));
          salaryMax = salaryMin;
          if (formData.salary.includes('€')) currency = 'EUR';
          else if (formData.salary.includes('$')) currency = 'USD';
        }
      }

      const jobData = {
        ticket_id: formData.ticketId || '',
        title: formData.jobTitle,
        description: formData.jobDescription,
        location: formData.location,
        salary_min: salaryMin,
        salary_max: salaryMax,
        currency: currency,
        status: 'DRAFT',
        visibility: 'PUBLIC'
      };

      await createJobUseCase.execute(jobData);
      
      setToast({
        show: true,
        message: 'Trabajo creado exitosamente',
        type: 'success'
      });
    } catch (error: any) {
      setToast({
        show: true,
        message: error.message || 'Error al crear el trabajo',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <PostJobHeroSection />

      {/* Job Form Section */}
      <PostJobFormSection onSubmit={handleSubmit} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
      
      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
