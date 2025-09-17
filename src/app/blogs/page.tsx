import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, BlogsHeroSection, BlogsSection } from '@/components';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
