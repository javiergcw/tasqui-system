import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, EmployerJobDetailHeroSection, EmployerJobDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';

interface ViewJobPageProps {
  params: {
    id: string;
  };
}

export default function ViewJobPage({ params }: ViewJobPageProps) {
  // TODO: Usar params.id para obtener el trabajo específico
  console.log('View Job ID:', params.id);
  
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <EmployerJobDetailHeroSection />
      
      {/* Main Content Section */}
      <EmployerJobDetailMainSection />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
