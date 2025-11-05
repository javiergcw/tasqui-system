'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';

interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Llamar al handler de la página
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600">Accede a tu cuenta</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                style={{ color: '#000000' }}
                placeholder="Ingresa tu correo electrónico"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors bg-white text-black placeholder-gray-500"
                style={{ color: '#000000' }}
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = colors.mainGreen;
                }
              }}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link 
                href="/register" 
                className="font-semibold text-green-600 hover:text-green-500 transition-colors"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
