import Link from 'next/link';
import { colors } from '@/lib/colors';

interface AdminJobDetailHeroSectionProps {
  jobTitle?: string;
}

export function AdminJobDetailHeroSection({ jobTitle }: AdminJobDetailHeroSectionProps) {
  return (
    <section 
      className="relative py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.ctaGreen} 0%, ${colors.heroGreen} 50%, ${colors.ctaGreen} 100%)`
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {jobTitle || 'Detalles del Trabajo'}
          </h1>
          
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center space-x-2 text-gray-300">
            <Link 
              href="/" 
              className="hover:text-white transition-colors duration-200"
            >
              Inicio
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link 
              href="/admin/my-jobs" 
              className="hover:text-white transition-colors duration-200"
            >
              Mis Trabajos
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-white">Detalles del Trabajo</span>
          </nav>
        </div>
      </div>
    </section>
  );
}

