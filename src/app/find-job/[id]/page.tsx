import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobDetailHeroSection, JobDetailMainSection } from '@/components';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      {/* Hero Section */}
      <JobDetailHeroSection />
      
      {/* Main Content Section */}
      <JobDetailMainSection />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
