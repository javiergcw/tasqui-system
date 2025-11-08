'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { SkillCategory, SkillSubcategory, SkillType } from '@/models/master/skills-complete.model';
import { colors } from '@/lib/colors';

export interface SkillsSelectionPayload {
  categories: string[];
  subcategories: Record<string, string[]>;
}

interface RemovingSkillState {
  categoryId: string;
  subCategoryId?: string;
}

interface SkillsSectionProps {
  categories?: SkillCategory[];
  isLoading?: boolean;
  savedSkills?: SkillsSelectionPayload | null;
  onSaveSkills?: (selection: SkillsSelectionPayload) => Promise<void> | void;
  isSaving?: boolean;
  onRemoveCategory?: (categoryId: string) => Promise<void> | void;
  onRemoveSubcategory?: (categoryId: string, subCategoryId: string) => Promise<void> | void;
  removingSkill?: RemovingSkillState | null;
}

const skillTypeLabels: Record<SkillType, string> = {
  HARD: 'Habilidades Técnicas',
  SOFT: 'Habilidades Blandas',
};

const emptySelection: SkillsSelectionPayload = {
  categories: [],
  subcategories: {},
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories = [],
  isLoading = false,
  savedSkills,
  onSaveSkills,
  isSaving,
  onRemoveCategory,
  onRemoveSubcategory,
  removingSkill,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategoryIds, setModalCategoryIds] = useState<string[]>([]);
  const [modalSubCategoryIds, setModalSubCategoryIds] = useState<Record<string, string[]>>({});
  const [internalSaving, setInternalSaving] = useState(false);

  const categoryMap = useMemo(() => {
    return categories.reduce<Record<string, SkillCategory>>((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {});
  }, [categories]);

  const currentSelection = savedSkills ?? emptySelection;
  const savedCategoryIds = currentSelection.categories ?? [];
  const savedSubcategories = currentSelection.subcategories ?? {};

  const modalSaving = isSaving ?? internalSaving;

  const openModal = () => {
    setModalCategoryIds(savedCategoryIds);
    setModalSubCategoryIds(savedSubcategories);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    setModalCategoryIds((prev) => prev.filter((categoryId) => Boolean(categoryMap[categoryId])));
    setModalSubCategoryIds((prev) => {
      const next: Record<string, string[]> = {};
      Object.entries(prev).forEach(([categoryId, subCategoryIds]) => {
        const category = categoryMap[categoryId];
        if (!category) {
          return;
        }
        const validSubCategories = subCategoryIds.filter((subCategoryId) =>
          category.subcategories.some((subCategory) => subCategory.id === subCategoryId)
        );
        if (validSubCategories.length) {
          next[categoryId] = validSubCategories;
        }
      });
      return next;
    });
  }, [categoryMap, isModalOpen]);

  const handleModalCategoryToggle = (categoryId: string) => {
    setModalCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        const next = prev.filter((id) => id !== categoryId);
        setModalSubCategoryIds((prevSubs) => {
          const updated = { ...prevSubs };
          delete updated[categoryId];
          return updated;
        });
        return next;
      }
      return [...prev, categoryId];
    });
  };

  const handleModalSubCategoryToggle = (categoryId: string, subCategoryId: string) => {
    setModalCategoryIds((prev) => (prev.includes(categoryId) ? prev : [...prev, categoryId]));
    setModalSubCategoryIds((prev) => {
      const current = prev[categoryId] ?? [];
      if (current.includes(subCategoryId)) {
        const updated = current.filter((id) => id !== subCategoryId);
        const next = { ...prev, [categoryId]: updated };
        if (!updated.length) {
          delete next[categoryId];
        }
        return { ...next };
      }
      return {
        ...prev,
        [categoryId]: [...current, subCategoryId],
      };
    });
  };

  const handleModalSubmit = async () => {
    if (!modalCategoryIds.length) {
      closeModal();
      return;
    }

    const selection: SkillsSelectionPayload = {
      categories: [...modalCategoryIds],
      subcategories: modalCategoryIds.reduce<Record<string, string[]>>((acc, categoryId) => {
        acc[categoryId] = [...(modalSubCategoryIds[categoryId] ?? [])];
        return acc;
      }, {}),
    };

    if (!onSaveSkills) {
      console.info('Guardar habilidades:', selection);
      closeModal();
      return;
    }

    try {
      if (isSaving === undefined) {
        setInternalSaving(true);
      }
      await onSaveSkills(selection);
      closeModal();
    } finally {
      if (isSaving === undefined) {
        setInternalSaving(false);
      }
    }
  };

  const handleRemoveCategory = async (categoryId: string) => {
    if (!onRemoveCategory) {
      console.info('Eliminar categoría de habilidades:', categoryId);
      return;
    }
    await onRemoveCategory(categoryId);
  };

  const handleRemoveSubcategory = async (categoryId: string, subCategoryId: string) => {
    if (!onRemoveSubcategory) {
      console.info('Eliminar subcategoría de habilidades:', categoryId, subCategoryId);
      return;
    }
    await onRemoveSubcategory(categoryId, subCategoryId);
  };

  const savedCategories = useMemo(() => {
    return savedCategoryIds
      .map((categoryId) => categoryMap[categoryId])
      .filter((category): category is SkillCategory => Boolean(category));
  }, [savedCategoryIds, categoryMap]);

  const savedByType = useMemo(() => {
    const groups: Record<SkillType, SkillCategory[]> = {
      HARD: [],
      SOFT: [],
    };
    savedCategories.forEach((category) => {
      groups[category.type].push(category);
    });
    return groups;
  }, [savedCategories]);

  const renderSavedList = () => {
    if (!savedCategories.length) {
      return (
        <div className="rounded-lg border border-dashed border-green-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-600">
            Aún no has agregado habilidades. Usa el botón <strong>Agregar habilidades</strong> para empezar.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2">
        {(['HARD', 'SOFT'] as SkillType[]).map((type) => {
          const categoriesByType = savedByType[type];
          if (!categoriesByType.length) return null;

          return (
            <div key={type} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                {skillTypeLabels[type]}
              </h4>
              <div className="space-y-3 rounded-lg border border-green-100 bg-white p-4 shadow-sm">
                {categoriesByType.map((category) => {
                  const subCategoryIds = savedSubcategories[category.id] ?? [];
                  const removingCategory =
                    removingSkill?.categoryId === category.id && !removingSkill.subCategoryId;

                  return (
                    <div key={category.id} className="space-y-3 border-b border-green-100 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-green-800">{category.name}</p>
                          {category.description && (
                            <p className="text-xs text-gray-500">{category.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category.id)}
                          disabled={removingCategory}
                          className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingCategory ? 'Eliminando...' : 'Eliminar todo'}
                        </button>
                      </div>

                      {subCategoryIds.length ? (
                        <ul className="space-y-2">
                          {subCategoryIds.map((subCategoryId) => {
                            const subCategory = category.subcategories.find((sub) => sub.id === subCategoryId);
                            if (!subCategory) return null;
                            const removingSubcategory =
                              removingSkill?.categoryId === category.id &&
                              removingSkill?.subCategoryId === subCategoryId;

                            return (
                              <li
                                key={`${category.id}-${subCategoryId}`}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-green-100 bg-green-50/60 px-3 py-2"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-800">{subCategory.name}</p>
                                  {subCategory.description && (
                                    <p className="text-xs text-green-700/80">{subCategory.description}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSubcategory(category.id, subCategoryId)}
                                  disabled={removingSubcategory}
                                  className="rounded-full border border-red-100 bg-white px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {removingSubcategory ? 'Quitando...' : 'Quitar'}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
                          Categoría completa seleccionada.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm font-medium text-gray-500">Cargando habilidades...</span>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="py-12 text-center border border-dashed border-gray-200 rounded-lg">
        <p className="text-sm text-gray-500">No se encontraron habilidades disponibles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.dark[800] }}>
            Habilidades y Tecnologías
          </h2>
          <p className="text-sm text-gray-500">
            Gestiona las habilidades que mostrarás en tu perfil profesional.
          </p>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: colors.mainGreen }}
        >
          Agregar habilidades
        </button>
      </div>

      {renderSavedList()}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Selecciona tus habilidades</h3>
                <p className="text-sm text-gray-500">
                  Elige categorías y subcategorías. Puedes guardar la categoría completa o habilidades específicas.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Categorías disponibles</h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                      const isActive = modalCategoryIds.includes(category.id);
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleModalCategoryToggle(category.id)}
                          className={`rounded-lg border px-4 py-3 text-left transition ${
                            isActive
                              ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold">{category.name}</span>
                            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">
                              {skillTypeLabels[category.type]}
                            </span>
                          </div>
                          {category.description && (
                            <p className="mt-1 text-xs text-gray-500 line-clamp-2">{category.description}</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {modalCategoryIds.length > 0 && (
                  <div className="space-y-5">
                    {modalCategoryIds.map((categoryId) => {
                      const category = categoryMap[categoryId];
                      if (!category) return null;
                      const selectedSubCategories = modalSubCategoryIds[categoryId] ?? [];

                      return (
                        <div key={category.id} className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-sm font-semibold text-gray-700">
                              Subcategorías en {category.name}
                            </h5>
                            {selectedSubCategories.length > 0 && (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                                {selectedSubCategories.length} seleccionada
                                {selectedSubCategories.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {category.subcategories.map((subCategory) => {
                              const isSelected = selectedSubCategories.includes(subCategory.id);
                              return (
                                <button
                                  key={subCategory.id}
                                  type="button"
                                  onClick={() => handleModalSubCategoryToggle(category.id, subCategory.id)}
                                  className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                                    isSelected
                                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                                  }`}
                                >
                                  <span className="font-medium">{subCategory.name}</span>
                                  {subCategory.description && (
                                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{subCategory.description}</p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <div className="text-xs text-gray-500">
                {modalCategoryIds.length > 0
                  ? `Has seleccionado ${modalCategoryIds.length} categoría${modalCategoryIds.length > 1 ? 's' : ''}.`
                  : 'Selecciona al menos una categoría para continuar.'}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  disabled={modalSaving || !modalCategoryIds.length}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold text-white transition ${
                    modalSaving || !modalCategoryIds.length
                      ? 'bg-green-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                  style={{ backgroundColor: modalSaving || !modalCategoryIds.length ? undefined : colors.mainGreen }}
                >
                  {modalSaving ? 'Guardando...' : 'Guardar selección'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

