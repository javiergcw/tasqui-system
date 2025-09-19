'use client';
import { ApplicantInfoCard } from './ApplicantInfoCard';
import { AboutMeCard } from './AboutMeCard';
import { EducationCard } from './EducationCard';
import { ExperienceCard } from './ExperienceCard';
import { SkillsCard } from './SkillsCard';
import { ActionButtonsCard } from './ActionButtonsCard';

interface ApplicantDetailMainSectionProps {
  applicantId: string;
}

export const ApplicantDetailMainSection = ({ applicantId }: ApplicantDetailMainSectionProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información del candidato */}
          <div className="lg:col-span-1">
            <ApplicantInfoCard applicantId={applicantId} />
          </div>
          
          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            <AboutMeCard />
            <EducationCard />
            <ExperienceCard />
            <SkillsCard />
            <ActionButtonsCard />
          </div>
        </div>
      </div>
    </section>
  );
};
