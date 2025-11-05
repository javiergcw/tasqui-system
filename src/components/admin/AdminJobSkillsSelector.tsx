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

interface SelectedSkill {
  categoryId: string;
  subCategoryId: string;
}

interface AdminJobSkillsSelectorProps {
  selectedSkills: SelectedSkill[];
  onSkillsChange: (skills: SelectedSkill[]) => void;
}

export const AdminJobSkillsSelector: React.FC<AdminJobSkillsSelectorProps> = ({
  selectedSkills,
  onSkillsChange
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };

  const handleSubCategoryToggle = (categoryId: string, subCategoryId: string) => {
    const isSelected = selectedSkills.some(
      skill => skill.categoryId === categoryId && skill.subCategoryId === subCategoryId
    );

    if (isSelected) {
      // Remove skill
      onSkillsChange(
        selectedSkills.filter(
          skill => !(skill.categoryId === categoryId && skill.subCategoryId === subCategoryId)
        )
      );
    } else {
      // Add skill
      onSkillsChange([...selectedSkills, { categoryId, subCategoryId }]);
    }
  };

  const isSubCategorySelected = (categoryId: string, subCategoryId: string) => {
    return selectedSkills.some(
      skill => skill.categoryId === categoryId && skill.subCategoryId === subCategoryId
    );
  };

  const getSkillName = (categoryId: string, subCategoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    const subCategory = category?.subCategories.find(sub => sub.id === subCategoryId);
    return subCategory?.name || '';
  };

  const removeSkill = (categoryId: string, subCategoryId: string) => {
    onSkillsChange(
      selectedSkills.filter(
        skill => !(skill.categoryId === categoryId && skill.subCategoryId === subCategoryId)
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold" style={{ color: colors.mainGreen }}>
          Habilidades Requeridas
        </h3>
        <span className="text-sm text-gray-500">Selecciona múltiples habilidades</span>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: colors.gray[800] }}>
          Categoría
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map((category) => {
            const isExpanded = isCategoryExpanded(category.id);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  isExpanded
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategories - Show all expanded categories */}
      {expandedCategories.length > 0 && (
        <div className="space-y-4">
          {expandedCategories.map((categoryId) => {
            const category = categories.find(cat => cat.id === categoryId);
            if (!category) return null;
            
            return (
              <div key={categoryId} className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: colors.gray[800] }}>
                  {category.name} - Subcategorías
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.subCategories.map((subCategory) => {
                    const isSelected = isSubCategorySelected(categoryId, subCategory.id);
                    return (
                      <button
                        key={subCategory.id}
                        type="button"
                        onClick={() => handleSubCategoryToggle(categoryId, subCategory.id)}
                        className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                          isSelected
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        {subCategory.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Skills Display */}
      {selectedSkills.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-800">Habilidades Seleccionadas:</span>
            <span className="text-xs text-gray-500">{selectedSkills.length} seleccionada(s)</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSkills.map((skill, index) => (
              <div
                key={`${skill.categoryId}-${skill.subCategoryId}-${index}`}
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: colors.mainGreen,
                  color: 'white'
                }}
              >
                <span>{getSkillName(skill.categoryId, skill.subCategoryId)}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.categoryId, skill.subCategoryId)}
                  className="ml-1 hover:bg-green-700 rounded-full p-0.5 transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

