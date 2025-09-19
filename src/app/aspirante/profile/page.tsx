import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { ProfileHeroSection } from '@/components/aspirante/ProfileHeroSection';
import { ProfileMainSection } from '@/components/aspirante/ProfileMainSection';
import { colorClasses, colors } from '@/lib/colors';

export default function ProfilePage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
   
        <ProfileHeroSection />
        <ProfileMainSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
