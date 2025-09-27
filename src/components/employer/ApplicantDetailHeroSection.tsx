import { colors } from '@/lib/colors';
import Link from 'next/link';

export const ApplicantDetailHeroSection = () => {
  return (
    <section 
      className="py-16 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.heroGreen} 0%, ${colors.ctaGreen} 50%, ${colors.heroGreen} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detalle del Candidato
          </h1>
          <nav className="text-gray-300">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/company/applicants" className="text-gray-400 hover:text-white transition-colors">Applicants</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Detalle del Candidato</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
