import Link from 'next/link';
import { colors } from '@/lib/colors';

export function MyJobsHeroSection() {
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
            My Jobs
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
            <span className="text-white">My Jobs</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
