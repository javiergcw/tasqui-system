'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ProfileHeroSection } from '@/components/aspirante/ProfileHeroSection';
import { ProfileMainSection } from '@/components/aspirante/ProfileMainSection';
import { Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { employeeProfileUseCase } from '@/use-cases';
import type { EmployeeProfile } from '@/models';
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';

export default function ProfilePage() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchProfile = async () => {
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
    };

    fetchProfile();
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

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <ProfileHeroSection />
        <ProfileMainSection 
          profile={profile} 
          isLoading={isLoading}
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
