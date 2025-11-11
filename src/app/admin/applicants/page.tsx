'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminApplicantsHeroSection } from '@/components/admin/AdminApplicantsHeroSection';
import {
  AdminApplicantsSection,
  type AdminApplicantCard,
} from '@/components/admin/AdminApplicantsSection';
import { colorClasses } from '@/lib/colors';
import { getJobApplicantsUseCase } from '@/use-cases';
import type { AdminJobApplication } from '@/models/admin/job-applicants.model';

const statusToStage: Record<string, AdminApplicantCard['stage']> = {
  APPLIED: 'pending',
  SHORTLISTED: 'reviewed',
  INTERVIEW: 'interviewed',
  OFFERED: 'reviewed',
  REJECTED: 'rejected',
  WITHDRAWN: 'rejected',
  HIRED: 'hired',
};

const mapApplicationToCard = (
  application: AdminJobApplication
): AdminApplicantCard => ({
  id: application.id,
  jobId: application.job_id,
  name: application.employee_profile_id || 'Candidato',
  title: application.job?.title || 'Sin título',
  image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
    application.employee_profile_id || 'Candidato'
  )}&background=0D8ABC&color=fff&size=300`,
  rating: 4,
  stage: statusToStage[application.status] || 'pending',
  status: application.status,
  skills: application.job?.category?.name
    ? [application.job.category.name]
    : [],
  social: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
  },
});

function AdminApplicantsPageContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('jobId') ?? '';
  const [applicants, setApplicants] = useState<AdminApplicantCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) {
        setApplicants([]);
        setError('El ID del trabajo es requerido para ver los candidatos.');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await getJobApplicantsUseCase.execute(jobId);
        const mappedApplicants = data.job_applications.map(mapApplicationToCard);
        setApplicants(mappedApplicants);
      } catch (err) {
        console.error('Error fetching job applicants:', err);
        setApplicants([]);
        setError(
          err instanceof Error
            ? err.message
            : 'Error al obtener los candidatos del trabajo.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <AdminApplicantsHeroSection />
        <AdminApplicantsSection
          applicants={applicants}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}

export default function AdminApplicantsPage() {
  return (
    <Suspense
      fallback={
        <div className={`min-h-screen ${colorClasses.background.gray50}`}>
          <Sidebar />
          <main>
            <AdminApplicantsHeroSection />
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <p className="mt-4 text-gray-600">Cargando candidatos...</p>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <CopyrightSection />
          <ScrollToTopButton />
        </div>
      }
    >
      <AdminApplicantsPageContent />
    </Suspense>
  );
}
