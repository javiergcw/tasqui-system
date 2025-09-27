'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ApplicantDetailHeroSection } from '@/components/employer/ApplicantDetailHeroSection';
import { ApplicantDetailMainSection } from '@/components/employer/ApplicantDetailMainSection';
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
        <ApplicantDetailHeroSection />
        <ApplicantDetailMainSection applicantId={params.id} />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
