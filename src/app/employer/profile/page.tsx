import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { EmployerProfileHeroSection } from '@/components/employer/EmployerProfileHeroSection';
import { EmployerProfileMainSection } from '@/components/employer/EmployerProfileMainSection';
import { colorClasses } from '@/lib/colors';

export default function EmployerProfilePage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <EmployerProfileHeroSection />
        <EmployerProfileMainSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
