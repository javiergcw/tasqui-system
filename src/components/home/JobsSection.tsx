import React from 'react';
import { JobCard } from '../JobCard';
import { colorClasses } from '@/lib/colors';

export const JobsSection: React.FC = () => {
  const jobs = [
    {
      id: "1",
      companyInitial: "V",
      jobTitle: "Web Designer, Graphic Designer, UI/UX Designer",
      jobCategory: "Graphics Designer",
      salary: "$35000-$38000",
      location: "Wellesley Rd, London",
      postedTime: "9 days ago",
      jobType: "Full Time"
    },
    {
      id: "2",
      companyInitial: "T",
      jobTitle: "Website Developer & Software Developer",
      jobCategory: "Web Developer",
      salary: "$3000-$8000",
      location: "Garden Road, UK",
      postedTime: "5 days ago",
      jobType: "Full Time"
    }
  ];

  return (
    <section className={`${colorClasses.background.gray50} py-12 md:py-20`} style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
            Jobs You May Be Interested In
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              id={job.id}
              companyInitial={job.companyInitial}
              jobTitle={job.jobTitle}
              jobCategory={job.jobCategory}
              salary={job.salary}
              location={job.location}
              postedTime={job.postedTime}
              jobType={job.jobType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
