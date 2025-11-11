interface AdminSkillsCardProps {
  skills?: string[] | null;
}

const normalizeSkill = (skill: string) => {
  if (typeof skill !== 'string') return '';
  return skill
    .replace(/^Habilidades\s+Hard\s*\(([^)]+)\)\s*/i, '')
    .replace(/^Habilidades\s+Soft\s*\(([^)]+)\)\s*/i, '')
    .trim();
};

const isSoftSkill = (skill: string) =>
  /bland|soft|comportamental|transversal|liderazgo|comunicación|social/i.test(skill);

export const AdminSkillsCard = ({ skills }: AdminSkillsCardProps) => {
  const parsedSkills = Array.isArray(skills)
    ? skills
        .map(normalizeSkill)
        .map((skill) =>
          skill
            .replace(/^-(\s*)/, '')
            .replace(/^\*\s*/, '')
            .trim()
        )
        .filter(Boolean)
    : [];

  const hardSkills = parsedSkills.filter((skill) => !isSoftSkill(skill));
  const softSkills = parsedSkills.filter(isSoftSkill);

  const fallbackHard = hardSkills.length === 0;
  const fallbackSoft = softSkills.length === 0;

  const chipStyles =
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Perfil profesional</p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Mapa de habilidades</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-xl border border-gray-100 bg-gradient-to-br from-green-50 to-white p-5">
          <header className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Habilidades Técnicas</h4>
              <p className="text-sm text-gray-500">Hard skills y conocimientos especializados</p>
            </div>
          </header>

          <div className="flex flex-wrap gap-2">
            {fallbackHard ? (
              <span className={`${chipStyles} bg-gray-100 text-gray-500 border border-gray-200`}>
                Sin habilidades técnicas registradas
              </span>
            ) : (
              hardSkills.map((skill, index) => (
                <span
                  key={`hard-${index}`}
                  className={`${chipStyles} bg-green-100 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white`}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                  </svg>
                  {skill}
                </span>
              ))
            )}
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-5">
          <header className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 11c0-1.38-1.12-2.5-2.5-2.5S7 9.62 7 11s1.12 2.5 2.5 2.5S12 12.38 12 11zm0 0c0 1.38 1.12 2.5 2.5 2.5S17 12.38 17 11s-1.12-2.5-2.5-2.5S12 9.62 12 11zm-6 4.5c1.5-1 3.5-1.5 5.5-1.5s4 .5 5.5 1.5"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Habilidades Blandas</h4>
              <p className="text-sm text-gray-500">Soft skills y competencias conductuales</p>
            </div>
          </header>

          <div className="flex flex-wrap gap-2">
            {fallbackSoft ? (
              <span className={`${chipStyles} bg-gray-100 text-gray-500 border border-gray-200`}>
                Sin habilidades blandas registradas
              </span>
            ) : (
              softSkills.map((skill, index) => (
                <span
                  key={`soft-${index}`}
                  className={`${chipStyles} bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13V7m12 6V7M7 13V7m6 6V7" />
                  </svg>
                  {skill}
                </span>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

