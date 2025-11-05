'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminApplicantDetailHeroSection } from '@/components/admin/AdminApplicantDetailHeroSection';
import { AdminApplicantDetailMainSection } from '@/components/admin/AdminApplicantDetailMainSection';
import { colorClasses } from '@/lib/colors';

interface AdminApplicantDetailPageProps {
  params: {
    id: string;
  };
}

export default function AdminApplicantDetailPage({ params }: AdminApplicantDetailPageProps) {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <AdminApplicantDetailHeroSection />
        <AdminApplicantDetailMainSection applicantId={params.id} />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
