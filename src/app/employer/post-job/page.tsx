import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, PostJobHeroSection, PostJobFormSection } from '@/components';
import { colorClasses } from '@/lib/colors';

export default function PostJobPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <PostJobHeroSection />

      {/* Job Form Section */}
      <PostJobFormSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
