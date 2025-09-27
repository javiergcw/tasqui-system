'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ApplicantsHeroSection } from '@/components/employer/ApplicantsHeroSection';
import { CompanyApplicantsSection } from '@/components/employer/CompanyApplicantsSection';
import { colorClasses } from '@/lib/colors';

export default function ApplicantsPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <ApplicantsHeroSection />
        <CompanyApplicantsSection />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
