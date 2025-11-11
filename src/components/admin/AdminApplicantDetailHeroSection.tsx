import { colors } from '@/lib/colors';
import Link from 'next/link';

interface AdminApplicantDetailHeroSectionProps {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  applicantName?: string | null;
  jobTitle?: string | null;
}

export const AdminApplicantDetailHeroSection = ({
  breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Candidatos', href: '/admin/applicants' },
    { label: 'Detalle del Candidato' },
  ],
  applicantName = null,
  jobTitle = null,
}: AdminApplicantDetailHeroSectionProps) => {
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
            {applicantName ? `Detalle de ${applicantName}` : 'Detalle del Candidato'}
          </h1>
          {jobTitle && (
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Aplicando al puesto: <span className="font-semibold text-white">{jobTitle}</span>
            </p>
          )}
          <nav className="text-gray-300">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center text-sm sm:text-base">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-2">›</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

