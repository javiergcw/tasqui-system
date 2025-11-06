'use client';

import React, { useState } from 'react';
import { colors } from '@/lib/colors';
import { AdminJobSkillsSelector } from './AdminJobSkillsSelector';
import type { SkillCategory } from '@/models/master/skills-complete.model';
import type { JobCategory, JobTag, JobType, ExperienceLevel } from '@/models/master/job-master-data-complete.model';

interface SelectedSkill {
  categoryId: string;
  subCategoryId: string;
}

interface JobFormData {
  jobTitle: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  jobCategory: string;
  location: string;
  jobTags: string[];
  experience: string;
  jobDescription: string;
  requiredSkills: SelectedSkill[];
  ticketId: string;
}

interface AdminPostJobFormSectionProps {
  onSubmit?: (formData: JobFormData) => void;
  skillsCategories?: SkillCategory[];
  isLoadingSkills?: boolean;
  skillsError?: string | null;
  initialTicketId?: string;
  jobCategories?: JobCategory[];
  jobTags?: JobTag[];
  jobTypes?: JobType[];
  experienceLevels?: ExperienceLevel[];
  isLoadingMasterData?: boolean;
  masterDataError?: string | null;
  resetForm?: boolean;
  onResetComplete?: () => void;
}

export function AdminPostJobFormSection({ 
  onSubmit,
  skillsCategories = [],
  isLoadingSkills = false,
  skillsError = null,
  initialTicketId = '',
  jobCategories = [],
  jobTags = [],
  jobTypes = [],
  experienceLevels = [],
  isLoadingMasterData = false,
  masterDataError = null,
  resetForm = false,
  onResetComplete
}: AdminPostJobFormSectionProps) {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    jobCategory: '',
    location: '',
    jobTags: [],
    experience: '',
    jobDescription: '',
    requiredSkills: [],
    ticketId: initialTicketId
  });

  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagInputRef = React.useRef<HTMLInputElement>(null);
  const tagDropdownRef = React.useRef<HTMLDivElement>(null);

  // Actualizar ticketId cuando cambie initialTicketId
  React.useEffect(() => {
    if (initialTicketId) {
      setFormData(prev => ({
        ...prev,
        ticketId: initialTicketId
      }));
    }
  }, [initialTicketId]);

  // Cerrar dropdown al hacer clic fuera
  React.useEffect(() => {
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

  // Resetear formulario cuando resetForm sea true
  React.useEffect(() => {
    if (resetForm) {
      setFormData({
        jobTitle: '',
        jobType: '',
        salaryMin: '',
        salaryMax: '',
        jobCategory: '',
        location: '',
        jobTags: [],
        experience: '',
        jobDescription: '',
        requiredSkills: [],
        ticketId: initialTicketId
      });
      setTagSearchTerm('');
      setShowTagDropdown(false);
      if (onResetComplete) {
        onResetComplete();
      }
    }
  }, [resetForm, initialTicketId, onResetComplete]);

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

  const filteredTags = jobTags.filter(tag => 
    tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase()) &&
    !formData.jobTags.includes(tag.id)
  );

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
                      disabled={isLoadingMasterData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Tipo de Trabajo</option>
                      {jobTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
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

                {/* Salary Min */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Salario Mínimo (Opcional)
                  </label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                    placeholder="ej. 5000000"
                    min="0"
                    step="1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Salary Max */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Salario Máximo (Opcional)
                  </label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                    placeholder="ej. 8000000"
                    min="0"
                    step="1000"
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
                      disabled={isLoadingMasterData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Categoría</option>
                      {jobCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
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
                              className="ml-2 hover:text-gray-200"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {masterDataError && (
                    <p className="mt-1 text-sm text-red-600">{masterDataError}</p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Nivel de Experiencia
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={isLoadingMasterData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Nivel de Experiencia</option>
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} ({level.years})
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

            {/* Required Skills */}
            <div className="border-t border-gray-200 pt-6">
              <AdminJobSkillsSelector
                selectedSkills={formData.requiredSkills}
                onSkillsChange={handleSkillsChange}
                skillsCategories={skillsCategories}
                isLoadingSkills={isLoadingSkills}
                skillsError={skillsError}
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

