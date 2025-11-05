'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/colors';
import { AdminApplicantsFilter } from './AdminApplicantsFilter';

export const AdminApplicantsSection: React.FC = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    stage: 'all'
  });

  const handleApplicantClick = (applicantId: number) => {
    router.push(`/admin/applicants/${applicantId}`);
  };

  const applicants = useMemo(() => [
    {
      id: 1,
      name: 'Mibraj Alex',
      title: 'Desarrollador Web',
      image: '/api/placeholder/300/300',
      rating: 5,
      stage: 'reviewed',
      skills: ['React', 'JavaScript', 'Node.js'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Felica Kareon',
      title: 'Desarrollador PHP',
      image: '/api/placeholder/300/300',
      rating: 4,
      stage: 'interviewed',
      skills: ['PHP', 'Laravel', 'MySQL'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'Malisa Petel',
      title: 'Consultor de Negocios',
      image: '/api/placeholder/300/300',
      rating: 5,
      stage: 'hired',
      skills: ['Estrategia', 'Gestión', 'Analítica'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 4,
      name: 'Quence Joes',
      title: 'Diseñador Gráfico',
      image: '/api/placeholder/300/300',
      rating: 3,
      stage: 'pending',
      skills: ['Photoshop', 'Illustrator', 'UI/UX'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      title: 'Desarrollador Frontend',
      image: '/api/placeholder/300/300',
      rating: 4,
      stage: 'reviewed',
      skills: ['Vue.js', 'TypeScript', 'CSS'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 6,
      name: 'Mike Wilson',
      title: 'Desarrollador Backend',
      image: '/api/placeholder/300/300',
      rating: 5,
      stage: 'interviewed',
      skills: ['Python', 'Django', 'PostgreSQL'],
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    }
  ], []);

  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      const matchesSearch = !filters.search || 
        applicant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        applicant.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        applicant.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesRating = filters.rating === 'all' || 
        applicant.rating >= parseInt(filters.rating);

      const matchesStage = filters.stage === 'all' || 
        applicant.stage === filters.stage;

      return matchesSearch && matchesRating && matchesStage;
    });
  }, [filters, applicants]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <AdminApplicantsFilter onFilterChange={handleFilterChange} />
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredApplicants.length} de {applicants.length} candidatos
          </p>
        </div>

        {/* Applicants Grid */}
        {filteredApplicants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredApplicants.map((applicant) => (
            <div 
              key={applicant.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleApplicantClick(applicant.id)}
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
                <p className="text-gray-600 mb-2">
                  {applicant.title}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < applicant.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Stage Badge */}
                <div className="mb-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    applicant.stage === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    applicant.stage === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    applicant.stage === 'interviewed' ? 'bg-green-100 text-green-800' :
                    applicant.stage === 'hired' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {applicant.stage === 'pending' ? 'Pendiente' :
                     applicant.stage === 'reviewed' ? 'Revisado' :
                     applicant.stage === 'interviewed' ? 'Entrevistado' :
                     applicant.stage === 'hired' ? 'Contratado' :
                     'Rechazado'}
                  </span>
                </div>
                
                {/* Dashed Separator */}
                <div className="border-t border-dashed border-gray-300 mb-4"></div>
                
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-3">
                  <a 
                    href={applicant.social.facebook}
                    className="w-8 h-8 bg-white border rounded flex items-center justify-center transition-colors duration-200"
                    style={{
                      borderColor: colors.mainGreen,
                      color: colors.mainGreen
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.dark[800];
                      e.currentTarget.style.color = colors.dark[800];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.mainGreen;
                      e.currentTarget.style.color = colors.mainGreen;
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={applicant.social.twitter}
                    className="w-8 h-8 bg-white border rounded flex items-center justify-center transition-colors duration-200"
                    style={{
                      borderColor: colors.mainGreen,
                      color: colors.mainGreen
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.dark[800];
                      e.currentTarget.style.color = colors.dark[800];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.mainGreen;
                      e.currentTarget.style.color = colors.mainGreen;
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={applicant.social.linkedin}
                    className="w-8 h-8 bg-white border rounded flex items-center justify-center transition-colors duration-200"
                    style={{
                      borderColor: colors.mainGreen,
                      color: colors.mainGreen
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.dark[800];
                      e.currentTarget.style.color = colors.dark[800];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.mainGreen;
                      e.currentTarget.style.color = colors.mainGreen;
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron candidatos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

