'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ProfileHeroSection } from '@/components/aspirante/ProfileHeroSection';
import { ProfileMainSection } from '@/components/aspirante/ProfileMainSection';
import type { SkillsSelectionPayload } from '@/components/aspirante/SkillsSection';
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
  skillsCompleteUseCase,
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
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';
import type { SkillCategory } from '@/models/master/skills-complete.model';

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
  const [employeeSkills, setEmployeeSkills] = useState<SkillsSelectionPayload | null>(null);
  const [isSavingSkills, setIsSavingSkills] = useState(false);
  const [removingSkill, setRemovingSkill] = useState<{ categoryId: string; subCategoryId?: string } | null>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
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
        const skillsResponse = await skillsCompleteUseCase.execute();
        if (skillsResponse.success) {
          setSkillCategories(skillsResponse.data?.categories ?? []);
        } else {
          setSkillCategories([]);
        }
      } catch (error) {
        console.error('Error al obtener habilidades:', error);
        setSkillCategories([]);
      } finally {
        setIsLoadingSkills(false);
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

  const handleSaveSkills = async (selection: SkillsSelectionPayload) => {
    setIsSavingSkills(true);
    try {
      setEmployeeSkills(selection);
      setToast({ show: true, message: 'Habilidades guardadas exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al guardar habilidades:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al guardar habilidades',
        type: 'error'
      });
      throw error;
    } finally {
      setIsSavingSkills(false);
    }
  };

  const handleRemoveSkillCategory = async (categoryId: string) => {
    setRemovingSkill({ categoryId });
    try {
      setEmployeeSkills(prev => {
        if (!prev) return prev;
        const nextCategories = prev.categories.filter(id => id !== categoryId);
        const nextSubcategories = { ...prev.subcategories };
        delete nextSubcategories[categoryId];

        if (!nextCategories.length) {
          return null;
        }

        return {
          categories: nextCategories,
          subcategories: nextSubcategories
        };
      });
      setToast({ show: true, message: 'Categoría de habilidades eliminada', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar categoría de habilidades:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al eliminar la categoría',
        type: 'error'
      });
      throw error;
    } finally {
      setRemovingSkill(null);
    }
  };

  const handleRemoveSkillSubcategory = async (categoryId: string, subCategoryId: string) => {
    setRemovingSkill({ categoryId, subCategoryId });
    try {
      setEmployeeSkills(prev => {
        if (!prev) return prev;

        const current = prev.subcategories[categoryId] ?? [];
        const updated = current.filter(id => id !== subCategoryId);
        const nextSubcategories = { ...prev.subcategories };

        if (updated.length) {
          nextSubcategories[categoryId] = updated;
          return {
            categories: [...prev.categories],
            subcategories: nextSubcategories
          };
        }

        delete nextSubcategories[categoryId];
        const nextCategories = prev.categories.filter(id => id !== categoryId);

        if (!nextCategories.length) {
          return null;
        }

        return {
          categories: nextCategories,
          subcategories: nextSubcategories
        };
      });
      setToast({ show: true, message: 'Habilidad eliminada', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar habilidad:', error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al eliminar la habilidad',
        type: 'error'
      });
      throw error;
    } finally {
      setRemovingSkill(null);
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
          onUpdateProfile={handleUpdateProfile}
          isUpdatingProfile={isUpdatingProfile}
          skillCategories={skillCategories}
          isLoadingSkills={isLoadingSkills}
          savedSkills={employeeSkills}
          onSaveSkills={handleSaveSkills}
          isSavingSkills={isSavingSkills}
          onRemoveSkillCategory={handleRemoveSkillCategory}
          onRemoveSkillSubcategory={handleRemoveSkillSubcategory}
          removingSkill={removingSkill}
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
