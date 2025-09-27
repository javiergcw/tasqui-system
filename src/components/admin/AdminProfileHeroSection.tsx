import Link from 'next/link';
import { colors } from '@/lib/colors';

export const AdminProfileHeroSection: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        background: `linear-gradient(135deg, ${colors.heroGreen} 0%, ${colors.ctaGreen} 50%, ${colors.heroGreen} 100%)`
      }}
    >
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: `${colors.ctaGreen}40` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Admin Profile
          </h1>
          
          <nav className="flex justify-center items-center space-x-2 text-white/80">
            <Link 
              href="/" 
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-white/60">&gt;</span>
            <span className="text-white">Admin Profile</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
