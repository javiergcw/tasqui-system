import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, BlogDetailHeroSection, BlogDetailMainSection } from '@/components';

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />

      {/* Hero Section */}
      <BlogDetailHeroSection />

      {/* Main Content Section */}
      <BlogDetailMainSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
