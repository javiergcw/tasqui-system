'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ProfileHeroSection } from '@/components/aspirante/ProfileHeroSection';
import { ProfileMainSection } from '@/components/aspirante/ProfileMainSection';
import { Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import {
  employeeProfileUseCase,
  getEmployeeEducationsUseCase,
  createEmployeeEducationUseCase,
  updateEmployeeEducationUseCase,
  deleteEmployeeEducationUseCase,
  getEmployeeExperiencesUseCase,
  createEmployeeExperienceUseCase,
  updateEmployeeExperienceUseCase,
  deleteEmployeeExperienceUseCase,
  employeeSkillsUseCase,
  skillsCompleteUseCase,
  getEmployeeJobApplicationsUseCase,
} from '@/use-cases';
import type { EmployeeProfile } from '@/models';
import type {
  EmployeeEducation,
  CreateEmployeeEducationRequest,
  UpdateEmployeeEducationRequest as UpdateEducationRequest,
} from '@/models/employee/education.model';
import type {
  EmployeeExperience,
  CreateEmployeeExperienceRequest,
  UpdateEmployeeExperienceRequest as UpdateExperienceRequest,
} from '@/models/employee/experience.model';
import type { EmployeeSkillCategoryItem, EmployeeSkillsUpsertRequest } from '@/models/employee/employee-skills.model';
import type { SkillCategory } from '@/models/master/skills-complete.model';
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';
import type { EmployeeJobApplication } from '@/models/employee/job-application.model';
export default function ProfilePage() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [educations, setEducations] = useState<EmployeeEducation[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [isSavingEducation, setIsSavingEducation] = useState(false);
  const [experiences, setExperiences] = useState<EmployeeExperience[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [isSavingExperience, setIsSavingExperience] = useState(false);
  const [skillCategories, setSkillCategories] = useState<EmployeeSkillCategoryItem[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [isDeletingSkill, setIsDeletingSkill] = useState(false);
  const [isDeletingSkillCategory, setIsDeletingSkillCategory] = useState(false);
  const [availableSkillCategories, setAvailableSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoadingAvailableSkills, setIsLoadingAvailableSkills] = useState(true);
  const [isSavingSkills, setIsSavingSkills] = useState(false);
  const [jobApplications, setJobApplications] = useState<EmployeeJobApplication[]>([]);
  const [isLoadingJobApplications, setIsLoadingJobApplications] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employeeProfileUseCase.execute();
        if (response.success && response.data.employee_profile) {
          setProfile(response.data.employee_profile);
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      } finally {
        setIsLoading(false);
      }
      try {
        setIsLoadingEducations(true);
        const educationList = await getEmployeeEducationsUseCase.execute();
        setEducations(educationList);
      } catch (error) {
        console.error('Error al obtener formaciones académicas:', error);
      } finally {
        setIsLoadingEducations(false);
      }

      try {
        setIsLoadingExperiences(true);
        const experienceList = await getEmployeeExperiencesUseCase.execute();
        setExperiences(experienceList);
      } catch (error) {
        console.error('Error al obtener experiencias laborales:', error);
      } finally {
        setIsLoadingExperiences(false);
      }

      try {
        setIsLoadingSkills(true);
        const skillsResponse = await employeeSkillsUseCase.execute();
        if (skillsResponse.success && skillsResponse.data?.skill_categories) {
          const sanitizedCategories = skillsResponse.data.skill_categories.filter(item => item.subcategories.length > 0);
          setSkillCategories(sanitizedCategories);
        } else {
          setSkillCategories([]);
        }
      } catch (error) {
        console.error('Error al obtener habilidades del empleado:', error);
      } finally {
        setIsLoadingSkills(false);
      }

      try {
        setIsLoadingAvailableSkills(true);
        const masterSkillsResponse = await skillsCompleteUseCase.execute();
        if (masterSkillsResponse.success && masterSkillsResponse.data?.categories) {
          setAvailableSkillCategories(masterSkillsResponse.data.categories);
        } else {
          setAvailableSkillCategories([]);
        }
      } catch (error) {
        console.error('Error al obtener catálogo completo de habilidades:', error);
      } finally {
        setIsLoadingAvailableSkills(false);
      }

      try {
        setIsLoadingJobApplications(true);
        const applicationsResponse = await getEmployeeJobApplicationsUseCase.execute();
        setJobApplications(applicationsResponse.jobApplications);
      } catch (error) {
        console.error('Error al obtener las postulaciones del empleado:', error);
        setJobApplications([]);
      } finally {
        setIsLoadingJobApplications(false);
      }

    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (data: UpdateEmployeeProfileRequest): Promise<EmployeeProfile> => {
    setIsUpdatingProfile(true);
    
    try {
      const updatedProfile = await employeeProfileUseCase.updateProfile(data);
      
      // Actualizar el estado del perfil
      setProfile(updatedProfile);
      
      setToast({
        show: true,
        message: 'Perfil actualizado exitosamente',
        type: 'success'
      });

      return updatedProfile;
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al actualizar el perfil',
        type: 'error'
      });
      throw error;
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCreateEducation = async (data: CreateEmployeeEducationRequest): Promise<EmployeeEducation> => {
    setIsSavingEducation(true);
    try {
      const newEducation = await createEmployeeEducationUseCase.execute(data);
      setEducations(prev => [newEducation, ...prev]);
      setToast({ show: true, message: 'Formación creada exitosamente', type: 'success' });
      return newEducation;
    } catch (error) {
      console.error('Error al crear formación académica:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al crear la formación', type: 'error' });
      throw error;
    } finally {
      setIsSavingEducation(false);
    }
  };

  const handleUpdateEducation = async (id: string, data: UpdateEducationRequest): Promise<EmployeeEducation> => {
    setIsSavingEducation(true);
    try {
      const updatedEducation = await updateEmployeeEducationUseCase.execute(id, data);
      setEducations(prev => prev.map(item => (item.id === id ? updatedEducation : item)));
      setToast({ show: true, message: 'Formación actualizada exitosamente', type: 'success' });
      return updatedEducation;
    } catch (error) {
      console.error('Error al actualizar formación académica:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al actualizar la formación', type: 'error' });
      throw error;
    } finally {
      setIsSavingEducation(false);
    }
  };

  const handleDeleteEducation = async (id: string): Promise<void> => {
    try {
      await deleteEmployeeEducationUseCase.execute(id);
      setEducations(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Formación eliminada exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar formación académica:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al eliminar la formación', type: 'error' });
      throw error;
    }
  };

  const handleCreateExperience = async (data: CreateEmployeeExperienceRequest): Promise<EmployeeExperience> => {
    setIsSavingExperience(true);
    try {
      const newExperience = await createEmployeeExperienceUseCase.execute(data);
      setExperiences(prev => [newExperience, ...prev]);
      setToast({ show: true, message: 'Experiencia creada exitosamente', type: 'success' });
      return newExperience;
    } catch (error) {
      console.error('Error al crear experiencia laboral:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al crear la experiencia', type: 'error' });
      throw error;
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleUpdateExperience = async (id: string, data: UpdateExperienceRequest): Promise<EmployeeExperience> => {
    setIsSavingExperience(true);
    try {
      const updatedExperience = await updateEmployeeExperienceUseCase.execute(id, data);
      setExperiences(prev => prev.map(item => (item.id === id ? updatedExperience : item)));
      setToast({ show: true, message: 'Experiencia actualizada exitosamente', type: 'success' });
      return updatedExperience;
    } catch (error) {
      console.error('Error al actualizar experiencia laboral:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al actualizar la experiencia', type: 'error' });
      throw error;
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleDeleteExperience = async (id: string): Promise<void> => {
    try {
      await deleteEmployeeExperienceUseCase.execute(id);
      setExperiences(prev => prev.filter(item => item.id !== id));
      setToast({ show: true, message: 'Experiencia eliminada exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar experiencia laboral:', error);
      setToast({ show: true, message: error instanceof Error ? error.message : 'Error al eliminar la experiencia', type: 'error' });
      throw error;
    }
  };

  const handleDeleteSkillSubcategory = async (subcategoryId: string): Promise<void> => {
    setIsDeletingSkill(true);
    try {
      await employeeSkillsUseCase.deleteSubcategory(subcategoryId);
      setSkillCategories(prev =>
        prev
          .map(category => ({
            ...category,
            subcategories: category.subcategories.filter(item => item.subcategory.id !== subcategoryId),
          }))
          .filter(category => category.subcategories.length > 0)
      );
      setToast({ show: true, message: 'Habilidad eliminada exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar habilidad:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al eliminar la habilidad seleccionada',
        type: 'error',
      });
      throw error;
    } finally {
      setIsDeletingSkill(false);
    }
  };

  const handleDeleteSkillCategory = async (categoryId: string): Promise<void> => {
    setIsDeletingSkillCategory(true);
    try {
      await employeeSkillsUseCase.deleteCategory(categoryId);
      setSkillCategories(prev => prev.filter(category => category.category.id !== categoryId));
      setToast({ show: true, message: 'Categoría de habilidades eliminada exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar la categoría de habilidades:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al eliminar la categoría seleccionada',
        type: 'error',
      });
      throw error;
    } finally {
      setIsDeletingSkillCategory(false);
    }
  };

  const handleSaveSkills = async (payload: EmployeeSkillsUpsertRequest): Promise<void> => {
    setIsSavingSkills(true);
    try {
      await employeeSkillsUseCase.save(payload);
      const refreshed = await employeeSkillsUseCase.execute();
      if (refreshed.success && refreshed.data?.skill_categories) {
        const sanitizedCategories = refreshed.data.skill_categories.filter(item => item.subcategories.length > 0);
        setSkillCategories(sanitizedCategories);
      }
      setToast({ show: true, message: 'Habilidades guardadas exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al guardar habilidades:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al guardar las habilidades seleccionadas',
        type: 'error',
      });
      throw error;
    } finally {
      setIsSavingSkills(false);
    }
  };

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <ProfileHeroSection />
        <ProfileMainSection
          profile={profile}
          isLoading={isLoading}
          educations={educations}
          isLoadingEducations={isLoadingEducations}
          onCreateEducation={handleCreateEducation}
          onUpdateEducation={handleUpdateEducation}
          onDeleteEducation={handleDeleteEducation}
          isSavingEducation={isSavingEducation}
          experiences={experiences}
          isLoadingExperiences={isLoadingExperiences}
          onCreateExperience={handleCreateExperience}
          onUpdateExperience={handleUpdateExperience}
          onDeleteExperience={handleDeleteExperience}
          isSavingExperience={isSavingExperience}
          skillCategories={skillCategories}
          isLoadingSkills={isLoadingSkills}
          onDeleteSkillSubcategory={handleDeleteSkillSubcategory}
          isDeletingSkill={isDeletingSkill}
          onDeleteSkillCategory={handleDeleteSkillCategory}
          isDeletingSkillCategory={isDeletingSkillCategory}
          availableSkillCategories={availableSkillCategories}
          isLoadingAvailableSkills={isLoadingAvailableSkills}
          onSaveSkills={handleSaveSkills}
          isSavingSkills={isSavingSkills}
          onUpdateProfile={handleUpdateProfile}
          isUpdatingProfile={isUpdatingProfile}
          jobApplications={jobApplications}
          isLoadingJobApplications={isLoadingJobApplications}
        />

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
