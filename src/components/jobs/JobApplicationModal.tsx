'use client';
import { useState } from 'react';
import { colors } from '@/lib/colors';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  companyName
}) => {
  const [followCompany, setFollowCompany] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      
      // Validar tipos de archivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
      
      // Validar tamaño (5MB máximo)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      const sizeValidFiles = validFiles.filter(file => file.size <= maxSize);
      
      if (sizeValidFiles.length !== newFiles.length) {
        alert('Algunos archivos no son válidos. Solo se permiten archivos DOC, DOCX, PDF de máximo 5MB.');
      }
      
      setUploadedFiles(prev => [...prev, ...sizeValidFiles]);
    }
  };

  const triggerFileUpload = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadResume = (resumeName: string) => {
    // Crear un enlace de descarga simulado
    const link = document.createElement('a');
    link.href = '#'; // En una aplicación real, esto sería la URL del archivo
    link.download = resumeName;
    
    // Simular la descarga
    console.log(`Descargando: ${resumeName}`);
    alert(`Descargando: ${resumeName}`);
    
    // En una aplicación real, aquí se haría la descarga real del archivo
    // link.click();
  };

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
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Código del país*
               </label>
               <input
                 type="text"
                 defaultValue="Colombia (+57)"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Teléfono*
               </label>
               <input
                 type="tel"
                 defaultValue="3024158002"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
               />
             </div>
           </div>

          {/* Resume Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Asegúrate de incluir un currículum actualizado
            </h3>

            {/* Input de archivo oculto */}
            <input
              id="resume-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="space-y-3">
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No hay currículums cargados</p>
                  <p className="text-sm">Haz clic en &quot;Cargar currículum&quot; para agregar archivos</p>
                </div>
              ) : (
                uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        {file.type.includes('pdf') ? 'PDF' : 'DOC'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => downloadResume(file.name)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title={`Descargar ${file.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => removeUploadedFile(index)}
                        className="text-red-400 hover:text-red-600 transition-colors duration-200"
                        title={`Eliminar ${file.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4">
              <button 
                onClick={triggerFileUpload}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cargar currículum
              </button>
              <p className="text-sm text-gray-500 mt-2">
                DOC, DOCX, PDF (5 MB)
              </p>
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
            <a href="#" className="text-blue-600 hover:text-blue-800 mt-2 block">
              Aviso de derechos laborales.
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-3 text-white font-semibold transition-colors duration-200"
            style={{ backgroundColor: colors.ctaBlue }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.ctaBlue;
            }}
          >
            Enviar solicitud
          </button>
        </div>
      </div>
    </div>
  );
};
