'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminApplicantsHeroSection } from '@/components/admin/AdminApplicantsHeroSection';
import { AdminApplicantsSection } from '@/components/admin/AdminApplicantsSection';
import { colorClasses } from '@/lib/colors';

export default function AdminApplicantsPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <AdminApplicantsHeroSection />
        <AdminApplicantsSection />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
