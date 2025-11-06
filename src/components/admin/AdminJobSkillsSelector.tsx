'use client';
import React, { useState } from 'react';
import { colors } from '@/lib/colors';
import type { SkillCategory } from '@/models/master/skills-complete.model';

interface SelectedSkill {
  categoryId: string;
  subCategoryId: string;
}

interface AdminJobSkillsSelectorProps {
  selectedSkills: SelectedSkill[];
  onSkillsChange: (skills: SelectedSkill[]) => void;
  skillsCategories?: SkillCategory[];
  isLoadingSkills?: boolean;
  skillsError?: string | null;
}

export const AdminJobSkillsSelector: React.FC<AdminJobSkillsSelectorProps> = ({
  selectedSkills,
  onSkillsChange,
  skillsCategories = [],
  isLoadingSkills = false,
  skillsError = null
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Convertir las categorías del API al formato esperado por el componente
  const categories = skillsCategories.map(category => ({
    id: category.id,
    name: category.name,
    subCategories: category.subcategories.map(sub => ({
      id: sub.id,
      name: sub.name
    }))
  }));

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

  // Agrupar habilidades seleccionadas por categoría
  const groupedSelectedSkills = categories
    .map(category => {
      const skillsInCategory = selectedSkills.filter(
        skill => skill.categoryId === category.id
      );
      return {
        category,
        skills: skillsInCategory
      };
    })
    .filter(group => group.skills.length > 0);

  if (isLoadingSkills) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" style={{ color: colors.mainGreen }}>
            Habilidades Requeridas
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando habilidades...</p>
        </div>
      </div>
    );
  }

  if (skillsError) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" style={{ color: colors.mainGreen }}>
            Habilidades Requeridas
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error al cargar las habilidades: {skillsError}</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" style={{ color: colors.mainGreen }}>
            Habilidades Requeridas
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No hay habilidades disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
        <h3 className="text-xl font-bold" style={{ color: colors.mainGreen }}>
          Habilidades Requeridas
        </h3>
        <span className="text-sm text-gray-500">Selecciona múltiples habilidades</span>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="block text-base font-semibold" style={{ color: colors.gray[800] }}>
          Categorías
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => {
            const isExpanded = isCategoryExpanded(category.id);
            const categorySelectedCount = selectedSkills.filter(
              skill => skill.categoryId === category.id
            ).length;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`relative px-4 py-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  isExpanded
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isExpanded ? 'text-green-800' : 'text-gray-800'}`}>
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {categorySelectedCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isExpanded ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
                      }`}>
                        {categorySelectedCount}
                      </span>
                    )}
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isExpanded ? 'transform rotate-180 text-green-600' : 'text-gray-400'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategories - Show all expanded categories */}
      {expandedCategories.length > 0 && (
        <div className="space-y-5 pt-4 border-t border-gray-200">
          {expandedCategories.map((categoryId) => {
            const category = categories.find(cat => cat.id === categoryId);
            if (!category) return null;
            
            return (
              <div key={categoryId} className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.mainGreen }}></div>
                  <label className="block text-sm font-semibold uppercase tracking-wide" style={{ color: colors.mainGreen }}>
                    {category.name}
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {category.subCategories.map((subCategory) => {
                    const isSelected = isSubCategorySelected(categoryId, subCategory.id);
                    return (
                      <button
                        key={subCategory.id}
                        type="button"
                        onClick={() => handleSubCategoryToggle(categoryId, subCategory.id)}
                        className={`group relative px-3 py-2.5 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          isSelected
                            ? 'border-green-600 bg-green-600 text-white shadow-md transform scale-105'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1 text-left">{subCategory.name}</span>
                          {isSelected && (
                            <svg 
                              className="w-4 h-4 flex-shrink-0" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Skills Display - Agrupadas por categoría */}
      {selectedSkills.length > 0 && (
        <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base font-bold text-green-800">Habilidades Seleccionadas</span>
            </div>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
              {selectedSkills.length} {selectedSkills.length === 1 ? 'seleccionada' : 'seleccionadas'}
            </span>
          </div>
          
          {/* Grupos por categoría */}
          <div className="space-y-4">
            {groupedSelectedSkills.map((group) => (
              <div key={group.category.id} className="space-y-2">
                {/* Título de la categoría */}
                <div className="flex items-center gap-2 pb-2 border-b border-green-200">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.mainGreen }}></div>
                  <span className="text-sm font-semibold text-green-800 uppercase tracking-wide">
                    {group.category.name}
                  </span>
                  <span className="px-2 py-0.5 bg-green-600 text-white rounded-full text-xs font-bold">
                    {group.skills.length}
                  </span>
                </div>
                
                {/* Habilidades de esta categoría */}
                <div className="flex flex-wrap gap-2 pl-3">
                  {group.skills.map((skill, index) => (
                    <div
                      key={`${skill.categoryId}-${skill.subCategoryId}-${index}`}
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
                      style={{ 
                        backgroundColor: colors.mainGreen,
                        color: 'white'
                      }}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{getSkillName(skill.categoryId, skill.subCategoryId)}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.categoryId, skill.subCategoryId)}
                        className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                        title="Eliminar habilidad"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

