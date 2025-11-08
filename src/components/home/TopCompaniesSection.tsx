'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { CompanyCard } from '../CompanyCard';
import { colors, colorClasses } from '@/lib/colors';
import type { PublicCompanyProfile } from '@/models/public-web/public-companies.model';
import type { PublicCompaniesResponse } from '@/models/public-web/public-companies.model';
import { API_ROUTES } from '@/lib/api-routes';
import { API_CONFIG } from '@/lib/constants';

interface TopCompaniesSectionProps {
  companies?: PublicCompanyProfile[];
  isLoading?: boolean;
  error?: string | null;
  enableClientFetch?: boolean;
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
  error = null,
  enableClientFetch = false,
}) => {
  const [companyList, setCompanyList] = useState<PublicCompanyProfile[]>(companies);
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [fetchError, setFetchError] = useState<string | null>(error ?? null);

  useEffect(() => {
    setCompanyList(companies);
  }, [companies]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setFetchError(error ?? null);
  }, [error]);

  useEffect(() => {
    if (!enableClientFetch) {
      return;
    }

    let isMounted = true;

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const response = await fetch(
          `${API_CONFIG.baseURL}${API_ROUTES.publicWeb.companies}`,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PublicCompaniesResponse = await response.json();
        if (!isMounted) {
          return;
        }

        setCompanyList(data?.data?.company_profiles ?? []);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error('Error al cargar empresas destacadas:', err);
        setFetchError('No fue posible cargar las empresas destacadas');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCompanies();

    return () => {
      isMounted = false;
    };
  }, [enableClientFetch]);

  // Datos por defecto si no hay empresas cargadas
  const defaultCompanies = useMemo(() => [
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
  ], []);

  // Mapear empresas de la API al formato esperado
  const mappedCompanies = companyList.length > 0
    ? companyList.map((company, index) => ({
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
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando empresas...</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-12">
            <p className="text-red-600">{fetchError}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mappedCompanies.map((company, index) => (
              <CompanyCard
                key={companyList.length > 0 ? companyList[index]?.id || index : index}
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
