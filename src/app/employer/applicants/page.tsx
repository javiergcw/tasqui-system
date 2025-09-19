'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ApplicantsHeroSection } from '@/components/employer/ApplicantsHeroSection';
import { ApplicantsSection } from '@/components/employer/ApplicantsSection';
import { colorClasses } from '@/lib/colors';

export default function ApplicantsPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <ApplicantsHeroSection />
        <ApplicantsSection />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
