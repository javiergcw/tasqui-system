import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, BlogDetailHeroSection, BlogDetailMainSection } from '@/components';
import { colorClasses } from '@/lib/colors';

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // TODO: Usar params.id para obtener el blog específico
  console.log('Blog ID:', params.id);
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50} dark:from-gray-900 dark:to-gray-800`}>
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
