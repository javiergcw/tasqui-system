'use client';
import { useState } from 'react';
import { colors } from '@/lib/colors';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  companyName: string;
  jobId: string;
  isSubmitting?: boolean;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  companyName,
  jobId,
  isSubmitting = false
}) => {
  const [followCompany, setFollowCompany] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
    // cambio: reemplazo "bg-black bg-opacity-50" por "bg-black/50" y agrego blur suave opcional
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 text-center flex-1">
            Solicitar empleo en {companyName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
           {/* Contact Information */}
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Email
               </label>
               <input
                 type="email"
                 defaultValue="jgarciacar20@gmail.com"
                 readOnly
                 className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Código del país*
               </label>
               <input
                 type="text"
                 defaultValue="Colombia (+57)"
                 readOnly
                 className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Teléfono*
               </label>
               <input
                 type="tel"
                 defaultValue="3024158002"
                 readOnly
                 className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
               />
             </div>
           </div>

          {/* Follow Company */}
          <div className="flex items-start space-x-3">
            <button
              onClick={() => setFollowCompany(!followCompany)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${followCompany
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              {followCompany && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <p className="text-sm text-gray-700">
              Sigue a {companyName} para enterarte de las novedades de su página.
            </p>
          </div>

          {/* Privacy Information */}
          <div className="text-sm text-gray-600">
            <p>
              Guardamos automáticamente tu currículum y tus respuestas para facilitar las futuras solicitudes,
              personalizar tu experiencia y ayudarnos a mejorar LinkedIn. Puedes desactivar la opción de
              guardar tus datos o ajustar tus preferencias en cualquier momento en los ajustes de solicitudes.
              Más información
            </p>
            <a href="#" className="text-green-600 hover:text-green-800 mt-2 block">
              Aviso de derechos laborales.
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 mr-3 text-gray-700 font-semibold transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSubmit();
            }}
            disabled={isSubmitting}
            className="px-8 py-3 text-white font-semibold transition-colors duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.ctaGreen }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = colors.hoverGreen;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = colors.ctaGreen;
              }
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
      </div>
    </div>
  );
};
