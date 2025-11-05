'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';

interface CompanyFormData {
  email: string;
  password: string;
  confirmPassword: string;
  legal_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  billing_plan: string;
}

interface CompanyRegisterFormProps {
  onSubmit: (formData: CompanyFormData) => void;
  isLoading?: boolean;
}

export const CompanyRegisterForm: React.FC<CompanyRegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    // User data
    email: '',
    password: '',
    confirmPassword: '',
    
    // Company profile data
    legal_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    billing_plan: 'basic', // default
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al cambiar inputs
    if (error) setError(null);
  };

  const getMaxOpenJobs = (plan: string): number => {
    switch (plan) {
      case 'basic':
        return 10;
      case 'premium':
        return 50;
      case 'enterprise':
        return 999; // Ilimitado
      default:
        return 10;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Llamar al handler de la página
    onSubmit(formData);
  };

  return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Registro de Empresa</h2>
            <p className="text-gray-600">Completa la información de tu empresa</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Credentials Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credenciales de Usuario</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                    style={{ color: '#000000' }}
                    placeholder="empresa@ejemplo.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                      Contraseña *
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                      Confirmar Contraseña *
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Repite la contraseña"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="legal_name" className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre Legal de la Empresa *
                  </label>
                  <input
                    id="legal_name"
                    name="legal_name"
                    type="text"
                    required
                    value={formData.legal_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                    placeholder="Nombre legal de la empresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_name" className="block text-sm font-bold text-gray-700 mb-2">
                      Nombre del Contacto
                    </label>
                    <input
                      id="contact_name"
                      name="contact_name"
                      type="text"
                      value={formData.contact_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email de Contacto
                    </label>
                    <input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="contacto@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_phone" className="block text-sm font-bold text-gray-700 mb-2">
                      Teléfono de Contacto
                    </label>
                    <input
                      id="contact_phone"
                      name="contact_phone"
                      type="tel"
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="billing_plan" className="block text-sm font-bold text-gray-700 mb-2">
                      Plan de Facturación
                    </label>
                    <select
                      id="billing_plan"
                      name="billing_plan"
                      value={formData.billing_plan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                    >
                      <option value="basic">Básico (10 trabajos)</option>
                      <option value="premium">Premium (50 trabajos)</option>
                      <option value="enterprise">Enterprise (Ilimitado)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.heroGreen }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = colors.hoverGreen;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = colors.heroGreen;
                  }
                }}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta de Empresa'}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  href="/login" 
                  className="font-semibold text-green-600 hover:text-green-500 transition-colors"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
