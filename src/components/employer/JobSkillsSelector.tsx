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

interface JobSkillsSelectorProps {
  selectedCategory: string;
  selectedSubCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
}

export const JobSkillsSelector: React.FC<JobSkillsSelectorProps> = ({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'programming',
      name: 'Programming Languages',
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
      name: 'Web Development',
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
      name: 'Database',
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
      name: 'Cloud & DevOps',
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
      name: 'Design',
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
      name: 'Mobile Development',
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

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setExpandedCategory(categoryId);
    // Clear subcategory when category changes
    onSubCategoryChange('');
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    onSubCategoryChange(subCategoryId);
    setExpandedCategory(null);
  };

  const getSelectedSubCategoryName = () => {
    if (!selectedCategory || !selectedSubCategory) return null;
    const category = categories.find(cat => cat.id === selectedCategory);
    const subCategory = category?.subCategories.find(sub => sub.id === selectedSubCategory);
    return subCategory?.name;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold" style={{ color: colors.mainGreen }}>
          Required Skills
        </h3>
        <span className="text-sm text-gray-500">Select 1 category and 1 subcategory</span>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: colors.gray[800] }}>
          Category
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategorySelect(category.id)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: colors.gray[800] }}>
            Subcategory
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.find(cat => cat.id === selectedCategory)?.subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                type="button"
                onClick={() => handleSubCategorySelect(subCategory.id)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  selectedSubCategory === subCategory.id
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

      {/* Selected Skills Display */}
      {selectedCategory && selectedSubCategory && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-green-800">Selected Skill:</span>
            <span 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: colors.mainGreen,
                color: 'white'
              }}
            >
              {categories.find(cat => cat.id === selectedCategory)?.name}
            </span>
            <span className="text-green-600">→</span>
            <span 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: colors.lighterGreen,
                color: colors.mainGreen
              }}
            >
              {getSelectedSubCategoryName()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
