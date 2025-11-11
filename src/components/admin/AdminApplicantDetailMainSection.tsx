'use client';
import { AdminApplicantInfoCard } from './AdminApplicantInfoCard';
import { AdminAboutMeCard } from './AdminAboutMeCard';
import { AdminEducationCard } from './AdminEducationCard';
import { AdminExperienceCard } from './AdminExperienceCard';
import { AdminSkillsCard } from './AdminSkillsCard';
import { AdminActionButtonsCard } from './AdminActionButtonsCard';
import type {
  AdminJobApplication,
  JobApplicationStatus,
} from '@/models/admin/job-applicants.model';

interface AdminApplicantDetailMainSectionProps {
  application: AdminJobApplication | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
  updateError: string | null;
  onUpdateStatus: (status: JobApplicationStatus) => Promise<boolean> | boolean;
}

export const AdminApplicantDetailMainSection = ({
  application,
  isLoading,
  error,
  isUpdating,
  updateError,
  onUpdateStatus,
}: AdminApplicantDetailMainSectionProps) => {
  const applicant = application?.applicant;
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información del candidato */}
          <div className="lg:col-span-1 space-y-6">
            <AdminApplicantInfoCard
              application={application}
              isLoading={isLoading}
              error={error}
            />
            <AdminActionButtonsCard
              currentStatus={application?.status ?? null}
              isUpdating={isUpdating}
              error={updateError}
              onUpdateStatus={onUpdateStatus}
            />
          </div>

          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            <AdminAboutMeCard />
            <AdminEducationCard />
            <AdminExperienceCard />
            <AdminSkillsCard skills={applicant?.skills ?? null} />
          </div>
        </div>
      </div>
    </section>
  );
};

