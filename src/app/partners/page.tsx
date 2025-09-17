import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, CompaniesHeroSection, TopCompaniesSection } from '@/components';

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />

      {/* Hero Section */}
      <CompaniesHeroSection />
      <TopCompaniesSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
