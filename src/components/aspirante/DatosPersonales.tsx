'use client';
import React, { useState, useEffect } from 'react';
import { colorClasses } from '@/lib/colors';
import { colors } from '@/lib/colors';
import type { EmployeeProfile } from '@/models';
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';

interface DatosPersonalesProps {
  profile?: EmployeeProfile | null;
  onUpdateProfile?: (data: UpdateEmployeeProfileRequest) => Promise<EmployeeProfile>;
  isUpdatingProfile?: boolean;
}

export const DatosPersonales: React.FC<DatosPersonalesProps> = ({ 
  profile,
  onUpdateProfile,
  isUpdatingProfile = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateEmployeeProfileRequest>({
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
    github_url: ''
  });

  // Cargar datos del perfil cuando estén disponibles
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        headline: profile.headline || '',
        location: profile.location || '',
        bio: profile.bio || '',
        country: profile.country || '',
        region: profile.region || '',
        city: profile.city || '',
        zip_code: profile.zip_code || '',
        birth_date: profile.birth_date || '',
        primary_language: profile.primary_language || '',
        facebook_url: profile.facebook_url || '',
        twitter_url: profile.twitter_url || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onUpdateProfile) return;

    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // El error ya se maneja en el componente padre con el toast
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        headline: profile.headline || '',
        location: profile.location || '',
        bio: profile.bio || '',
        country: profile.country || '',
        region: profile.region || '',
        city: profile.city || '',
        zip_code: profile.zip_code || '',
        birth_date: profile.birth_date || '',
        primary_language: profile.primary_language || '',
        facebook_url: profile.facebook_url || '',
        twitter_url: profile.twitter_url || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || ''
      });
    }
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Información básica */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
          Información Básica
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Nombre
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Apellido
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Título Profesional
            </label>
            <input
              type="text"
              name="headline"
              placeholder="Título Profesional"
              value={formData.headline}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              placeholder="Ubicación"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Dirección */}
      <div>
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
          Dirección
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              País
            </label>
            <input
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Ciudad
            </label>
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Código Postal
            </label>
            <input
              type="text"
              name="zip_code"
              placeholder="Código Postal"
              value={formData.zip_code}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Región
            </label>
            <input
              type="text"
              name="region"
              placeholder="Región"
              value={formData.region}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Otra Información */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
          Otra Información
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Idioma Principal
            </label>
            <input
              type="text"
              name="primary_language"
              placeholder="Idioma Principal"
              value={formData.primary_language}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date ? formData.birth_date.split('T')[0] : ''}
              onChange={(e) => {
                const dateValue = e.target.value ? `${e.target.value}T00:00:00Z` : '';
                setFormData(prev => ({ ...prev, birth_date: dateValue }));
              }}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="mt-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Biografía
            </label>
            <textarea
              name="bio"
              placeholder="Tu Biografía"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Divider con líneas punteadas */}
      <div className={`border-t border-dashed ${colorClasses.border.gray200} my-8`}></div>

      {/* Enlaces Sociales */}
      <div>
        <h2 className="text-xl font-bold mb-6" style={{ color: colors.mainGreen }}>
          Enlaces Sociales
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Facebook
            </label>
            <input
              type="url"
              name="facebook_url"
              placeholder="https://facebook.com/user"
              value={formData.facebook_url}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              Twitter
            </label>
            <input
              type="url"
              name="twitter_url"
              placeholder="https://twitter.com/user"
              value={formData.twitter_url}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin_url"
              placeholder="https://linkedin.com/in/user"
              value={formData.linkedin_url}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${colorClasses.text.gray600} mb-2`}>
              GitHub
            </label>
            <input
              type="url"
              name="github_url"
              placeholder="https://github.com/user"
              value={formData.github_url}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-900 disabled:bg-gray-50"
              style={{ 
                '--tw-ring-color': colors.mainGreen 
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Botones de acción - Solo uno al final */}
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 font-medium rounded-md transition-colors text-white"
            style={{ backgroundColor: colors.mainGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.hoverGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.mainGreen;
            }}
          >
            Editar Información
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdatingProfile}
              className="px-6 py-2 font-medium rounded-md transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 py-2 font-medium rounded-md transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.mainGreen }}
              onMouseEnter={(e) => {
                if (!isUpdatingProfile) {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.mainGreen;
              }}
            >
              {isUpdatingProfile ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </>
        )}
      </div>
    </form>
  );
};
