'use client';
import { AdminApplicantInfoCard } from './AdminApplicantInfoCard';
import { AdminAboutMeCard } from './AdminAboutMeCard';
import { AdminEducationCard } from './AdminEducationCard';
import { AdminExperienceCard } from './AdminExperienceCard';
import { AdminSkillsCard } from './AdminSkillsCard';
import { AdminActionButtonsCard } from './AdminActionButtonsCard';

interface AdminApplicantDetailMainSectionProps {
  applicantId: string;
}

export const AdminApplicantDetailMainSection = ({ applicantId }: AdminApplicantDetailMainSectionProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información del candidato */}
          <div className="lg:col-span-1">
            <AdminApplicantInfoCard applicantId={applicantId} />
          </div>
          
          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            <AdminAboutMeCard />
            <AdminEducationCard />
            <AdminExperienceCard />
            <AdminSkillsCard />
            <AdminActionButtonsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

