import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, EmployerEditJobHeroSection, EmployerEditJobFormSection } from '@/components';
import { colorClasses } from '@/lib/colors';

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default function EditJobPage({ params }: EditJobPageProps) {
  // TODO: Usar params.id para obtener el trabajo específico y cargar los datos en el formulario
  console.log('Edit Job ID:', params.id);
  
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <EmployerEditJobHeroSection />

      {/* Job Form Section - Pre-populated with existing data */}
      <EmployerEditJobFormSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
