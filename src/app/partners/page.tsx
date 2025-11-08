import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, CompaniesHeroSection, TopCompaniesSection } from '@/components';
import { colorClasses } from '@/lib/colors';

export default function CompaniesPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />

      {/* Hero Section */}
      <CompaniesHeroSection />
      <TopCompaniesSection enableClientFetch />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
