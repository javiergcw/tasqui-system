'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/colors';

export interface AdminApplicantCard {
  id: string;
  jobId: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  stage: 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
  status: string;
  skills: string[];
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

interface AdminApplicantsSectionProps {
  applicants: AdminApplicantCard[];
  isLoading: boolean;
  error: string | null;
}

export const AdminApplicantsSection: React.FC<AdminApplicantsSectionProps> = ({
  applicants,
  isLoading,
  error,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleApplicantClick = (applicantId: string, jobId: string) => {
    router.push(`/admin/applicants/${applicantId}?jobId=${jobId}`);
  };

  const filteredApplicants = useMemo(() => {
    if (!searchTerm) {
      return applicants;
    }
    return applicants.filter((applicant) => {
      return applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, applicants]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Cargando candidatos...
          </h3>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.636 5.636l12.728 12.728M9 5h6a2 2 0 011.995 1.85L17 7v10a2 2 0 01-1.85 1.995L15 19H9a2 2 0 01-1.995-1.85L7 17V7a2 2 0 011.85-1.995L9 5z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-red-600">
            {error || 'Error al cargar los candidatos.'}
          </h3>
        </div>
      );
    }

    if (filteredApplicants.length === 0) {
      return (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No se encontraron candidatos
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Intenta ajustar los filtros para ver más resultados.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleApplicantClick(applicant.id, applicant.jobId)}
          >
            {/* Profile Image */}
            <div className="relative w-full h-64">
              <Image
                src={applicant.image}
                alt={applicant.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {applicant.name}
              </h3>
              <p className="text-gray-600 mb-4">{applicant.title}</p>

              {/* Stage Badge */}
              <div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    applicant.stage === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : applicant.stage === 'reviewed'
                      ? 'bg-blue-100 text-blue-800'
                      : applicant.stage === 'interviewed'
                      ? 'bg-green-100 text-green-800'
                      : applicant.stage === 'hired'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {applicant.stage === 'pending'
                    ? 'Pendiente'
                    : applicant.stage === 'reviewed'
                    ? 'Revisado'
                    : applicant.stage === 'interviewed'
                    ? 'Entrevistado'
                    : applicant.stage === 'hired'
                    ? 'Contratado'
                    : 'Rechazado'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredApplicants.length} de {applicants.length} candidatos
          </p>
        </div>

        {/* Applicants Grid */}
        {renderContent()}
      </div>
    </section>
  );
};

