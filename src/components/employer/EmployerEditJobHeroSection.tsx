import Link from 'next/link';
import { colors } from '@/lib/colors';

export function EmployerEditJobHeroSection() {
  return (
    <section 
      className="relative py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.dark[800]} 0%, ${colors.dark[900]} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Edit Job
          </h1>
          
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center space-x-2 text-gray-300">
            <Link 
              href="/" 
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link 
              href="/employer/my-jobs" 
              className="hover:text-white transition-colors duration-200"
            >
              My Jobs
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-white">Edit Job</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
