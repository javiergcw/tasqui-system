'use client';

import { useState } from 'react';
import { colors } from '@/lib/colors';
import { JobSkillsSelector } from './JobSkillsSelector';

export function PostJobFormSection() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyWebsite: '',
    jobType: '',
    salary: '',
    jobCategory: '',
    companyEmail: '',
    location: '',
    jobTags: '',
    experience: '',
    jobDescription: '',
    requiredSkillCategory: '',
    requiredSkillSubCategory: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkillCategory: categoryId,
      requiredSkillSubCategory: '' // Clear subcategory when category changes
    }));
  };

  const handleSkillSubCategoryChange = (subCategoryId: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkillSubCategory: subCategoryId
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark[800] }}>
            Fill Up Your Job Information
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Job Title or Keyword"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Company Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="e.g www.companyname.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Job Type
                  </label>
                  <div className="relative">
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600"
                    >
                      <option value="">Job Type</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5" style={{ color: colors.gray[600] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. $20,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Job Category */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Job Category
                  </label>
                  <div className="relative">
                    <select
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent appearance-none bg-white text-gray-900 placeholder-gray-600"
                    >
                      <option value="">Category</option>
                      <option value="technology">Technology</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="finance">Finance</option>
                      <option value="hr">Human Resources</option>
                      <option value="operations">Operations</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5" style={{ color: colors.gray[600] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Company Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. hello@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. London"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Job Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Job Tags
                  </label>
                  <input
                    type="text"
                    name="jobTags"
                    value={formData.jobTags}
                    onChange={handleInputChange}
                    placeholder="e.g. web design, graphics design, video editing"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 1 year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.gray[800] }}>
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Job Description"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-y text-gray-900 placeholder-gray-600"
              />
            </div>

            {/* Required Skills */}
            <div className="border-t border-gray-200 pt-6">
              <JobSkillsSelector
                selectedCategory={formData.requiredSkillCategory}
                selectedSubCategory={formData.requiredSkillSubCategory}
                onCategoryChange={handleSkillCategoryChange}
                onSubCategoryChange={handleSkillSubCategoryChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.mainGreen }}
              >
                Post A Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
