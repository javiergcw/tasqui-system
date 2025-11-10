import { Sidebar, HeroSection, FeaturesSection, CategorySection, JobsSection, TopCompaniesSection, StatsSection, TestimonialsSection, NewsSection, CallToActionSection, Footer, CopyrightSection, ScrollToTopButton } from '@/components';
import publicCompaniesUseCase from '@/use-cases/public-web/public-companies.use-case';
import publicJobsUseCase from '@/use-cases/public-web/public-jobs.use-case';
import type { PublicCompanyProfile } from '@/models/public-web/public-companies.model';
import type { PublicJob } from '@/models/public-web/public-jobs.model';

export default async function Home() {
  let companies: PublicCompanyProfile[] = [];
  let error: string | null = null;
  let jobs: PublicJob[] = [];
  let jobsError: string | null = null;

  try {
    const response = await publicCompaniesUseCase.execute();
    companies = response?.data?.company_profiles ?? [];
  } catch (err) {
    console.error('Error al obtener empresas destacadas:', err);
    error = 'No fue posible cargar las empresas destacadas';
  }

  try {
    const jobsResponse = await publicJobsUseCase.execute();
    jobs = jobsResponse?.data?.jobs ?? [];
  } catch (err) {
    console.error('Error al obtener empleos públicos:', err);
    jobsError = 'No fue posible cargar los empleos disponibles';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      <div className="relative">
        <HeroSection />
      </div>
{/*       <div className="relative -mt-12 translate-y-12 z-30">
        <SearchBarSection />
      </div> */}


      <FeaturesSection />
      <CategorySection />
      <JobsSection jobs={jobs} error={jobsError} />
      <TopCompaniesSection companies={companies} error={error} />

      <CallToActionSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
