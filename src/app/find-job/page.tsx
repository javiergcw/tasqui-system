import { Sidebar, Footer, CopyrightSection, ScrollToTopButton, JobsHeroSection, SearchWithCategoriesSection, JobsInterestedSection, JobNotificationsSection } from '@/components';

export default function FindJobPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      {/* Hero Section */}
      <JobsHeroSection />

      {/* Search Bar with Popular Jobs Category Section */}
      <SearchWithCategoriesSection />

      {/* Jobs You May Be Interested In Section */}
      <JobsInterestedSection />

      {/* Job Notifications Section */}
      <JobNotificationsSection />

      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}