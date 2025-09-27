import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminProfileHeroSection } from '@/components/admin/AdminProfileHeroSection';
import { AdminProfileMainSection } from '@/components/admin/AdminProfileMainSection';
import { colorClasses } from '@/lib/colors';

export default function AdminProfilePage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <AdminProfileHeroSection />
        <AdminProfileMainSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
