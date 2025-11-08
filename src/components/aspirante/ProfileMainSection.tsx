'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { colorClasses } from '@/lib/colors';
import { DatosPersonales } from './DatosPersonales';
import { FormacionAcademica } from './FormacionAcademica';
import { ExperienciaLaboral } from './ExperienciaLaboral';
import { VacantesAplicadas } from './VacantesAplicadas';
import { EntrevistasProgramadas } from './EntrevistasProgramadas';
import { SkillsSection } from './SkillsSection';
import type { SkillsSelectionPayload } from './SkillsSection';
import { colors } from '@/lib/colors';
import type { EmployeeProfile } from '@/models';
import type { EmployeeEducation } from '@/models/employee/education.model';
import type {
  CreateEmployeeEducationRequest,
  UpdateEmployeeEducationRequest,
} from '@/models/employee/education.model';
import type { EmployeeExperience } from '@/models/employee/experience.model';
import type {
  CreateEmployeeExperienceRequest,
  UpdateEmployeeExperienceRequest,
} from '@/models/employee/experience.model';
import type { UpdateEmployeeProfileRequest } from '@/models/employee/profile.model';
import type { SkillCategory } from '@/models/master/skills-complete.model';

interface ProfileMainSectionProps {
  profile?: EmployeeProfile | null;
  isLoading?: boolean;
  onUpdateProfile?: (data: UpdateEmployeeProfileRequest) => Promise<EmployeeProfile>;
  isUpdatingProfile?: boolean;
  educations?: EmployeeEducation[];
  isLoadingEducations?: boolean;
  onCreateEducation?: (data: CreateEmployeeEducationRequest) => Promise<EmployeeEducation>;
  onUpdateEducation?: (id: string, data: UpdateEmployeeEducationRequest) => Promise<EmployeeEducation>;
  onDeleteEducation?: (id: string) => Promise<void>;
  isSavingEducation?: boolean;
  experiences?: EmployeeExperience[];
  isLoadingExperiences?: boolean;
  onCreateExperience?: (data: CreateEmployeeExperienceRequest) => Promise<EmployeeExperience>;
  onUpdateExperience?: (id: string, data: UpdateEmployeeExperienceRequest) => Promise<EmployeeExperience>;
  onDeleteExperience?: (id: string) => Promise<void>;
  isSavingExperience?: boolean;
  skillCategories?: SkillCategory[];
  isLoadingSkills?: boolean;
  onSaveSkills?: (selection: SkillsSelectionPayload) => Promise<void> | void;
  isSavingSkills?: boolean;
  savedSkills?: SkillsSelectionPayload | null;
  onRemoveSkillCategory?: (categoryId: string) => Promise<void> | void;
  onRemoveSkillSubcategory?: (categoryId: string, subCategoryId: string) => Promise<void> | void;
  removingSkill?: { categoryId: string; subCategoryId?: string } | null;
}

