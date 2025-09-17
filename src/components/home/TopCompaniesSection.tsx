import React from 'react';
import { CompanyCard } from '../CompanyCard';

export const TopCompaniesSection: React.FC = () => {
  const companies = [
    {
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-2xl font-bold text-white">A</span>
        </div>
      ),
      companyName: "Trophy & Sans",
      location: "Green Lanes, London",
      openPositions: 25
    },
    {
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded flex items-center justify-center">
          <span className="text-2xl font-bold text-white">R</span>
        </div>
      ),
      companyName: "Trout Design",
      location: "Park Avenue, Mumbai",
      openPositions: 35
    },
    {
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-2xl font-bold text-white">L</span>
        </div>
      ),
      companyName: "Resland LTD",
      location: "Betas Quence, London",
      openPositions: 20
    },
    {
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded flex items-center justify-center">
          <span className="text-2xl font-bold text-white">*</span>
        </div>
      ),
      companyName: "Lawn Hopper",
      location: "Wellesley Rd, London",
      openPositions: 45
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            Top Companies
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <CompanyCard
              key={index}
              logo={company.logo}
              companyName={company.companyName}
              location={company.location}
              openPositions={company.openPositions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
