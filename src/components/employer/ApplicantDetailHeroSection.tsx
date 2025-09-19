import { colors } from '@/lib/colors';

export const ApplicantDetailHeroSection = () => {
  return (
    <section 
      className="py-16 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.dark[800]} 0%, ${colors.dark[900]} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detalle del Candidato
          </h1>
          <nav className="text-gray-300">
            <span className="text-gray-400">Home</span>
            <span className="mx-2">›</span>
            <span className="text-gray-400">Applicants</span>
            <span className="mx-2">›</span>
            <span className="text-white">Detalle del Candidato</span>
          </nav>
        </div>
      </div>
    </section>
  );
};
