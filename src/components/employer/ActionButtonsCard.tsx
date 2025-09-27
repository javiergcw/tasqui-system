'use client';
import { colors } from '@/lib/colors';

export const ActionButtonsCard = () => {
  const handleHireMe = () => {
    console.log('Hire me clicked');
    // Aquí iría la lógica para contratar al candidato
  };

  const handleDownloadCV = () => {
    console.log('Download CV clicked');
    // Aquí iría la lógica para descargar el CV
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleHireMe}
          className="px-6 py-3 font-semibold text-white transition-colors duration-200"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Hire Me
        </button>
        
        <button
          onClick={handleDownloadCV}
          className="px-6 py-3 font-semibold text-white transition-colors duration-200"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Download CV
        </button>
      </div>
    </div>
  );
};
