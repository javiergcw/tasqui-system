import { Sidebar, HeroSection, FeaturesSection, CategorySection, JobsSection, TopCompaniesSection, StatsSection, TestimonialsSection, NewsSection, CallToActionSection, Footer, CopyrightSection, ScrollToTopButton } from '@/components';

export default function Home() {
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
      <JobsSection />
      <TopCompaniesSection enableClientFetch />

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
