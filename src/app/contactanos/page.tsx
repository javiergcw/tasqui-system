'use client';

import { useEffect } from 'react';

export default function ContactanosPage() {
  useEffect(() => {
    // Redirigir a la URL externa
    window.location.href = 'https://tasqui.com/contactanos';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Redirigiendo a la página de contacto...
        </p>
      </div>
    </div>
  );
}

