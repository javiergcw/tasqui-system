'use client';

import { useState, useEffect } from 'react';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, AdminPostJobHeroSection, AdminPostJobFormSection, Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { createJobUseCase, skillsCompleteUseCase } from '@/use-cases';
import type { SkillCategory } from '@/models/master/skills-complete.model';

export default function AdminPostJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [skillsCategories, setSkillsCategories] = useState<SkillCategory[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoadingSkills(true);
        setSkillsError(null);
        const response = await skillsCompleteUseCase.execute();
        setSkillsCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkillsError(error instanceof Error ? error.message : 'Error al cargar las habilidades');
        setToast({
          show: true,
          message: 'Error al cargar las habilidades',
          type: 'error'
        });
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSubmit = async (formData: {
    jobTitle: string;
    jobDescription: string;
    location: string;
    salary: string;
    ticketId?: string;
  }) => {
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
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al crear el trabajo',
        type: 'error'
      });
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <AdminPostJobHeroSection />

      {/* Job Form Section */}
      <AdminPostJobFormSection 
        onSubmit={handleSubmit} 
        skillsCategories={skillsCategories}
        isLoadingSkills={isLoadingSkills}
        skillsError={skillsError}
      />

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
