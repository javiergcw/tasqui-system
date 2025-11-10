import React, { useEffect, useMemo, useState } from 'react';
import type {
  EmployeeSkillCategoryItem,
  EmployeeSkillCategoryType,
  EmployeeSkillSelectionCategoryInput,
  EmployeeSkillSelectionSubcategoryInput,
  EmployeeSkillsUpsertRequest,
} from '@/models/employee/employee-skills.model';
import type { SkillCategory, SkillType } from '@/models/master/skills-complete.model';

interface HabilidadesProps {
  skillCategories?: EmployeeSkillCategoryItem[] | null;
  isLoading?: boolean;
  onDeleteSubcategory?: (subcategoryId: string) => Promise<void>;
  isDeleting?: boolean;
  onDeleteCategory?: (categoryId: string) => Promise<void>;
  isDeletingCategory?: boolean;
  availableSkillCategories?: SkillCategory[];
  isLoadingAvailableSkills?: boolean;
  onDraftSkillsChange?: (drafts: SkillDraft[]) => void;
  onSaveSkills?: (payload: EmployeeSkillsUpsertRequest) => Promise<void>;
  isSavingSkills?: boolean;
}

interface SkillDraft {
  categoryId: string;
  categoryName: string;
  categoryType: SkillType;
  subcategoryId: string;
  subcategoryName: string;
  subcategoryDescription?: string;
  level?: number;
  yearsExperience?: number;
  lastUsed?: string;
}

