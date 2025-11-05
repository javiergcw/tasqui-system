'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';

interface EmployeeFormData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  headline: string;
  location: string;
  bio: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  birth_date: string;
  primary_language: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
}

interface EmployeeRegisterFormProps {
  onSubmit: (formData: EmployeeFormData) => void;
  isLoading?: boolean;
}

export const EmployeeRegisterForm: React.FC<EmployeeRegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    // User data
    email: '',
    password: '',
    confirmPassword: '',
    
    // Employee profile data
    first_name: '',
    last_name: '',
    headline: '',
    location: '',
    bio: '',
    country: '',
    region: '',
    city: '',
    zip_code: '',
    birth_date: '',
    primary_language: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    github_url: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al cambiar inputs
    if (error) setError(null);
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
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registro de Empleado</h2>
          <p className="text-gray-600">Completa tu perfil profesional</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
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
                    placeholder="tu@email.com"
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

            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-bold text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-bold text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="headline" className="block text-sm font-bold text-gray-700 mb-2">
                    Título Profesional
                  </label>
                  <input
                    id="headline"
                    name="headline"
                    type="text"
                    value={formData.headline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                    placeholder="Ej: Desarrollador Frontend, Diseñador UX/UI"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-bold text-gray-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                    placeholder="Cuéntanos sobre ti y tu experiencia profesional..."
                  />
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Ubicación</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                    Ubicación General
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                    placeholder="Ciudad, País"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-2">
                      País
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="España"
                    />
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-bold text-gray-700 mb-2">
                      Región/Estado
                    </label>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Madrid"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="Madrid"
                    />
                  </div>

                  <div>
                    <label htmlFor="zip_code" className="block text-sm font-bold text-gray-700 mb-2">
                      Código Postal
                    </label>
                    <input
                      id="zip_code"
                      name="zip_code"
                      type="text"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="28001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Adicional</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birth_date" className="block text-sm font-bold text-gray-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="primary_language" className="block text-sm font-bold text-gray-700 mb-2">
                      Idioma Principal
                    </label>
                    <select
                      id="primary_language"
                      name="primary_language"
                      value={formData.primary_language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                    >
                      <option value="">Seleccionar idioma</option>
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociales (Opcional)</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="linkedin_url" className="block text-sm font-bold text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="https://linkedin.com/in/tu-perfil"
                    />
                  </div>

                  <div>
                    <label htmlFor="github_url" className="block text-sm font-bold text-gray-700 mb-2">
                      GitHub
                    </label>
                    <input
                      id="github_url"
                      name="github_url"
                      type="url"
                      value={formData.github_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="https://github.com/tu-usuario"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="twitter_url" className="block text-sm font-bold text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      id="twitter_url"
                      name="twitter_url"
                      type="url"
                      value={formData.twitter_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="https://twitter.com/tu-usuario"
                    />
                  </div>

                  <div>
                    <label htmlFor="facebook_url" className="block text-sm font-bold text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      id="facebook_url"
                      name="facebook_url"
                      type="url"
                      value={formData.facebook_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                      style={{ color: '#000000' }}
                      placeholder="https://facebook.com/tu-perfil"
                    />
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
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta de Empleado'}
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
