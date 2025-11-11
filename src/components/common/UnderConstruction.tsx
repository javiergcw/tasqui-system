import React from 'react';
import { colors, colorClasses } from '@/lib/colors';

interface UnderConstructionProps {
  title?: string;
  description?: string;
  hint?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title = 'Sección en construcción',
  description = 'Estamos trabajando para habilitar esta funcionalidad muy pronto.',
  hint = 'Vuelve más adelante para descubrir las nuevas características.',
  actionLabel,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 bg-white rounded-3xl border border-dashed border-gray-200 p-10 shadow-sm">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300"
        style={{ backgroundColor: colors.lighterGreen }}
      >
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-2-2v4m0 6a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      </div>

      <div className="space-y-3 max-w-2xl">
        <h2 className={`text-3xl font-bold ${colorClasses.text.slate800}`}>{title}</h2>
        <p className={`${colorClasses.text.gray600} text-base`}>{description}</p>
        <p className="text-sm" style={{ color: colors.mainGreen }}>
          {hint}
        </p>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className="px-6 py-3 text-sm font-semibold rounded-full transition-colors duration-200 text-white"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};


