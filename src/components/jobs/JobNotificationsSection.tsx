'use client';
import React, { useState, useTransition } from 'react';
import { colors, colorClasses } from '@/lib/colors';
import { Toast } from '@/components/ui/Toast';

interface JobNotificationsSectionProps {
  onSubscribe?: (email: string) => Promise<{ success: boolean; message: string }>;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const JobNotificationsSection: React.FC<JobNotificationsSectionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [toastState, setToastState] = useState<{ visible: boolean; type: ToastType; message: string }>({
    visible: false,
    type: 'info',
    message: '',
  });

  const showToast = (type: ToastType, message: string) => {
    setToastState({
      visible: true,
      type,
      message,
    });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!onSubscribe) {
      showToast('error', 'El servicio de suscripción no está disponible en este momento.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await onSubscribe(email);
        if (result.success) {
          showToast('success', result.message || 'Te has suscrito correctamente.');
          setEmail('');
        } else {
          showToast('error', result.message || 'No fue posible completar la suscripción.');
        }
      } catch (err) {
        console.error('Error al suscribirse al newsletter:', err);
        showToast('error', 'Ocurrió un error al procesar tu suscripción. Intenta nuevamente.');
      }
    });
  };

  return (
    <section
      className="py-16"
      style={{ backgroundColor: colors.mainGreen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl lg:text-4xl font-bold ${colorClasses.sidebar.text} mb-4`}>
              Recibe Notificaciones de Nuevos Trabajos
            </h2>
            <p className={`text-lg ${colorClasses.sidebar.text}/90`}>
              Suscríbete y recibe todas las notificaciones de trabajos relacionados
            </p>
          </div>

          {/* Email Subscription Form */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="px-4 py-3 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[280px] bg-white"
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 ${colorClasses.sidebar.text} font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap`}
                style={{
                  backgroundColor: colors.dark[800],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[900];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.dark[800];
                }}
                disabled={isPending}
              >
                {isPending ? 'Enviando...' : 'Suscribirse'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.visible}
        onClose={handleCloseToast}
        duration={4000}
      />
    </section>
  );
};
