'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MyJobCard } from './MyJobCard';
import { MyJobsFilter } from './MyJobsFilter';
import { colorClasses } from '@/lib/colors';

interface FilterData {
  status: string;
  city: string;
  modality: string;
  date: string;
}

export const MyJobsSection: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterData>({
    status: '',
    city: '',
    modality: '',
    date: ''
  });
  const jobsPerPage = 4;
  
  const jobs = useMemo(() => [
    {
      id: "1",
      companyInitial: "V",
      jobTitle: "Web Designer, Graphic Designer, UI/UX Designer",
      jobCategory: "Graphics Designer",
      salary: "$35000-$38000",
      location: "Wellesley Rd, London",
      postedTime: "9 days ago",
      jobType: "Full Time",
      status: "Active" as const,
      city: "london",
      modality: "full-time",
      postedDate: new Date('2024-01-15')
    },
    {
      id: "2",
      companyInitial: "T",
      jobTitle: "Website Developer & Software Developer",
      jobCategory: "Web Developer",
      salary: "$3000-$8000",
      location: "Garden Road, UK",
      postedTime: "5 days ago",
      jobType: "Full Time",
      status: "Paused" as const,
      city: "manchester",
      modality: "full-time",
      postedDate: new Date('2024-01-20')
    },
    {
      id: "3",
      companyInitial: "A",
      jobTitle: "Marketing Specialist",
      jobCategory: "Marketing",
      salary: "$25000-$30000",
      location: "Birmingham, UK",
      postedTime: "2 days ago",
      jobType: "Part Time",
      status: "Active" as const,
      city: "birmingham",
      modality: "part-time",
      postedDate: new Date('2024-01-23')
    },
    {
      id: "4",
      companyInitial: "B",
      jobTitle: "Data Analyst",
      jobCategory: "Data Science",
      salary: "$40000-$45000",
      location: "Leeds, UK",
      postedTime: "1 week ago",
      jobType: "Contract",
      status: "Closed" as const,
      city: "leeds",
      modality: "contract",
      postedDate: new Date('2024-01-16')
    },
    {
      id: "5",
      companyInitial: "C",
      jobTitle: "Frontend Developer",
      jobCategory: "Web Developer",
      salary: "$45000-$50000",
      location: "Manchester, UK",
      postedTime: "3 days ago",
      jobType: "Full Time",
      status: "Active" as const,
      city: "manchester",
      modality: "full-time",
      postedDate: new Date('2024-01-21')
    },
    {
      id: "6",
      companyInitial: "D",
      jobTitle: "Backend Developer",
      jobCategory: "Web Developer",
      salary: "$50000-$55000",
      location: "Birmingham, UK",
      postedTime: "1 day ago",
      jobType: "Full Time",
      status: "Active" as const,
      city: "birmingham",
      modality: "full-time",
      postedDate: new Date('2024-01-24')
    },
    {
      id: "7",
      companyInitial: "E",
      jobTitle: "UI/UX Designer",
      jobCategory: "Graphics Designer",
      salary: "$30000-$35000",
      location: "Leeds, UK",
      postedTime: "4 days ago",
      jobType: "Part Time",
      status: "Paused" as const,
      city: "leeds",
      modality: "part-time",
      postedDate: new Date('2024-01-20')
    },
    {
      id: "8",
      companyInitial: "F",
      jobTitle: "Project Manager",
      jobCategory: "Management",
      salary: "$60000-$65000",
      location: "London, UK",
      postedTime: "6 days ago",
      jobType: "Full Time",
      status: "Active" as const,
      city: "london",
      modality: "full-time",
      postedDate: new Date('2024-01-18')
    }
  ], []);

  const handleView = (jobId: string) => {
    console.log('View job:', jobId);
    router.push(`/employer/view-job/${jobId}`);
  };

  const handleEdit = (jobId: string) => {
    console.log('Edit job:', jobId);
    router.push(`/employer/edit-job/${jobId}`);
  };

  const handleChangeStatus = (jobId: string, currentStatus: string) => {
    console.log('Change status for job:', jobId, 'from', currentStatus);
    // TODO: Implementar lógica para cambiar estado del job
    // Por ahora solo mostramos en consola
  };

  const handleFilterChange = (newFilters: FilterData) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Status filter
      if (filters.status && job.status.toLowerCase() !== filters.status) {
        return false;
      }
      
      // City filter
      if (filters.city && job.city !== filters.city) {
        return false;
      }
      
      // Modality filter
      if (filters.modality && job.modality !== filters.modality) {
        return false;
      }
      
      // Date filter
      if (filters.date) {
        const now = new Date();
        const jobDate = job.postedDate;
        const daysDiff = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.date) {
          case 'today':
            if (daysDiff > 1) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
          case '3months':
            if (daysDiff > 90) return false;
            break;
          case 'year':
            if (daysDiff > 365) return false;
            break;
        }
      }
      
      return true;
    });
  }, [jobs, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <section className={`${colorClasses.background.gray50} py-12 md:py-20`} style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            My Posted Jobs
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Manage and track all your posted job listings. View applications, edit details, or change job status.
          </p>
        </div>
        
        {/* Filter Component */}
        <MyJobsFilter onFilterChange={handleFilterChange} />

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <MyJobCard
                key={index}
                id={job.id}
                companyInitial={job.companyInitial}
                jobTitle={job.jobTitle}
                jobCategory={job.jobCategory}
                salary={job.salary}
                location={job.location}
                postedTime={job.postedTime}
                jobType={job.jobType}
                status={job.status}
                onView={handleView}
                onEdit={handleEdit}
                onChangeStatus={handleChangeStatus}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No jobs found</div>
              <div className="text-gray-400 text-sm">Try adjusting your filters to see more results</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                currentPage === 1
                  ? colorClasses.button.paginationDisabled
                  : colorClasses.button.pagination
              }`}
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === page
                    ? colorClasses.button.paginationActive
                    : colorClasses.button.pagination
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                currentPage === totalPages
                  ? colorClasses.button.paginationDisabled
                  : colorClasses.button.pagination
              }`}
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
