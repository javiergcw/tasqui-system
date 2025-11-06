'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export const SkillsSection: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<{[categoryId: string]: string}>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'programming',
      name: 'Lenguajes de Programación',
      subCategories: [
        { id: 'javascript', name: 'JavaScript' },
        { id: 'python', name: 'Python' },
        { id: 'java', name: 'Java' },
        { id: 'csharp', name: 'C#' },
        { id: 'php', name: 'PHP' },
        { id: 'ruby', name: 'Ruby' },
        { id: 'go', name: 'Go' },
        { id: 'rust', name: 'Rust' }
      ]
    },
    {
      id: 'web-development',
      name: 'Desarrollo Web',
      subCategories: [
        { id: 'react', name: 'React' },
        { id: 'vue', name: 'Vue.js' },
        { id: 'angular', name: 'Angular' },
        { id: 'nodejs', name: 'Node.js' },
        { id: 'express', name: 'Express.js' },
        { id: 'nextjs', name: 'Next.js' },
        { id: 'nuxt', name: 'Nuxt.js' }
      ]
    },
    {
      id: 'database',
      name: 'Base de Datos',
      subCategories: [
        { id: 'mysql', name: 'MySQL' },
        { id: 'postgresql', name: 'PostgreSQL' },
        { id: 'mongodb', name: 'MongoDB' },
        { id: 'redis', name: 'Redis' },
        { id: 'sqlite', name: 'SQLite' },
        { id: 'oracle', name: 'Oracle' }
      ]
    },
    {
      id: 'cloud',
      name: 'Nube y DevOps',
      subCategories: [
        { id: 'aws', name: 'AWS' },
        { id: 'azure', name: 'Azure' },
        { id: 'gcp', name: 'Google Cloud' },
        { id: 'docker', name: 'Docker' },
        { id: 'kubernetes', name: 'Kubernetes' },
        { id: 'terraform', name: 'Terraform' }
      ]
    },
    {
      id: 'design',
      name: 'Diseño',
      subCategories: [
        { id: 'figma', name: 'Figma' },
        { id: 'sketch', name: 'Sketch' },
        { id: 'adobe-xd', name: 'Adobe XD' },
        { id: 'photoshop', name: 'Photoshop' },
        { id: 'illustrator', name: 'Illustrator' },
        { id: 'indesign', name: 'InDesign' }
      ]
    },
    {
      id: 'mobile',
      name: 'Desarrollo Móvil',
      subCategories: [
        { id: 'react-native', name: 'React Native' },
        { id: 'flutter', name: 'Flutter' },
        { id: 'swift', name: 'Swift' },
        { id: 'kotlin', name: 'Kotlin' },
        { id: 'xamarin', name: 'Xamarin' },
        { id: 'ionic', name: 'Ionic' }
      ]
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      // Remove category and its subcategory
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
      setSelectedSubCategories(prev => {
        const newSubCategories = { ...prev };
        delete newSubCategories[categoryId];
        return newSubCategories;
      });
    } else {
      // Add category
      setSelectedCategories(prev => [...prev, categoryId]);
      setExpandedCategory(categoryId);
    }
  };

  const handleSubCategorySelect = (categoryId: string, subCategoryId: string) => {
    setSelectedSubCategories(prev => ({
      ...prev,
      [categoryId]: subCategoryId
    }));
    setExpandedCategory(null);
  };

  const handleCategoryExpand = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getSelectedSubCategoryName = (categoryId: string) => {
    const subCategoryId = selectedSubCategories[categoryId];
    if (!subCategoryId) return null;
    const category = categories.find(cat => cat.id === categoryId);
    const subCategory = category?.subCategories.find(sub => sub.id === subCategoryId);
    return subCategory?.name;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Habilidades y Tecnologías
        </h2>
        <button
          onClick={() => setExpandedCategory(null)}
          className="px-4 py-2 text-white font-medium rounded-md transition-colors"
          style={{ backgroundColor: colors.mainGreen }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverGreen;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.mainGreen;
          }}
        >
          Contraer Todo
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg">
            {/* Category Header */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCategoryExpand(category.id)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer ${
                    selectedCategories.includes(category.id) 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryToggle(category.id);
                  }}
                >
                  {selectedCategories.includes(category.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-gray-900">{category.name}</span>
                {selectedCategories.includes(category.id) && getSelectedSubCategoryName(category.id) && (
                  <span 
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ 
                      backgroundColor: colors.lighterGreen,
                      color: colors.mainGreen
                    }}
                  >
                    {getSelectedSubCategoryName(category.id)}
                  </span>
                )}
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Subcategories */}
            {expandedCategory === category.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => handleSubCategorySelect(category.id, subCategory.id)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        selectedSubCategories[category.id] === subCategory.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {subCategory.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumen de Habilidades Seleccionadas */}
      {selectedCategories.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Habilidades Seleccionadas:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(cat => cat.id === categoryId);
              const subCategoryName = getSelectedSubCategoryName(categoryId);
              return (
                <div key={categoryId} className="flex items-center space-x-2">
                  <span 
                    className="px-3 py-1 text-sm font-medium rounded-full"
                    style={{ 
                      backgroundColor: colors.mainGreen,
                      color: 'white'
                    }}
                  >
                    {category?.name}
                  </span>
                  {subCategoryName && (
                    <>
                      <span className="text-gray-400">→</span>
                      <span 
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{ 
                          backgroundColor: colors.lighterGreen,
                          color: colors.mainGreen
                        }}
                      >
                        {subCategoryName}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
