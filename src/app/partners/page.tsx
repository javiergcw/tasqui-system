import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, CompaniesHeroSection, TopCompaniesSection } from '@/components';
import { colorClasses } from '@/lib/colors';
import publicCompaniesUseCase from '@/use-cases/public-web/public-companies.use-case';
import type { PublicCompanyProfile } from '@/models/public-web/public-companies.model';

export default async function CompaniesPage() {
  let companies: PublicCompanyProfile[] = [];
  let error: string | null = null;

  try {
    const response = await publicCompaniesUseCase.execute();
    companies = response?.data?.company_profiles ?? [];
  } catch (err) {
    console.error('Error al obtener empresas destacadas:', err);
    error = 'No fue posible cargar las empresas destacadas';
  }

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />

      {/* Hero Section */}
      <CompaniesHeroSection />
      <TopCompaniesSection companies={companies} error={error} />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
