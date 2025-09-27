'use client';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { LoginHeroSection } from '@/components/auth/LoginHeroSection';
import { LoginForm } from '@/components/auth/LoginForm';
import { colorClasses } from '@/lib/colors';

export default function LoginPage() {
  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <LoginHeroSection />
        <LoginForm />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}
