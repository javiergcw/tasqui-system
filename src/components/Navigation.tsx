'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  subItems?: { label: string; href: string }[];
}

interface NavigationProps {
  items: NavItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ items, className = '' }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemLabel: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setHoveredItem(itemLabel);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms delay
    setTimeoutId(id);
  };

  return (
    <nav className={`flex items-center space-x-8 ${className}`}>
      {items.map((item) => (
        <div 
          key={item.label} 
          className="relative group"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href={item.href}
             className={`
               flex items-center space-x-1 px-3 py-2 text-base font-medium transition-colors duration-200
               ${activeItem === item.label 
                 ? '' 
                 : 'text-white hover:text-slate-100'
               }
             `}
            style={activeItem === item.label ? { color: colors.mainRed } : {}}
            onClick={() => setActiveItem(item.label)}
          >
            <span>{item.label}</span>
            {item.hasDropdown && (
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            )}
          </a>
          
          {/* Dropdown Menu */}
          {item.hasDropdown && item.subItems && (
            <div 
              className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ease-out ${
                hoveredItem === item.label 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-2">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.label}
                    href={subItem.href}
                    className="block px-6 py-3 text-sm text-gray-700 hover:text-white transition-all duration-200 font-medium"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary[500];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
