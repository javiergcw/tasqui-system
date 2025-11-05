'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { LoginHeroSection } from '@/components/auth/LoginHeroSection';
import { LoginForm } from '@/components/auth/LoginForm';
import { Toast } from '@/components';
import { colorClasses } from '@/lib/colors';
import { loginUseCase } from '@/use-cases';
import type { LoginRequest } from '@/models';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async (formData: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      const requestData: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUseCase.execute(requestData);
      
      if (response.success) {
        setToast({
          show: true,
          message: 'Login exitoso! Bienvenido de vuelta',
          type: 'success'
        });

        // Redirigir según el rol
        const user = response.data.user;
        setTimeout(() => {
          switch (user.role) {
            case 'ADMIN':
              window.location.href = '/admin/my-jobs';
              break;
            case 'COMPANY':
              window.location.href = '/company/my-jobs';
              break;
            case 'EMPLOYEE':
              window.location.href = '/employee/profile';
              break;
            default:
              window.location.href = '/';
          }
        }, 1000);
      }
    } catch (error: unknown) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Error al iniciar sesión',
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
        <LoginHeroSection />
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
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
