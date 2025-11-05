import Link from 'next/link';
import { colors } from '@/lib/colors';

export const EmployerProfileHeroSection: React.FC = () => {
  return (
    <section 
      className="relative py-16 md:py-24"
      style={{
        background: `linear-gradient(135deg, ${colors.dark[800]} 0%, ${colors.dark[900]} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Perfil de la Empresa
          </h1>
          <nav className="flex justify-center">
            <div className="flex items-center space-x-2 text-sm md:text-base">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Inicio
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-white font-medium">Perfil de la Empresa</span>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};
