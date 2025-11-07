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
} from '@/use-cases';
import type { EmployeeProfile } from '@/models';
import type {
  EmployeeEducation,
  CreateEmployeeEducationRequest,
  UpdateEmployeeEducationRequest as UpdateEducationRequest,
} from '@/models/employee/education.model';
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';

export default function ProfilePage() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [educations, setEducations] = useState<EmployeeEducation[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [isSavingEducation, setIsSavingEducation] = useState(false);
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
          onUpdateProfile={handleUpdateProfile}
          isUpdatingProfile={isUpdatingProfile}
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
