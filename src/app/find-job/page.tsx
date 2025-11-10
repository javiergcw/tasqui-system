import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobsHeroSection, JobsInterestedSection, JobNotificationsSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import publicJobsUseCase from '@/use-cases/public-web/public-jobs.use-case';
import publicNewsletterUseCase from '@/use-cases/public-web/public-newsletter.use-case';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

export default async function FindJobPage() {
  let jobs: PublicJob[] = [];
  let jobsError: string | null = null;

  try {
    const response = await publicJobsUseCase.execute();
    jobs = response?.data?.jobs ?? [];
  } catch (err) {
    console.error('Error al obtener empleos públicos:', err);
    jobsError = 'No fue posible cargar los empleos disponibles';
  }

  async function handleSubscribe(email: string): Promise<{ success: boolean; message: string }> {
    'use server';
    try {
      const response = await publicNewsletterUseCase.execute({ email });
      return {
        success: response.success,
        message: response.message ?? 'Suscripción completada.',
      };
    } catch (err) {
      console.error('Error al suscribirse al newsletter público:', err);
      return {
        success: false,
        message: 'No fue posible completar la suscripción.',
      };
    }
  }

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <JobsHeroSection />

      {/* Search Bar with Popular Jobs Category Section */}
    {/*   <SearchWithCategoriesSection /> */}

      {/* Jobs You May Be Interested In Section */}
      <JobsInterestedSection jobs={jobs} error={jobsError} />

      {/* Job Notifications Section */}
      <JobNotificationsSection onSubscribe={handleSubscribe} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}