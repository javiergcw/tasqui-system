'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colorClasses, colors } from '@/lib/colors';
import { JobDetailHeader } from './JobDetailHeader';
import { JobApplicationModal } from './JobApplicationModal';
import { isAuthenticated } from '@/utils/auth';
import type { LoginUser } from '@/models/auth/login.model';

interface JobDetailContentProps {
  jobId: string;
  user: LoginUser | null;
  hasApplied: boolean;
  isChecking: boolean;
  onApplyClick: () => void;
}

export const JobDetailContent: React.FC<JobDetailContentProps> = ({
  jobId,
  user,
  hasApplied,
  isChecking,
  onApplyClick
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNow = () => {
    // Si no está autenticado, redirigir a registro
    if (!isAuthenticated()) {
      router.push('/register?role=employee');
      return;
    }

    // Si no es empleado, redirigir a registro como empleado
    if (!user || user.role !== 'EMPLOYEE') {
      router.push('/register?role=employee');
      return;
    }

    // Si ya aplicó, no hacer nada
    if (hasApplied) {
      return;
    }

    // Abrir modal de aplicación
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitApplication = async () => {
    // TODO: Implementar envío real de aplicación
    // await submitApplicationUseCase.execute(jobId, formData);
    console.log('Enviando aplicación para trabajo:', jobId);
    
    // Cerrar modal después de enviar
    setIsModalOpen(false);
    
    // TODO: Actualizar estado hasApplied después de enviar exitosamente
    // setHasApplied(true);
  };

  return (
    <div className="lg:col-span-2">
      <JobDetailHeader />
      <div className="bg-white p-4 md:p-6 lg:p-8 -mt-4 md:-mt-6 lg:-mt-8">
        {/* Description Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Descripción</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Estamos buscando un profesional creativo y dinámico que se integre a nuestro equipo de diseño. La posición requiere habilidades sólidas en diseño web, gráfico y experiencia de usuario. El candidato ideal debe tener experiencia trabajando en proyectos diversos y ser capaz de trabajar en equipo de manera efectiva.
            </p>
            <p>
              Ofrecemos un ambiente de trabajo colaborativo donde podrás desarrollar tus habilidades profesionales mientras contribuyes a proyectos innovadores. Buscamos alguien apasionado por el diseño y comprometido con la excelencia.
            </p>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Requisitos</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Para ser considerado para esta posición, los candidatos deben cumplir con los siguientes requisitos:
          </p>
          <ul className="space-y-3">
            {[
              "Experiencia laboral comprobada en diseño",
              "Habilidades técnicas y blandas relevantes",
              "Cualidades personales y atributos profesionales",
              "Capacidad para soportar implementaciones de software en producción",
              "Capacidad para guiar y mentorizar ingenieros junior. Servir como líder de equipo cuando sea apropiado"
            ].map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Details Section */}
        <div>
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Detalles del Trabajo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 max-w-2xl">
            <div className="space-y-4">
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Empresa: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Tourt Design LTD</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Ubicación: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Bogotá, Colombia</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Tipo de Trabajo: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Tiempo Completo</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Correo: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>contacto@empresa.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Experiencia: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>2 Años</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Idioma: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Español</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Salario: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>$2.500.000 - $3.000.000</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Sitio Web: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>www.empresa.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button / Status Message */}
        {(user === null || user.role === 'EMPLOYEE') && (
          <div className="mt-8">
            {hasApplied && !isChecking && (
              <div className="mb-4 py-3 px-6 font-semibold text-white rounded-lg text-center flex items-center justify-center gap-2 text-sm" style={{ backgroundColor: colors.mainGreen }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ya has aplicado a esta oferta
              </div>
            )}
            <button
              onClick={handleApplyNow}
              disabled={isChecking}
              className="py-4 px-8 font-semibold transition-colors duration-200 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                if (!isChecking) {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (!isChecking) {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                }
              }}
            >
              {isChecking ? 'Verificando...' : 'Aplicar'}
            </button>
          </div>
        )}
      </div>

      {/* Job Application Modal */}
      {user && user.role === 'EMPLOYEE' && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitApplication}
          companyName="TAXAC GROUP S.A.S"
          jobId={jobId}
        />
      )}
    </div>
  );
};
