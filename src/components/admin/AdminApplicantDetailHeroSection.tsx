import { colors } from '@/lib/colors';
import Link from 'next/link';

export const AdminApplicantDetailHeroSection = () => {
  return (
    <section 
      className="relative py-16 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.ctaGreen} 0%, ${colors.heroGreen} 50%, ${colors.ctaGreen} 100%)`
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detalle del Candidato
          </h1>
          <nav className="text-gray-300">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href="/admin/applicants" className="text-gray-400 hover:text-white transition-colors">Candidatos</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Detalle del Candidato</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

