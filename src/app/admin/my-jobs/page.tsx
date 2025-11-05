import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, MyJobsHeroSection, AdminMyJobsSection } from '@/components';
import { colorClasses } from '@/lib/colors';

export default function AdminMyJobsPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <MyJobsHeroSection />

      {/* Admin My Jobs Section */}
      <AdminMyJobsSection />
    
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
