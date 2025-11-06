'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, AdminPostJobHeroSection, AdminPostJobFormSection, Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { createJobUseCase, skillsCompleteUseCase, jobMasterDataCompleteUseCase } from '@/use-cases';
import type { SkillCategory } from '@/models/master/skills-complete.model';
import type { JobCategory, JobTag, JobType, ExperienceLevel } from '@/models/master/job-master-data-complete.model';
import type { CreateJobRequest } from '@/models/admin/job.model';

export default function AdminPostJobPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticket_id') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [isLoadingMasterData, setIsLoadingMasterData] = useState(true);
  const [resetForm, setResetForm] = useState(false);
  const [skillsCategories, setSkillsCategories] = useState<SkillCategory[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [jobTags, setJobTags] = useState<JobTag[]>([]);
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<ExperienceLevel[]>([]);
  const [masterDataError, setMasterDataError] = useState<string | null>(null);
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

    const fetchMasterData = async () => {
      try {
        setIsLoadingMasterData(true);
        setMasterDataError(null);
        const response = await jobMasterDataCompleteUseCase.execute();
        setJobCategories(response.data.categories);
        setJobTags(response.data.tags);
        setJobTypes(response.data.job_types);
        setExperienceLevels(response.data.experience_levels);
      } catch (error) {
        console.error('Error fetching master data:', error);
        setMasterDataError(error instanceof Error ? error.message : 'Error al cargar los datos maestros');
        setToast({
          show: true,
          message: 'Error al cargar los datos maestros',
          type: 'error'
        });
      } finally {
        setIsLoadingMasterData(false);
      }
    };

    fetchSkills();
    fetchMasterData();
  }, []);

  const handleSubmit = async (formData: {
    jobTitle: string;
    jobDescription: string;
    location: string;
    salaryMin: string;
    salaryMax: string;
    ticketId?: string;
    jobTags?: string[];
    jobCategory: string;
    jobType: string;
    experience: string;
    requiredSkills: Array<{ categoryId: string; subCategoryId: string }>;
  }) => {
    setIsLoading(true);
    
    try {
      // Parsear los salarios
      const salaryMin = formData.salaryMin ? parseFloat(formData.salaryMin) : 0;
      const salaryMax = formData.salaryMax ? parseFloat(formData.salaryMax) : 0;
      const currency = 'COP'; // Por defecto COP, puede ser configurable

      // Separar soft skills y hard skills basándose en el tipo de categoría
      const softSkills: Array<{ category_id: string }> = [];
      const hardSkills: Array<{ 
        subcategory_id: string; 
        level: number; 
        years_experience: number; 
        last_used_at: string;
      }> = [];

      formData.requiredSkills.forEach(skill => {
        const category = skillsCategories.find(cat => cat.id === skill.categoryId);
        if (category) {
          if (category.type === 'SOFT') {
            // Solo agregar si no existe ya
            if (!softSkills.find(s => s.category_id === skill.categoryId)) {
              softSkills.push({ category_id: skill.categoryId });
            }
          } else if (category.type === 'HARD') {
            hardSkills.push({
              subcategory_id: skill.subCategoryId,
              level: 5, // Valor por defecto, puede ser configurable
              years_experience: 3, // Valor por defecto
              last_used_at: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
            });
          }
        }
      });

      const jobData: CreateJobRequest = {
        ...(formData.ticketId && formData.ticketId.trim() !== '' ? { ticket_id: formData.ticketId } : {}),
        category_id: formData.jobCategory,
        title: formData.jobTitle,
        description: formData.jobDescription,
        location: formData.location,
        job_type: formData.jobType,
        salary_min: salaryMin,
        salary_max: salaryMax,
        currency: currency,
        experience_level: formData.experience,
        status: 'DRAFT',
        visibility: 'PUBLIC',
        tags: formData.jobTags || [],
        soft_skills: softSkills,
        hard_skills: hardSkills
      };

      await createJobUseCase.execute(jobData);
      
      setToast({
        show: true,
        message: 'Trabajo creado exitosamente',
        type: 'success'
      });
      
      // Resetear el formulario
      setResetForm(true);
      
      // Esperar un momento para mostrar el toast y luego volver atrás
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al crear el trabajo',
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
      <AdminPostJobHeroSection />

      {/* Job Form Section */}
      <AdminPostJobFormSection 
        onSubmit={handleSubmit} 
        skillsCategories={skillsCategories}
        isLoadingSkills={isLoadingSkills}
        skillsError={skillsError}
        initialTicketId={ticketId}
        jobCategories={jobCategories}
        jobTags={jobTags}
        jobTypes={jobTypes}
        experienceLevels={experienceLevels}
        isLoadingMasterData={isLoadingMasterData}
        masterDataError={masterDataError}
        resetForm={resetForm}
        onResetComplete={() => setResetForm(false)}
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
