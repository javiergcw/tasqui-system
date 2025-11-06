'use client';
import React from 'react';
import { CompanyCard } from '../CompanyCard';
import { colors, colorClasses } from '@/lib/colors';
import type { PublicCompanyProfile } from '@/models/public-web/public-companies.model';

interface TopCompaniesSectionProps {
  companies?: PublicCompanyProfile[];
  isLoading?: boolean;
  error?: string | null;
}

// Función para generar logo con inicial
const generateCompanyLogo = (companyName: string, index: number): React.ReactNode => {
  const initial = companyName.charAt(0).toUpperCase();
  
  // Alternar entre diferentes estilos de logo
  const logoStyles = [
    // Estilo 1: Color verde sólido
    () => (
      <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: colors.mainGreen }}>
        <span className="text-2xl font-bold text-white">{initial}</span>
      </div>
    ),
    // Estilo 2: Gradiente púrpura-naranja
    () => (
      <div className={`w-12 h-12 ${colorClasses.gradient.purpleOrange} rounded flex items-center justify-center`}>
        <span className="text-2xl font-bold text-white">{initial}</span>
      </div>
    ),
    // Estilo 3: Color naranja sólido
    () => (
      <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: colors.orange[500] }}>
        <span className="text-2xl font-bold text-white">{initial}</span>
      </div>
    ),
    // Estilo 4: Gradiente verde-azul
    () => (
      <div className={`w-12 h-12 ${colorClasses.gradient.greenBlue} rounded flex items-center justify-center`}>
        <span className="text-2xl font-bold text-white">{initial}</span>
      </div>
    ),
  ];
  
  const LogoComponent = logoStyles[index % logoStyles.length];
  return <LogoComponent />;
};

export const TopCompaniesSection: React.FC<TopCompaniesSectionProps> = ({ 
  companies = [], 
  isLoading = false,
  error = null 
}) => {
  // Datos por defecto si no hay empresas cargadas
  const defaultCompanies = [
    {
      logo: (
        <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: colors.mainGreen }}>
          <span className="text-2xl font-bold text-white">B</span>
        </div>
      ),
      companyName: "Bancolombia",
      location: "Bogotá, Colombia",
      openPositions: 25
    },
    {
      logo: (
        <div className={`w-12 h-12 ${colorClasses.gradient.purpleOrange} rounded flex items-center justify-center`}>
          <span className="text-2xl font-bold text-white">E</span>
        </div>
      ),
      companyName: "Éxito S.A.",
      location: "Medellín, Colombia",
      openPositions: 35
    },
    {
      logo: (
        <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: colors.orange[500] }}>
          <span className="text-2xl font-bold text-white">A</span>
        </div>
      ),
      companyName: "Avianca",
      location: "Bogotá, Colombia",
      openPositions: 20
    },
    {
      logo: (
        <div className={`w-12 h-12 ${colorClasses.gradient.greenBlue} rounded flex items-center justify-center`}>
          <span className="text-2xl font-bold text-white">S</span>
        </div>
      ),
      companyName: "Sura",
      location: "Medellín, Colombia",
      openPositions: 45
    }
  ];

  // Mapear empresas de la API al formato esperado
  const mappedCompanies = companies.length > 0 
    ? companies.map((company, index) => ({
        logo: generateCompanyLogo(company.legal_name, index),
        companyName: company.legal_name,
        location: "Colombia", // Valor por defecto ya que la API no incluye ubicación
        openPositions: company.max_open_jobs
      }))
    : defaultCompanies;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            Empresas Destacadas
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce las empresas líderes que confían en Tasqui para encontrar el mejor talento. Estas organizaciones están buscando profesionales comprometidos y apasionados para formar parte de sus equipos.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando empresas...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mappedCompanies.map((company, index) => (
              <CompanyCard
                key={companies.length > 0 ? companies[index]?.id || index : index}
                logo={company.logo}
                companyName={company.companyName}
                location={company.location}
                openPositions={company.openPositions}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
