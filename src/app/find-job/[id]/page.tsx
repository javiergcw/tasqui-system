import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobDetailHeroSection, JobDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  // TODO: Usar params.id para obtener el trabajo específico
  console.log('Job ID:', params.id);
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
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
