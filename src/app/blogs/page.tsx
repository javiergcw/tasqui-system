import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, BlogsHeroSection, BlogsSection } from '@/components';
import { colorClasses } from '@/lib/colors';

export default function BlogsPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar />
      
      {/* Hero Section */}
      <BlogsHeroSection />
      
      {/* Blogs Section */}
      <BlogsSection />
      
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
