'use client';
import { colors } from '@/lib/colors';

export const ActionButtonsCard = () => {
  const handleDownloadCV = () => {
    console.log('Download CV clicked');
    // Aquí iría la lógica para descargar el CV
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-center">
        <button
          onClick={handleDownloadCV}
          className="px-6 py-3 font-semibold text-white transition-colors duration-200 rounded-lg"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Descargar CV
        </button>
      </div>
    </div>
  );
};
