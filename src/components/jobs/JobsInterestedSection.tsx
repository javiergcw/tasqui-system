'use client';
import React from 'react';
import { JobInterestedCard } from './JobInterestedCard';

export const JobsInterestedSection: React.FC = () => {
  const jobs = [
    {
      id: 1,
      jobTitle: "Post-Room Operate",
      companyName: "Via Tourt Design LTD",
      location: "Wellesley Rd, London",
      category: "Accountancy",
      jobType: "Freelance",
      postedTime: "1 Hr Ago",
      contractType: "Full Time"
    },
    {
      id: 2,
      jobTitle: "Data Entry",
      companyName: "Via Techno Inc.",
      location: "Street 40/A, London",
      category: "Data Entry",
      jobType: "Freelance",
      postedTime: "3 Hr Ago",
      contractType: null
    },
    {
      id: 3,
      jobTitle: "Graphic Designer",
      companyName: "Via Devon Design",
      location: "West Sight, USA",
      category: "Graphics",
      jobType: "Freelance",
      postedTime: "4 Hr Ago",
      contractType: null
    },
    {
      id: 4,
      jobTitle: "Web Developer",
      companyName: "Via MegaNews",
      location: "San Francisco, California",
      category: "Development",
      jobType: "Freelance",
      postedTime: "5 Hr Ago",
      contractType: null
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Jobs You May Be Interested In
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobInterestedCard
              key={job.id}
              id={job.id}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              location={job.location}
              category={job.category}
              jobType={job.jobType}
              postedTime={job.postedTime}
              contractType={job.contractType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
