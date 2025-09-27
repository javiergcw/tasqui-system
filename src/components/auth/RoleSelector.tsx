'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface RoleSelectorProps {
  onRoleSelect: (role: 'company' | 'employee') => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<'company' | 'employee' | null>(null);

  const handleRoleSelect = (role: 'company' | 'employee') => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Selecciona tu tipo de cuenta</h2>
          <p className="text-gray-600">Elige el tipo de cuenta que mejor se adapte a tus necesidades</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Card */}
          <div 
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
              selectedRole === 'company' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleRoleSelect('company')}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: selectedRole === 'company' ? colors.mainGreen : colors.gray[300] }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Empresa</h3>
              <p className="text-gray-600 mb-3 text-sm">
                Publica ofertas de trabajo y encuentra el talento que necesitas
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Publicar ofertas de trabajo</li>
                <li>• Gestionar candidatos</li>
                <li>• Acceso a herramientas de reclutamiento</li>
              </ul>
            </div>
            {selectedRole === 'company' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: colors.mainGreen }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Employee Card */}
          <div 
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
              selectedRole === 'employee' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleRoleSelect('employee')}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: selectedRole === 'employee' ? colors.mainGreen : colors.gray[300] }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Empleado</h3>
              <p className="text-gray-600 mb-3 text-sm">
                Encuentra oportunidades de trabajo y desarrolla tu carrera
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Buscar ofertas de trabajo</li>
                <li>• Crear perfil profesional</li>
                <li>• Aplicar a empleos</li>
              </ul>
            </div>
            {selectedRole === 'employee' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: colors.mainGreen }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="mt-3 text-center">
            <button
              className="px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
              style={{ backgroundColor: colors.heroGreen }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverGreen;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.heroGreen;
              }}
            >
              Continuar con {selectedRole === 'company' ? 'Empresa' : 'Empleado'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
