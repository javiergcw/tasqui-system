'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { colors, colorClasses } from '@/lib/colors';
import { AdminJobDetailHeader } from './AdminJobDetailHeader';

export const AdminJobDetailContent: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="lg:col-span-2">
      <AdminJobDetailHeader />
      <div className="bg-white p-4 md:p-6 lg:p-8 -mt-4 md:-mt-6 lg:-mt-8">
        {/* Description Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Descripción</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${colorClasses.text.slate800} mb-4`}>Requisitos</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="space-y-3">
            {[
              "Experiencia laboral",
              "Habilidades (habilidades blandas y/o técnicas)",
              "Cualidades y atributos personales.",
              "Apoyar las implementaciones de software en producción.",
              "Guiar y orientar a ingenieros junior. Actuar como líder del equipo si es apropiado."
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
                <span className={`${colorClasses.text.slate800} font-semibold`}>Wellesley Rd, London</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Tipo de Trabajo: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Tiempo Completo</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Correo: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>hello@company.com</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Experiencia: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>2 Años</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Idioma: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>Inglés</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Salario: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>$10,000</span>
              </div>
              <div>
                <span className={`${colorClasses.text.gray600} font-medium`}>Sitio Web: </span>
                <span className={`${colorClasses.text.slate800} font-semibold`}>www.company.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push('/admin/edit-job/1')}
            className="py-4 px-8 font-semibold transition-colors duration-200 text-white rounded-lg"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Editar Trabajo
          </button>
          <button
            onClick={() => router.push('/admin/applicants')}
            className="py-4 px-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-colors duration-200 rounded-lg"
          >
            Ver Aplicaciones
          </button>
        </div>
      </div>
    </div>
  );
};