export const ProfileMainSection: React.FC<ProfileMainSectionProps> = ({ 
  profile, 
  isLoading = false,
  onUpdateProfile,
  isUpdatingProfile = false,
  educations,
  isLoadingEducations = false,
  onCreateEducation,
  onUpdateEducation,
  onDeleteEducation,
  isSavingEducation = false,
  experiences,
  isLoadingExperiences = false,
  onCreateExperience,
  onUpdateExperience,
  onDeleteExperience,
  isSavingExperience = false,
  skillCategories,
  isLoadingSkills = false,
  onSaveSkills,
  isSavingSkills,
  savedSkills,
  onRemoveSkillCategory,
  onRemoveSkillSubcategory,
  removingSkill,
}) => {
  const [activeTab, setActiveTab] = useState('datos-personales');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'datos-personales':
        return <DatosPersonales profile={profile} onUpdateProfile={onUpdateProfile} isUpdatingProfile={isUpdatingProfile} />;
      case 'formacion-academica':
        return (
          <FormacionAcademica
            educations={educations}
            isLoading={isLoadingEducations}
            isSaving={isSavingEducation}
            onCreateEducation={onCreateEducation}
            onUpdateEducation={onUpdateEducation}
            onDeleteEducation={onDeleteEducation}
          />
        );
      case 'experiencia-laboral':
        return (
          <ExperienciaLaboral
            experiences={experiences}
            isLoading={isLoadingExperiences}
            isSaving={isSavingExperience}
            onCreateExperience={onCreateExperience}
            onUpdateExperience={onUpdateExperience}
            onDeleteExperience={onDeleteExperience}
          />
        );
      case 'vacantes-aplicadas':
        return <VacantesAplicadas />;
      case 'entrevistas-programadas':
        return <EntrevistasProgramadas />;
      case 'skills':
        return (
          <SkillsSection
            categories={skillCategories}
            isLoading={isLoadingSkills}
            onSaveSkills={onSaveSkills}
            isSaving={isSavingSkills}
            savedSkills={savedSkills}
            onRemoveCategory={onRemoveSkillCategory}
            onRemoveSubcategory={onRemoveSkillSubcategory}
            removingSkill={removingSkill}
          />
        );
      default:
        return (
          <DatosPersonales
            profile={profile}
            onUpdateProfile={onUpdateProfile}
            isUpdatingProfile={isUpdatingProfile}
          />
        );
    }
  };

  return (
    <section className={`py-16 ${colorClasses.background.gray50}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Columna izquierda - Perfil y navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Perfil del usuario */}
              <div className="text-center mb-8 pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {profile ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      alt="Usuario"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <h3 className={`text-xl font-bold ${colorClasses.text.gray900} mb-2`}>
                  {isLoading ? 'Cargando...' : profile ? `${profile.first_name} ${profile.last_name}` : 'Usuario'}
                </h3>
                <p className={colorClasses.text.gray600}>
                  {profile?.headline || 'Profesional'}
                </p>
              </div>

              {/* Menú de navegación */}
              <nav className="w-full">
                {/* Datos Personales */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'datos-personales' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'datos-personales' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'datos-personales') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'datos-personales') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('datos-personales')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'datos-personales' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Datos Personales
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Formación Académica */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'formacion-academica' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'formacion-academica' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'formacion-academica') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'formacion-academica') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('formacion-academica')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'formacion-academica' ? 'text-white' : 'text-slate-800'}`}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                    Formación Académica
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Experiencia Laboral */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'experiencia-laboral' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'experiencia-laboral' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'experiencia-laboral') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'experiencia-laboral') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('experiencia-laboral')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'experiencia-laboral' ? 'text-white' : 'text-slate-800'}`}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                    Experiencia Laboral
                </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Vacantes Aplicadas */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'vacantes-aplicadas' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'vacantes-aplicadas' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'vacantes-aplicadas') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'vacantes-aplicadas') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('vacantes-aplicadas')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'vacantes-aplicadas' ? 'text-white' : 'text-slate-800'}`}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                    Mis Vacantes Aplicadas
                </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Skills */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'skills' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'skills' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'skills') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'skills') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('skills')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'skills' ? 'text-white' : 'text-slate-800'}`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Habilidades y Tecnologías
                  </div>
                </div>

                <div className={`w-full border-t border-dashed ${colorClasses.border.gray200}`}></div>

                {/* Entrevistas Programadas */}
                <div 
                  className={`w-full flex items-center py-3 cursor-pointer transition-colors ${
                    activeTab === 'entrevistas-programadas' 
                      ? 'border border-dashed rounded-md' 
                      : 'text-slate-800'
                  }`}
                  style={activeTab === 'entrevistas-programadas' ? { backgroundColor: colors.mainGreen } : {}}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'entrevistas-programadas') {
                      e.currentTarget.style.backgroundColor = colors.mainGreen;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'entrevistas-programadas') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '';
                    }
                  }}
                  onClick={() => setActiveTab('entrevistas-programadas')}
                >
                  <div className={`flex items-center px-4 ${activeTab === 'entrevistas-programadas' ? 'text-white' : 'text-slate-800'}`}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                    Entrevistas Programadas
                </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Columna derecha - Contenido dinámico */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

