"use client";
import React from 'react';
import Link from 'next/link';
import { colors, colorClasses } from '@/lib/colors';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="text-white py-16 relative overflow-hidden"
      style={{ backgroundColor: colors.ctaGreen }}
    >
      {/* Decorative dots pattern */}
      <div className="absolute top-0 right-0 w-32 h-full opacity-10">
        <div className="grid grid-cols-4 gap-2 h-full p-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Tasqui Logo and Description */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <svg 
                width="150" 
                height="40" 
                viewBox="0 0 150 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 sm:h-10 w-auto"
              >
                <g clipPath="url(#clip0_23877_161_footer)">
                  {/* Texto "Tasqui" - Cambiado a blanco */}
                  <path d="M57.4599 5.38911V10.4658H50.192V32.3078H44.8839V10.4619H37.6547V5.38525H57.4599V5.38911Z" fill="white"/>
                  <path d="M71.3049 13.0777H76.2659V32.3042H71.3049V30.0359C69.8197 31.9069 67.7289 32.8443 65.0362 32.8443C62.3436 32.8443 60.272 31.8644 58.4397 29.9009C56.6073 27.9412 55.6891 25.5379 55.6891 22.6909C55.6891 19.844 56.6073 17.4407 58.4397 15.481C60.272 13.5213 62.4709 12.5376 65.0362 12.5376C67.6016 12.5376 69.8159 13.475 71.3049 15.346V13.0777ZM62.1507 26.5949C63.1498 27.6094 64.419 28.1148 65.9582 28.1148C67.4974 28.1148 68.7704 27.6094 69.785 26.5949C70.7996 25.5842 71.3049 24.2803 71.3049 22.6909C71.3049 21.1016 70.7996 19.8016 69.785 18.787C68.7704 17.7763 67.4974 17.2671 65.9582 17.2671C64.419 17.2671 63.1498 17.7724 62.1507 18.787C61.1516 19.8016 60.6501 21.1016 60.6501 22.6909C60.6501 24.2803 61.1516 25.5803 62.1507 26.5949Z" fill="white"/>
                  <path d="M85.1847 18.5401C85.1847 19.0532 85.5242 19.4698 86.2032 19.79C86.8821 20.1102 87.7076 20.3918 88.6836 20.6348C89.6558 20.8778 90.6317 21.1865 91.6077 21.5568C92.5799 21.9271 93.4093 22.5521 94.0882 23.42C94.7671 24.2919 95.1066 25.3797 95.1066 26.6875C95.1066 28.6626 94.3698 30.1825 92.8962 31.2434C91.4226 32.3081 89.5825 32.8404 87.3759 32.8404C83.4257 32.8404 80.7369 31.3167 79.3018 28.2652L83.607 25.8426C84.1702 27.5091 85.4278 28.3424 87.3759 28.3424C89.324 28.3424 90.03 27.7908 90.03 26.6875C90.03 25.5842 89.6905 25.7578 89.0115 25.4376C88.3326 25.1174 87.5032 24.8281 86.5311 24.5735C85.5551 24.3189 84.5829 23.9948 83.607 23.6129C82.631 23.2272 81.8054 22.6215 81.1265 21.7844C80.4475 20.9511 80.1081 19.9057 80.1081 18.652C80.1081 16.754 80.8063 15.2611 82.2028 14.1732C83.5992 13.0854 85.3352 12.5376 87.4145 12.5376C89.4937 12.5376 90.4003 12.8886 91.6849 13.5946C92.9656 14.3005 93.9802 15.3074 94.7247 16.6151L90.4929 18.922C89.8756 17.6143 88.8534 16.9623 87.4145 16.9623C85.9756 16.9623 86.2417 17.1051 85.8174 17.3867C85.3931 17.6683 85.1847 18.054 85.1847 18.5401Z" fill="white"/>
                  <path d="M112.605 13.0777H117.566V39.9964H112.605V30.0359C111.143 31.9069 109.068 32.8443 106.375 32.8443C103.682 32.8443 101.572 31.8644 99.7397 29.9009C97.9073 27.9412 96.9892 25.5379 96.9892 22.6909C96.9892 19.844 97.9073 17.4407 99.7397 15.481C101.572 13.5213 103.783 12.5376 106.375 12.5376C108.967 12.5376 111.143 13.475 112.605 15.346V13.0777ZM103.474 26.5949C104.485 27.6094 105.762 28.1148 107.301 28.1148C108.84 28.1148 110.109 27.6094 111.108 26.5949C112.107 25.5842 112.609 24.2803 112.609 22.6909C112.609 21.1016 112.107 19.8016 111.108 18.787C110.109 17.7763 108.84 17.2671 107.301 17.2671C105.762 17.2671 104.488 17.7724 103.474 18.787C102.459 19.8016 101.954 21.1016 101.954 22.6909C101.954 24.2803 102.459 25.5803 103.474 26.5949Z" fill="white"/>
                  <path d="M134.794 13.0776H139.755V32.3042H134.794V30.1516C133.591 31.9454 131.681 32.8442 129.066 32.8442C126.45 32.8442 125.227 32.1383 123.854 30.7303C122.481 29.3222 121.798 27.3702 121.798 24.8859V13.0815H126.759V24.2725C126.759 25.5533 127.106 26.537 127.796 27.2159C128.487 27.8949 129.413 28.2344 130.566 28.2344C131.72 28.2344 132.873 27.837 133.645 27.0423C134.412 26.2477 134.798 25.0556 134.798 23.4663V13.0815L134.794 13.0776Z" fill="white"/>
                  <path d="M146.753 10.7707C145.931 10.7707 145.221 10.4698 144.62 9.86799C144.018 9.26619 143.717 8.55639 143.717 7.73471C143.717 6.91303 144.018 6.1955 144.62 5.58213C145.221 4.96491 145.931 4.66016 146.753 4.66016C147.575 4.66016 148.323 4.96877 148.925 5.58213C149.527 6.19936 149.827 6.91688 149.827 7.73471C149.827 8.55253 149.527 9.26619 148.925 9.86799C148.323 10.4698 147.598 10.7707 146.753 10.7707ZM144.292 32.308V13.0814H149.253V32.308H144.292Z" fill="white"/>
                  
                  {/* Icono con gradiente verde - Mantiene los colores originales */}
                  <path d="M18.7135 0L8.62571 10.0878L7.2331 8.69129H0L8.62571 17.3209L25.9466 0H18.7135Z" fill="#7FCC00"/>
                  <path d="M18.7135 10.4546L8.62577 20.5424L7.23316 19.1497H6.10352e-05L8.62577 27.7754L25.9466 10.4546H18.7135Z" fill="#B5E05C"/>
                  <path d="M18.7135 20.9087L8.62577 30.9965L7.23316 29.6038H6.10352e-05L8.62577 38.2296L25.9466 20.9087H18.7135Z" fill="#CDEB95"/>
                </g>
                <defs>
                  <clipPath id="clip0_23877_161_footer">
                    <rect width="149.831" height="40" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            
            {/* Description */}
            <p className={`${colorClasses.text.gray300} text-sm leading-relaxed mb-6`}>
              Plataforma de formación profesional en línea que forma profesionales de alto desempeño con inclusión social y cultural. Conectamos talento con oportunidades de empleo mientras desarrollamos habilidades profesionales.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/people/Tasqui/100065533721048/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                style={{ backgroundColor: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                aria-label="Síguenos en Facebook"
              >
                <svg className="w-4 h-4 text-gray-900 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/tasqui/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                style={{ backgroundColor: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                aria-label="Síguenos en LinkedIn"
              >
                <svg className={`w-4 h-4 ${colorClasses.text.gray900} group-hover:text-white transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/tasquicolombia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                style={{ backgroundColor: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverGreen;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
                aria-label="Síguenos en Instagram"
              >
                <svg className={`w-4 h-4 ${colorClasses.text.gray900} group-hover:text-white transition-colors`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Section 2: Para Candidatos */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              Para Candidatos
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/find-job" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Buscar Empleos
                </Link>
              </li>
              <li>
                <Link href="/employee/profile" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link href="/find-job" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/employee/profile" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Mi CV
                </Link>
              </li>
              <li>
                <Link href="/find-job" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Lista de Empleos
                </Link>
              </li>
              <li>
                <Link href="/register" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} style={{ '--hover-color': colors.hoverGreen } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Enlaces Rápidos */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              Enlaces Rápidos
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/partners" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Cursos
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${colorClasses.text.gray300} transition-colors text-sm`} onMouseEnter={(e) => { e.currentTarget.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}>
                  <span className="mr-2" style={{ color: colors.hoverGreen }}>»</span>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Información */}
          <div>
            <h6 className={`${colorClasses.sidebar.text} font-semibold mb-4 pb-2 text-lg`}>
              Información
              <div className="w-16 border-b border-white mt-2"></div>
            </h6>
            <div className="space-y-4">
              {/* Phone */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.hoverGreen; e.currentTarget.querySelector('p')!.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.hoverGreen} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.hoverGreen }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Teléfono:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>+57 1 234 5678</p>
              </div>

              {/* Email */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.hoverGreen; e.currentTarget.querySelector('p')!.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.hoverGreen} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.hoverGreen }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Correo:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>info@tasqui.com</p>
              </div>

              {/* Address */}
              <div className="transition-colors cursor-pointer" onMouseEnter={(e) => { e.currentTarget.querySelector('span')!.style.color = colors.hoverGreen; e.currentTarget.querySelector('p')!.style.color = colors.hoverGreen; }} onMouseLeave={(e) => { e.currentTarget.querySelector('span')!.style.color = ''; e.currentTarget.querySelector('p')!.style.color = ''; }}>
                <div className="flex items-center mb-1">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke={colors.hoverGreen} 
                    viewBox="0 0 24 24"
                    style={{ stroke: colors.hoverGreen }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`${colorClasses.text.gray300} text-sm transition-colors`}>Dirección:</span>
                </div>
                <p className={`${colorClasses.text.gray300} text-sm ml-6 transition-colors`}>Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ backgroundColor: colors.footerBackground }}
      ></div>
    </footer>
  );
};

// Componente separado para la sección de copyright
export const CopyrightSection: React.FC = () => {
  return (
    <div 
      className="text-white py-4 text-center"
      style={{ backgroundColor: colors.copyrightBackground }}
    >
      <p className="text-sm">
        © {new Date().getFullYear()} Tasqui. Todos los derechos reservados. Formando profesionales de alto desempeño con inclusión social y cultural.
      </p>
    </div>
  );
};
