'use client';

import { colors, colorClasses } from '@/lib/colors';
import type { AdminLeadDetailData, AdminLeadEducation, AdminLeadExperience, AdminLeadLanguage } from '@/models/admin/lead.model';

interface AdminLeadDetailMainSectionProps {
  lead?: AdminLeadDetailData | null;
  isLoading?: boolean;
  error?: string | null;
}

export const AdminLeadDetailMainSection = ({ lead, isLoading = false, error = null }: AdminLeadDetailMainSectionProps) => {
  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 text-gray-600">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
            <p>Cargando información del lead...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !lead) {
    return (
      <section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            {error || 'No fue posible obtener los datos del lead.'}
          </div>
        </div>
      </section>
    );
  }

  const { lead: leadInfo, educations, experiences, languages, resume, skills } = lead;

  const translateStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'NEW': 'Nuevo',
      'PENDING': 'Pendiente',
      'CONTACTED': 'Contactado',
      'QUALIFIED': 'Calificado',
      'UNQUALIFIED': 'No calificado',
      'CONVERTED': 'Convertido',
      'LOST': 'Perdido',
      'ACTIVE': 'Activo',
      'INACTIVE': 'Inactivo',
      'OPEN': 'Abierto',
      'CLOSED': 'Cerrado',
      'IN_PROGRESS': 'En Progreso',
    };
    return statusMap[status.toUpperCase()] || status;
  };

  const renderEducations = (items?: AdminLeadEducation[] | null) => {
    const safeItems = items ?? [];
    if (!safeItems.length) return <p className="text-sm text-gray-500">Sin registros educativos.</p>;

    return (
      <div className="space-y-4">
        {safeItems.map((education) => (
          <div key={education.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">{education.degree_name}</h4>
            <p className="text-sm text-gray-600">{education.institution_name}</p>
            <p className="mt-2 text-xs text-gray-500">
              {education.start_date ? new Date(education.start_date).toLocaleDateString() : 'Fecha inicio N/D'}
              {' - '}
              {education.end_date ? new Date(education.end_date).toLocaleDateString() : 'Actual'}
            </p>
            {education.description && (
              <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{education.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderExperiences = (items?: AdminLeadExperience[] | null) => {
    const safeItems = items ?? [];
    if (!safeItems.length) return <p className="text-sm text-gray-500">Sin registros de experiencia.</p>;

    return (
      <div className="space-y-4">
        {safeItems.map((experience) => (
          <div key={experience.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">{experience.job_title}</h4>
            <p className="text-sm text-gray-600">{experience.company_name}</p>
            <p className="mt-2 text-xs text-gray-500">
              {experience.start_date ? new Date(experience.start_date).toLocaleDateString() : 'Fecha inicio N/D'}
              {' - '}
              {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Actual'}
            </p>
            {experience.description && (
              <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{experience.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguages = (items?: AdminLeadLanguage[] | null) => {
    const safeItems = items ?? [];

    if (!safeItems.length) {
      return <p className="text-sm text-gray-500">Sin idiomas registrados.</p>;
    }

    return (
      <ul className="space-y-2">
        {safeItems.map((language, index) => (
          <li key={`${language.language_name}-${index}`} className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <span className="text-sm font-semibold text-gray-900">{language.language_name}</span>
            <span className="text-xs text-gray-500">
              {language.proficiency_level ? `Nivel: ${language.proficiency_level}` : 'Nivel no especificado'}
            </span>
            {language.certification && (
              <span className="text-xs text-gray-500">Certificación: {language.certification}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={`py-12 px-4 ${colorClasses.background.gray50}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna lateral */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información General</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">Nombre</p>
                  <p>{`${leadInfo.first_name ?? ''} ${leadInfo.last_name ?? ''}`.trim() || 'Sin nombre'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Correo</p>
                  <p>{leadInfo.email}</p>
                </div>
                {leadInfo.phone && (
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p>{leadInfo.phone}</p>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">Ubicación</p>
                  <p>{leadInfo.location || `${leadInfo.city ?? ''}, ${leadInfo.country ?? ''}`.trim() || 'No especificada'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Empresa</p>
                  <p>{leadInfo.company || 'No especificada'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Cargo</p>
                  <p>{leadInfo.job_title || 'No especificado'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Experiencia</p>
                  <p>{leadInfo.experience || 'No especificada'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fuente</p>
                  <p>{leadInfo.source || 'Desconocida'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Estado</p>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                    {translateStatus(leadInfo.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3 text-sm text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">Enlaces</h3>
              <div className="space-y-2">
                <LeadLink label="LinkedIn" url={leadInfo.linkedin_url} />
                <LeadLink label="GitHub" url={leadInfo.github_url} />
                <LeadLink label="Sitio web" url={leadInfo.website} />
              </div>
            </div>

            {resume && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-sm text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen Profesional</h3>
                <p className="text-sm text-gray-900 font-semibold">{resume.title}</p>
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{resume.summary}</p>
                <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                  <span>Visibilidad: {resume.visibility}</span>
                  <span>{resume.is_default ? 'CV principal' : 'CV alternativo'}</span>
                </div>
                {resume.file_url && (
                  <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white"
                    style={{ backgroundColor: colors.mainGreen }}
                  >
                    Ver documento
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Biografía</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {leadInfo.bio || 'Sin biografía disponible.'}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Educación</h3>
              {renderEducations(educations)}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experiencia</h3>
              {renderExperiences(experiences)}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2m-18 0l9 5 9-5" />
                </svg>
                Idiomas
              </h3>
              {renderLanguages(languages)}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Competencias</h3>
              {skills && (skills.categories.length || skills.subcategories.length) ? (
                <div className="space-y-4">
                  {skills.categories.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Categorías</h4>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {skills.categories.map((category, index) => (
                          <li key={`${category.category_id}-${index}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {category.category_id}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {skills.subcategories.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Subcategorías</h4>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {skills.subcategories.map((subcategory, index) => (
                          <div key={`${subcategory.subcategory_id}-${index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                            <p>ID: {subcategory.subcategory_id}</p>
                            <p>Nivel: {subcategory.level}</p>
                            <p>Años de experiencia: {subcategory.years_experience}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Sin competencias registradas.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface LeadLinkProps {
  label: string;
  url?: string | null;
}

const LeadLink = ({ label, url }: LeadLinkProps) => {
  const isAvailable = Boolean(url && url.trim().length);

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm text-sm text-gray-700">
      <span className="font-medium text-gray-900">{label}</span>
      {isAvailable ? (
        <a
          href={url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Ver perfil
        </a>
      ) : (
        <span className="text-xs text-gray-400">No disponible</span>
      )}
    </div>
  );
};


