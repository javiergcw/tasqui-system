'use client';

import { useState, useEffect, useRef } from 'react';
import { colors } from '@/lib/colors';
import type { AdminJob } from '@/models/admin/job.model';
import { formatSalary } from '@/utils/format';
import type { ExperienceLevel, JobTag } from '@/models/master/job-master-data-complete.model';

interface AdminEditJobFormSectionProps {
  job?: AdminJob | null;
  isLoading?: boolean;
  error?: string | null;
  experienceLevels?: ExperienceLevel[];
  jobTags?: JobTag[];
  isLoadingMasterData?: boolean;
}

// Mapear job_type a formato del formulario
const mapJobTypeToForm = (jobType: string): string => {
  const jobTypeMap: Record<string, string> = {
    'FULL_TIME': 'full-time',
    'PART_TIME': 'part-time',
    'CONTRACT': 'contract',
    'TEMPORARY': 'contract',
    'INTERNSHIP': 'internship',
    'FREELANCE': 'freelance',
  };
  return jobTypeMap[jobType] || '';
};

export function AdminEditJobFormSection({ 
  job, 
  isLoading = false, 
  error = null,
  experienceLevels = [],
  jobTags = [],
  isLoadingMasterData = false
}: AdminEditJobFormSectionProps) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyWebsite: '',
    jobType: '',
    salary: '',
    jobCategory: '',
    companyEmail: '',
    location: '',
    jobTags: [] as string[],
    experience: '',
    jobDescription: ''
  });

  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagInputRef.current &&
        tagDropdownRef.current &&
        !tagInputRef.current.contains(event.target as Node) &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cargar datos del job cuando esté disponible
  useEffect(() => {
    if (job) {
      const salaryText = job.salary_min && job.salary_max
        ? formatSalary(job.salary_min, job.salary_max, job.currency || 'COP')
        : '';
      
      // Intentar obtener tags del job (si vienen en el response)
      const jobTagsArray: string[] = (job as any).tags || [];
      
      setFormData({
        jobTitle: job.title || '',
        companyName: '', // El job no tiene company name directamente
        companyWebsite: '',
        jobType: mapJobTypeToForm(job.job_type || ''),
        salary: salaryText,
        jobCategory: job.category_id || '',
        companyEmail: '',
        location: job.location || '',
        jobTags: jobTagsArray,
        experience: job.experience_level || '',
        jobDescription: job.description || ''
      });
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (tagId: string) => {
    if (!formData.jobTags.includes(tagId)) {
      setFormData(prev => ({
        ...prev,
        jobTags: [...prev.jobTags, tagId]
      }));
    }
    setTagSearchTerm('');
    setShowTagDropdown(false);
  };

  const handleRemoveTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      jobTags: prev.jobTags.filter(id => id !== tagId)
    }));
  };

  // Filtrar tags basado en el término de búsqueda
  const filteredTags = jobTags.filter(tag =>
    tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase()) &&
    !formData.jobTags.includes(tag.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job updated:', formData);
    // TODO: Implementar lógica para actualizar el job
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Cargando trabajo...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center py-12">
              <div className="text-red-600 text-lg mb-2">Error al cargar el trabajo</div>
              <div className="text-gray-500 text-sm">{error}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark[800] }}>
            Editar Información del Trabajo
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
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
                  <div className="relative">
                    <input
                      ref={tagInputRef}
                      type="text"
                      value={tagSearchTerm}
                      onChange={(e) => {
                        setTagSearchTerm(e.target.value);
                        setShowTagDropdown(true);
                      }}
                      onFocus={() => setShowTagDropdown(true)}
                      placeholder="Buscar etiquetas..."
                      disabled={isLoadingMasterData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    {showTagDropdown && tagSearchTerm && filteredTags.length > 0 && (
                      <div ref={tagDropdownRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredTags.slice(0, 10).map((tag) => (
                          <div
                            key={tag.id}
                            onClick={() => handleAddTag(tag.id)}
                            className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{tag.name}</div>
                            {tag.description && (
                              <div className="text-sm text-gray-500">{tag.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Selected Tags */}
                  {formData.jobTags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.jobTags.map((tagId) => {
                        const tag = jobTags.find(t => t.id === tagId);
                        if (!tag) return null;
                        return (
                          <span
                            key={tagId}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: colors.mainGreen }}
                          >
                            {tag.name}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tagId)}
                              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20 focus:outline-none"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Experiencia
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={isLoadingMasterData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Nivel de Experiencia</option>
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} {level.years ? `(${level.years})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5" style={{ color: colors.gray[600] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="submit"
                className="px-12 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.mainGreen }}
              >
                Actualizar Trabajo
              </button>
              <button
                type="button"
                className="px-12 py-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