interface SkillSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  categories: EmployeeSkillCategoryItem[];
  isLoading?: boolean;
  onSelectSubcategory: (
    category: EmployeeSkillCategoryItem,
    subcategory: EmployeeSkillCategoryItem['subcategories'][number]
  ) => void;
  onRequestDeleteCategory?: (category: EmployeeSkillCategoryItem) => void;
  isDeletingCategory?: boolean;
  onOpenSelection?: () => void;
  selectionDisabled?: boolean;
}

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  description,
  ctaLabel,
  categories,
  isLoading,
  onSelectSubcategory,
  onRequestDeleteCategory,
  isDeletingCategory = false,
  onOpenSelection,
  selectionDisabled = false,
}) => {
  const visibleCategories = categories.filter(category => category.subcategories.length > 0);
  const hasSkills = visibleCategories.length > 0;

  return (
    <div className="rounded-xl border border-dashed border-lime-400 bg-white px-6 py-8 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          onClick={onOpenSelection}
          className="flex items-center gap-2 rounded-full border border-lime-400 px-5 py-2 text-sm font-semibold text-lime-500 transition hover:border-lime-500 hover:text-lime-600 disabled:border-slate-200 disabled:text-slate-300"
          disabled={isLoading || selectionDisabled}
        >
          <span className="text-lg">+</span>
          {ctaLabel}
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 space-y-4">
          {[0, 1].map(index => (
            <div key={index} className="animate-pulse space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="h-6 w-16 rounded-full bg-slate-200" />
                <span className="h-6 w-20 rounded-full bg-slate-200" />
                <span className="h-6 w-12 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : hasSkills ? (
        <div className="mt-6 space-y-4">
          {visibleCategories.map(category => (
            <div
              key={category.category.id}
              className="group w-full rounded-lg border border-slate-100 bg-slate-50 p-4 shadow-sm transition hover:border-lime-400 hover:bg-white"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-slate-900">{category.category.name}</h4>
                  {category.category.description && (
                    <p className="text-sm text-slate-500">{category.category.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {onRequestDeleteCategory ? (
                    <button
                      type="button"
                      onClick={event => {
                        event.stopPropagation();
                        onRequestDeleteCategory(category);
                      }}
                      disabled={isDeletingCategory}
                      className="rounded-full border border-red-200 p-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
                      aria-label={`Eliminar categoría ${category.category.name}`}
                    >
                      🗑️
                    </button>
                  ) : null}
                  <div className="text-xs font-medium uppercase tracking-wide text-lime-600 group-hover:text-lime-500">
                  {category.category.type === 'HARD' ? 'Técnica' : 'Transversal'}
                </div>
                </div>
              </div>
              {category.subcategories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.subcategories.map(item => (
                    <button
                      key={item.subcategory.id}
                      type="button"
                      onClick={() => onSelectSubcategory(category, item)}
                      className="rounded-full border border-lime-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:border-lime-400 hover:text-lime-600 focus:outline-none focus-visible:ring focus-visible:ring-lime-300"
                    >
                      {item.subcategory.name}
                      {typeof item.relationship.level === 'number' && (
                        <span className="ml-2 text-xs font-semibold text-lime-500">Nivel {item.relationship.level}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Haz clic en una habilidad para ver más detalle</span>
                <span aria-hidden="true" className="text-lime-400 transition group-hover:translate-x-1 group-hover:text-lime-500">
                  ➜
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-lime-200 bg-lime-50/40 p-6 text-center text-sm text-slate-500">
          Aún no has agregado habilidades en esta categoría. ¡Haz clic en &quot;{ctaLabel}&quot; para comenzar!
        </div>
      )}
    </div>
  );
};

const filterCategoriesByType = (
  categories: EmployeeSkillCategoryItem[] = [],
  type: EmployeeSkillCategoryType
): EmployeeSkillCategoryItem[] => categories.filter(item => item.category.type === type);

const formatDate = (isoDate?: string | null): string => {
  if (!isoDate) return 'No indicado';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'No indicado';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
};

const normalizeLastUsedDate = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const parts = value.split('-').map(part => Number.parseInt(part, 10));
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  const [year, month, day] = parts;
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

export const Habilidades: React.FC<HabilidadesProps> = ({
  skillCategories,
  isLoading = false,
  onDeleteSubcategory,
  isDeleting = false,
  onDeleteCategory,
  isDeletingCategory = false,
  availableSkillCategories = [],
  isLoadingAvailableSkills = false,
  onDraftSkillsChange,
  onSaveSkills,
  isSavingSkills = false,
}) => {
  const [selectedDetail, setSelectedDetail] = useState<{
    category: EmployeeSkillCategoryItem;
    subcategory: EmployeeSkillCategoryItem['subcategories'][number];
  } | null>(null);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectionType, setSelectionType] = useState<SkillType>('HARD');
  const [draftSkills, setDraftSkills] = useState<SkillDraft[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [categoryPendingDeletion, setCategoryPendingDeletion] = useState<{
    id: string;
    name: string;
    type: EmployeeSkillCategoryType;
  } | null>(null);
  const [subcategoryPendingDeletion, setSubcategoryPendingDeletion] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const hardSkills = filterCategoriesByType(skillCategories ?? [], 'HARD');
  const softSkills = filterCategoriesByType(skillCategories ?? [], 'SOFT');
  const hardDrafts = draftSkills.filter(draft => draft.categoryType === 'HARD');
  const softDrafts = draftSkills.filter(draft => draft.categoryType === 'SOFT');

  const handleAddDraftSkills = (drafts: SkillDraft[]) => {
    setDraftSkills(prev => {
      const draftsMap = new Map(prev.map(item => [item.subcategoryId, item]));
      drafts.forEach(draft => {
        const previous = draftsMap.get(draft.subcategoryId);
        draftsMap.set(draft.subcategoryId, {
          categoryId: draft.categoryId ?? previous?.categoryId ?? '',
          categoryName: draft.categoryName ?? previous?.categoryName ?? '',
          categoryType: draft.categoryType ?? previous?.categoryType ?? 'HARD',
          subcategoryId: draft.subcategoryId,
          subcategoryName: draft.subcategoryName ?? previous?.subcategoryName ?? '',
          subcategoryDescription: draft.subcategoryDescription ?? previous?.subcategoryDescription,
          level: draft.level ?? previous?.level ?? 3,
          yearsExperience:
            draft.yearsExperience !== undefined ? draft.yearsExperience : previous?.yearsExperience,
          lastUsed: draft.lastUsed !== undefined ? draft.lastUsed : previous?.lastUsed,
        });
      });
      const updatedDrafts = Array.from(draftsMap.values());
      onDraftSkillsChange?.(updatedDrafts);
      return updatedDrafts;
    });
  };

  const buildUpsertPayload = (drafts: SkillDraft[]): EmployeeSkillsUpsertRequest => {
    const categoryMap = new Map<string, EmployeeSkillSelectionCategoryInput>();

    drafts.forEach(draft => {
      if (!categoryMap.has(draft.categoryId)) {
        categoryMap.set(draft.categoryId, {
          category_id: draft.categoryId,
          subcategories: [],
        });
      }

      const entry = categoryMap.get(draft.categoryId);
      if (!entry) {
        return;
      }

      const subcategoryInput: EmployeeSkillSelectionSubcategoryInput = {
        subcategory_id: draft.subcategoryId,
        level: draft.level ?? 3,
        years_experience: draft.yearsExperience ?? null,
        last_used_at: normalizeLastUsedDate(draft.lastUsed),
      };

      if (!entry.subcategories) {
        entry.subcategories = [subcategoryInput];
      } else {
        entry.subcategories.push(subcategoryInput);
      }
    });

    return {
      skill_categories: Array.from(categoryMap.values()),
    };
  };

  const handleSaveDraftSkills = async () => {
    if (!onSaveSkills) {
      setSaveError('No se encuentra disponible la acción para guardar habilidades.');
      return;
    }

    if (draftSkills.length === 0) {
      setSaveError('Selecciona y configura al menos una habilidad antes de guardar.');
      return;
    }

    const payload = buildUpsertPayload(draftSkills);

    try {
      setSaveError(null);
      await onSaveSkills(payload);
      setDraftSkills(() => {
        onDraftSkillsChange?.([]);
        return [];
      });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'No se pudieron guardar las habilidades seleccionadas.');
    }
  };

  const handleRemoveDraftSkill = (subcategoryId: string) => {
    setDraftSkills(prev => {
      const updatedDrafts = prev.filter(item => item.subcategoryId !== subcategoryId);
      onDraftSkillsChange?.(updatedDrafts);
      return updatedDrafts;
    });
  };

  const handleUpdateDraftSkill = (subcategoryId: string, updates: Partial<SkillDraft>) => {
    setDraftSkills(prev => {
      const updatedDrafts = prev.map(item =>
        item.subcategoryId === subcategoryId
          ? {
              ...item,
              ...updates,
              level: updates.level ?? item.level ?? 3,
            }
          : item
      );
      onDraftSkillsChange?.(updatedDrafts);
      return updatedDrafts;
    });
  };

const handleRequestDeleteCategory = (category: EmployeeSkillCategoryItem) => {
  if (!onDeleteCategory) {
    return;
  }
  setCategoryPendingDeletion({
    id: category.category.id,
    name: category.category.name,
    type: category.category.type,
  });
};

const handleRequestDeleteSubcategory = () => {
  if (!onDeleteSubcategory || !selectedDetail) {
    return;
  }
  setSubcategoryPendingDeletion({
    id: selectedDetail.subcategory.subcategory.id,
    name: selectedDetail.subcategory.subcategory.name,
  });
};

const handleConfirmDeleteCategory = async () => {
  if (!categoryPendingDeletion || !onDeleteCategory) {
    return;
  }
  try {
    await onDeleteCategory(categoryPendingDeletion.id);
  } catch (error) {
    setSaveError(error instanceof Error ? error.message : 'Error al eliminar la categoría seleccionada.');
  } finally {
    setCategoryPendingDeletion(null);
  }
};

const handleConfirmDeleteSubcategory = async () => {
  if (!subcategoryPendingDeletion || !onDeleteSubcategory) {
    return;
  }
  try {
    await onDeleteSubcategory(subcategoryPendingDeletion.id);
    setSelectedDetail(null);
  } catch (error) {
    setSaveError(error instanceof Error ? error.message : 'Error al eliminar la habilidad seleccionada.');
  } finally {
    setSubcategoryPendingDeletion(null);
  }
};

  return (
    <div className="space-y-6">
      <SkillSection
        title="Habilidades Hard (Técnicas / Funcionales)"
        description="Gestiona tus conocimientos técnicos para destacar en los procesos de selección."
        ctaLabel="Seleccionar Habilidades"
        categories={hardSkills}
        isLoading={isLoading}
        onSelectSubcategory={(category, subcategory) => setSelectedDetail({ category, subcategory })}
        onRequestDeleteCategory={handleRequestDeleteCategory}
        isDeletingCategory={isDeletingCategory}
        selectionDisabled={isLoadingAvailableSkills}
        onOpenSelection={() => {
          setSelectionType('HARD');
          setIsSelectionModalOpen(true);
        }}
      />
      {hardDrafts.length > 0 ? (
        <DraftSkillsList
          title="Habilidades Hard seleccionadas para agregar"
          drafts={hardDrafts}
          onRemove={handleRemoveDraftSkill}
          onUpdate={handleUpdateDraftSkill}
        />
      ) : null}
      <SkillSection
        title="Habilidades Soft (Competencias Transversales / Comportamentales)"
        description="Agrega tus habilidades interpersonales y fortalezas para roles colaborativos."
        ctaLabel="Seleccionar Habilidades"
        categories={softSkills}
        isLoading={isLoading}
        onSelectSubcategory={(category, subcategory) => setSelectedDetail({ category, subcategory })}
        onRequestDeleteCategory={handleRequestDeleteCategory}
        isDeletingCategory={isDeletingCategory}
        selectionDisabled={isLoadingAvailableSkills}
        onOpenSelection={() => {
          setSelectionType('SOFT');
          setIsSelectionModalOpen(true);
        }}
      />
      {softDrafts.length > 0 ? (
        <DraftSkillsList
          title="Habilidades Soft seleccionadas para agregar"
          drafts={softDrafts}
          onRemove={handleRemoveDraftSkill}
          onUpdate={handleUpdateDraftSkill}
        />
      ) : null}

      {draftSkills.length > 0 && onSaveSkills ? (
        <div className="rounded-xl border border-lime-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Habilidades pendientes por guardar</p>
              <p className="text-xs text-slate-500">
                Ajusta el nivel, experiencia y última vez usado en la lista anterior y guarda para confirmar los cambios.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveDraftSkills}
              disabled={isSavingSkills || !onSaveSkills}
              className="flex items-center gap-2 rounded-full border border-lime-500 bg-lime-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-400"
            >
              {isSavingSkills ? 'Guardando...' : 'Guardar habilidades'}
            </button>
          </div>
          {saveError ? <p className="mt-2 text-xs text-red-500">{saveError}</p> : null}
        </div>
      ) : null}

      {selectedDetail ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setSelectedDetail(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lime-500">
                  {selectedDetail.category.category.type === 'HARD' ? 'Habilidad Técnica' : 'Habilidad Transversal'}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{selectedDetail.subcategory.subcategory.name}</h3>
                {selectedDetail.subcategory.subcategory.description && (
                  <p className="mt-2 text-sm text-slate-600">{selectedDetail.subcategory.subcategory.description}</p>
                )}
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-lime-400 hover:text-lime-500"
                onClick={() => setSelectedDetail(null)}
                aria-label="Cerrar detalle de habilidad"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-lime-600">
                  <span aria-hidden="true">★</span>
                  {typeof selectedDetail.subcategory.relationship.level === 'number'
                    ? `Nivel de Competencia: ${selectedDetail.subcategory.relationship.level}/5`
                    : 'Nivel de Competencia: No indicado'}
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-lime-100">
                  <div
                    className="h-full rounded-full bg-lime-500 transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          typeof selectedDetail.subcategory.relationship.level === 'number'
                            ? (selectedDetail.subcategory.relationship.level / 5) * 100
                            : 0
                        )
                      )}%`,
                    }}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Años de Experiencia</p>
                    <p className="mt-2 text-base font-bold text-slate-800">
                      {typeof selectedDetail.subcategory.relationship.years_experience === 'number'
                        ? selectedDetail.subcategory.relationship.years_experience
                        : 'No indicado'}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Última vez usado</p>
                    <p className="mt-2 text-base font-bold text-slate-800">
                      {selectedDetail.subcategory.relationship.last_used_at
                        ? formatDate(selectedDetail.subcategory.relationship.last_used_at)
                        : 'No indicado'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Categoría: <span className="font-semibold text-slate-600">{selectedDetail.category.category.name}</span>
                </div>
                {onDeleteSubcategory ? (
                  <button
                    type="button"
                    onClick={handleRequestDeleteSubcategory}
                    className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
                  >
                    <span aria-hidden="true">🗑️</span>
                    Eliminar habilidad
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SeleccionarHabilidadModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        categories={availableSkillCategories}
        type={selectionType}
        isLoading={isLoadingAvailableSkills}
        onAddDrafts={handleAddDraftSkills}
        existingDrafts={draftSkills}
      />

      <ConfirmDialog
        isOpen={categoryPendingDeletion !== null}
        title="Confirmar eliminación"
        description={
          categoryPendingDeletion
            ? `¿Deseas eliminar la categoría "${categoryPendingDeletion.name}" y todas sus habilidades asociadas?`
            : ''
        }
        confirmLabel="Eliminar categoría"
        onConfirm={handleConfirmDeleteCategory}
        onCancel={() => setCategoryPendingDeletion(null)}
        isProcessing={isDeletingCategory}
      />

      <ConfirmDialog
        isOpen={subcategoryPendingDeletion !== null}
        title="Eliminar habilidad"
        description={
          subcategoryPendingDeletion
            ? `¿Está seguro de eliminar la habilidad "${subcategoryPendingDeletion.name}" de tu perfil?`
            : ''
        }
        confirmLabel="Eliminar habilidad"
        onConfirm={handleConfirmDeleteSubcategory}
        onCancel={() => setSubcategoryPendingDeletion(null)}
        isProcessing={isDeleting}
      />
    </div>
  );
};

interface SeleccionarHabilidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: SkillCategory[];
  type: SkillType;
  isLoading?: boolean;
  onAddDrafts: (drafts: SkillDraft[]) => void;
  existingDrafts: SkillDraft[];
}

const SeleccionarHabilidadModal: React.FC<SeleccionarHabilidadModalProps> = ({
  isOpen,
  onClose,
  categories,
  type,
  isLoading = false,
  onAddDrafts,
  existingDrafts,
}) => {
  const filteredCategories = useMemo(
    () => categories.filter(category => category.type === type && category.subcategories.length > 0),
    [categories, type]
  );

  const existingSelections = useMemo(
    () =>
      new Set(existingDrafts.filter(draft => draft.categoryType === type).map(draft => draft.subcategoryId)),
    [existingDrafts, type]
  );

  const subcategoryMap = useMemo(() => {
    const map = new Map<
      string,
      {
        category: SkillCategory;
        subcategory: SkillCategory['subcategories'][number];
      }
    >();
    filteredCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        map.set(subcategory.id, { category, subcategory });
      });
    });
    return map;
  }, [filteredCategories]);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<Set<string>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveCategoryId(null);
      setSelectedSubcategoryIds(new Set());
      return;
    }
    const defaultCategory = filteredCategories[0] ?? null;
    setActiveCategoryId(defaultCategory?.id ?? null);
    setSelectedSubcategoryIds(new Set(existingSelections));
    setFeedbackMessage(null);
  }, [isOpen, filteredCategories, existingSelections]);

  const activeCategory = filteredCategories.find(category => category.id === activeCategoryId) ?? null;

  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategoryIds(prev => {
      const next = new Set(prev);
      if (next.has(subcategoryId)) {
        next.delete(subcategoryId);
      } else {
        next.add(subcategoryId);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedSubcategoryIds(new Set());
  };

  const handleAddSelected = () => {
    if (selectedSubcategoryIds.size === 0) {
      setFeedbackMessage('Selecciona al menos una subhabilidad antes de continuar.');
      return;
    }

    const drafts: SkillDraft[] = [];
    selectedSubcategoryIds.forEach(subcategoryId => {
      const payload = subcategoryMap.get(subcategoryId);
      if (!payload) {
        return;
      }
      const existing = existingDrafts.find(draft => draft.subcategoryId === subcategoryId);
      drafts.push({
        categoryId: payload.category.id,
        categoryName: payload.category.name,
        categoryType: payload.category.type,
        subcategoryId: payload.subcategory.id,
        subcategoryName: payload.subcategory.name,
        subcategoryDescription: payload.subcategory.description,
        level: existing?.level ?? 3,
        yearsExperience: existing?.yearsExperience,
        lastUsed: existing?.lastUsed,
      });
    });

    if (drafts.length === 0) {
      setFeedbackMessage('No se pudieron preparar las habilidades seleccionadas.');
      return;
    }

    onAddDrafts(drafts);
    setFeedbackMessage(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex w-full max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lime-500">
              Catálogo de habilidades {type === 'HARD' ? 'técnicas' : 'transversales'}
            </p>
            <h3 className="text-xl font-bold text-slate-900">Seleccionar habilidades</h3>
            {feedbackMessage ? <p className="mt-1 text-xs text-lime-600">{feedbackMessage}</p> : null}
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-lime-400 hover:text-lime-500"
            onClick={onClose}
            aria-label="Cerrar selector de habilidades"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 px-6 py-6 md:grid-cols-12">
          <aside className="md:col-span-4 h-full overflow-hidden">
            <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50">
              <div className="border-b border-slate-200 px-4 py-3">
                <h4 className="text-sm font-semibold text-slate-800">Categorías disponibles</h4>
              </div>
              <div className="flex-1 overflow-y-auto px-1 py-2">
                {isLoading ? (
                  <div className="space-y-3 px-3">
                    {[0, 1, 2].map(index => (
                      <div key={index} className="animate-pulse space-y-2 rounded-lg bg-white p-3">
                        <div className="h-4 w-2/3 rounded bg-slate-200" />
                        <div className="h-3 w-1/2 rounded bg-slate-200" />
                      </div>
                    ))}
                  </div>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map(category => {
                    const hasSelection = category.subcategories.some(sub => selectedSubcategoryIds.has(sub.id));
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategoryId(category.id)}
                        className={`w-full rounded-lg px-4 py-3 text-left transition ${
                          activeCategoryId === category.id
                            ? 'border border-lime-300 bg-white shadow'
                            : 'hover:bg-white/70'
                        }`}
                      >
                        <p className="text-sm font-semibold text-slate-900">{category.name}</p>
                        {category.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">{category.description}</p>
                        )}
                        {hasSelection ? (
                          <p className="mt-2 text-xs font-semibold text-lime-500">Incluye selección</p>
                        ) : null}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-slate-500">No se encontraron categorías.</div>
                )}
              </div>
            </div>
          </aside>

          <section className="flex h-full flex-col gap-4 overflow-hidden md:col-span-8">
            {isLoading ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-200 border-t-lime-500" />
              </div>
            ) : activeCategory ? (
              <>
                <div className="rounded-xl border border-lime-200 bg-lime-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lime-500">Subhabilidades</p>
                    <span className="text-xs text-slate-400">
                      Seleccionadas: {selectedSubcategoryIds.size}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeCategory.subcategories.map(subcategory => {
                      const isActive = selectedSubcategoryIds.has(subcategory.id);
                      return (
                        <button
                          key={subcategory.id}
                          type="button"
                          onClick={() => toggleSubcategory(subcategory.id)}
                          className={`rounded-full border px-3 py-1 text-sm transition ${
                            isActive
                              ? 'border-lime-400 bg-white text-lime-600 shadow'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-lime-300 hover:text-lime-500'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <h4 className="text-sm font-semibold text-slate-900">Subhabilidades seleccionadas</h4>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-xs font-semibold text-red-500 transition hover:text-red-600"
                    >
                      Limpiar selección
                    </button>
                  </div>
                  <div className="h-full overflow-y-auto space-y-2 px-4 py-3">
                    {selectedSubcategoryIds.size > 0 ? (
                      Array.from(selectedSubcategoryIds).map(subcategoryId => {
                        const payload = subcategoryMap.get(subcategoryId);
                        if (!payload) return null;
                        return (
                          <div
                            key={subcategoryId}
                            className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                          >
                            <div>
                              <p className="font-semibold text-slate-800">{payload.subcategory.name}</p>
                              <p className="text-xs text-slate-500">{payload.category.name}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleSubcategory(subcategoryId)}
                              className="rounded-full border border-red-200 p-1 text-xs text-red-500 transition hover:border-red-300 hover:bg-red-50"
                              aria-label="Quitar de la selección"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">
                        Aún no has seleccionado subhabilidades de esta categoría.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Selecciona una categoría para comenzar.
              </div>
            )}
          </section>
        </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50">
          <div className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-slate-500">
              Subhabilidades seleccionadas: <span className="font-semibold text-slate-700">{selectedSubcategoryIds.size}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleAddSelected}
                disabled={selectedSubcategoryIds.size === 0}
                className="rounded-full border border-lime-500 bg-lime-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-600 disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-400"
              >
                Agregar seleccionadas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DraftSkillsListProps {
  title: string;
  drafts: SkillDraft[];
  onRemove: (subcategoryId: string) => void;
  onUpdate: (subcategoryId: string, updates: Partial<SkillDraft>) => void;
}

const DraftSkillsList: React.FC<DraftSkillsListProps> = ({ title, drafts, onRemove, onUpdate }) => {
  if (drafts.length === 0) return null;

  return (
    <div className="rounded-xl border border-dashed border-lime-200 bg-lime-50/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-500">
            Estas habilidades están pendientes por confirmar. Puedes agregar o quitar varias antes de continuar.
          </p>
        </div>
        <span className="rounded-full border border-lime-200 bg-white px-3 py-1 text-xs font-semibold text-lime-600">
          {drafts.length} seleccionada{drafts.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="space-y-4">
        {drafts.map(draft => (
          <div key={draft.subcategoryId} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-lime-500">
                  {draft.categoryType === 'HARD' ? 'Habilidad Técnica' : 'Habilidad Transversal'}
                </p>
                <h5 className="text-lg font-semibold text-slate-900">{draft.subcategoryName}</h5>
                <p className="text-sm text-slate-500">{draft.categoryName}</p>
                {draft.subcategoryDescription ? (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{draft.subcategoryDescription}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onRemove(draft.subcategoryId)}
                className="self-start rounded-full border border-red-200 p-2 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50"
              >
                🗑️
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-slate-600">
                Nivel de competencia
                <div className="mt-2 flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Bajo</span>
                    <span className="font-semibold text-lime-600">{draft.level ?? 3}/5</span>
                    <span>Alto</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={draft.level ?? 3}
                    onChange={event => onUpdate(draft.subcategoryId, { level: Number(event.target.value) })}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-lime-200 accent-lime-500"
                  />
                </div>
              </label>

              <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                <label className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Años de experiencia
                  </span>
                  <div className="flex items-center gap-3">
                    <span role="img" aria-hidden="true">
                      🧳
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={draft.yearsExperience ?? ''}
                      onChange={event =>
                        onUpdate(draft.subcategoryId, {
                          yearsExperience: event.target.value === '' ? undefined : Number(event.target.value),
                        })
                      }
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="0"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Última vez usado</span>
                  <div className="flex items-center gap-3">
                    <span role="img" aria-hidden="true">
                      📅
                    </span>
                    <input
                      type="date"
                      value={draft.lastUsed ?? ''}
                      onChange={event =>
                        onUpdate(draft.subcategoryId, {
                          lastUsed: event.target.value === '' ? undefined : event.target.value,
                        })
                      }
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isProcessing?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={() => {
          if (!isProcessing) {
            onCancel();
          }
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="rounded-full border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200"
          >
            {isProcessing ? 'Procesando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

