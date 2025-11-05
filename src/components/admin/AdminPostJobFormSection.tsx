'use client';

import { useState } from 'react';
import { colors } from '@/lib/colors';
import { AdminJobSkillsSelector } from './AdminJobSkillsSelector';

interface SelectedSkill {
  categoryId: string;
  subCategoryId: string;
}

interface JobFormData {
  jobTitle: string;
  companyName: string;
  companyWebsite: string;
  jobType: string;
  salary: string;
  jobCategory: string;
  companyEmail: string;
  location: string;
  jobTags: string;
  experience: string;
  jobDescription: string;
  requiredSkills: SelectedSkill[];
  ticketId: string;
}

interface AdminPostJobFormSectionProps {
  onSubmit?: (formData: JobFormData) => void;
}

export function AdminPostJobFormSection({ onSubmit }: AdminPostJobFormSectionProps) {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    companyName: '',
    companyWebsite: '',
    jobType: '',
    salary: '',
    jobCategory: '',
    companyEmail: '',
    location: '',
    jobTags: '',
    experience: '',
    jobDescription: '',
    requiredSkills: [],
    ticketId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (skills: SelectedSkill[]) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: skills
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark[800] }}>
            Completa la Información del Trabajo
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Ticket ID (Oculto para admin) */}
            <div style={{ display: 'none' }}>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                Ticket ID
              </label>
              <input
                type="text"
                name="ticketId"
                value={formData.ticketId}
                onChange={handleInputChange}
                placeholder="Ticket ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Título del Trabajo
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Título del trabajo o palabra clave"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Sitio Web de la Empresa (Opcional)
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="ej. www.nombreempresa.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Tipo de Trabajo
                  </label>
                  <div className="relative">
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600"
                    >
                      <option value="">Tipo de Trabajo</option>
                      <option value="full-time">Tiempo Completo</option>
                      <option value="part-time">Medio Tiempo</option>
                      <option value="contract">Contrato</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Práctica</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5" style={{ color: colors.gray[600] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Salario (Opcional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="ej. $20,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Job Category */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Categoría del Trabajo
                  </label>
                  <div className="relative">
                    <select
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600"
                    >
                      <option value="">Categoría</option>
                      <option value="technology">Tecnología</option>
                      <option value="design">Diseño</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Ventas</option>
                      <option value="finance">Finanzas</option>
                      <option value="hr">Recursos Humanos</option>
                      <option value="operations">Operaciones</option>
                      <option value="other">Otro</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5" style={{ color: colors.gray[600] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Company Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Correo de la Empresa
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    placeholder="ej. hola@empresa.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="ej. Londres"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Job Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Etiquetas del Trabajo
                  </label>
                  <input
                    type="text"
                    name="jobTags"
                    value={formData.jobTags}
                    onChange={handleInputChange}
                    placeholder="ej. diseño web, diseño gráfico, edición de video"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Experiencia
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="ej. 1 año"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                Descripción del Trabajo
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Descripción del trabajo"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-y text-gray-900 placeholder-gray-600"
              />
            </div>

            {/* Required Skills */}
            <div className="border-t border-gray-200 pt-6">
              <AdminJobSkillsSelector
                selectedSkills={formData.requiredSkills}
                onSkillsChange={handleSkillsChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.mainGreen }}
              >
                Publicar Trabajo
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

