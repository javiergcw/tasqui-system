import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, AdminEditJobHeroSection, AdminEditJobFormSection } from '@/components';
import { colorClasses } from '@/lib/colors';

interface AdminEditJobPageProps {
  params: {
    id: string;
  };
}

export default function AdminEditJobPage({ params }: AdminEditJobPageProps) {
  // TODO: Usar params.id para obtener el trabajo específico y cargar los datos en el formulario
  console.log('Admin Edit Job ID:', params.id);
  
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <AdminEditJobHeroSection />

      {/* Job Form Section - Pre-populated with existing data */}
      <AdminEditJobFormSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
