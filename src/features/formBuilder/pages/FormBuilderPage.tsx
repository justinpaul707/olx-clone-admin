import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '@app/app/store/store';
import {
  initForm,
  setFormData,
  setFormName,
  setFormDescription,
  setSelectedCategory,
  addComponent as addComponentAction,
  updateComponent as updateComponentAction,
  removeComponent,
  reorderComponents as reorderComponentsAction,
  setEditingComponentId,
  setComponentEditorOpen,
  setVersionHistoryOpen,
} from '@app/features/formBuilder/store/formBuilderSlice';
import {
  useGetFormQuery,
  useGetFormVersionsQuery,
  useUpdateFormMutation,
  useAddComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  useReorderComponentsMutation,
  usePublishFormMutation,
  useSaveAsDraftMutation,
  useAssignFormToCategoryMutation,
} from '@app/features/formBuilder/api/formBuilderApi';
import { useGetCategoriesQuery } from '@app/features/settings/api/settingsApi';
import { ComponentEditor } from '@app/features/formBuilder/components/ComponentEditor';
import { ComponentItem } from '@app/features/formBuilder/components/ComponentItem';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import {
  ArrowLeft,
  Save,
  Upload as PublishIcon,
  Plus,
  Eye,
  History,
} from 'lucide-react';
import { toast } from 'react-toastify';
import type { FormComponent } from '@app/features/formBuilder/types';

export const FormBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isNewForm = id === 'new';

  // Selectors
  const {
    formName,
    formDescription,
    selectedCategoryId,
    components,
    isComponentEditorOpen,
    editingComponentId,
    isVersionHistoryOpen,
  } = useAppSelector((state) => state.formBuilder);

  const editingComponent = editingComponentId 
    ? components.find(c => c.id === editingComponentId) 
    : undefined;

  // Fetch form data
  const { data: form, isLoading: isLoadingForm } = useGetFormQuery(id!, {
    skip: isNewForm,
  });
  const { data: categories } = useGetCategoriesQuery();
  const { data: versions } = useGetFormVersionsQuery(id!, {
    skip: isNewForm,
  });

  // Mutations
  const [updateForm] = useUpdateFormMutation();
  const [addComponent] = useAddComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();
  const [deleteComponent] = useDeleteComponentMutation();
  const [reorderComponents] = useReorderComponentsMutation();
  const [publishForm] = usePublishFormMutation();
  const [saveAsDraft] = useSaveAsDraftMutation();
  const [assignFormToCategory] = useAssignFormToCategoryMutation();

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize form
  useEffect(() => {
    if (id) {
      dispatch(initForm({ id, isNew: isNewForm }));
    }
  }, [id, isNewForm, dispatch]);

  // Load form data when fetched
  useEffect(() => {
    if (form) {
      dispatch(setFormData(form));
    }
  }, [form, dispatch]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);

      const newComponents = arrayMove(components, oldIndex, newIndex);
      dispatch(reorderComponentsAction(newComponents));

      if (!isNewForm) {
        try {
          await reorderComponents({
            formId: id!,
            componentIds: newComponents.map((c) => c.id),
          }).unwrap();
          toast.success('Components reordered');
        } catch (error: any) {
          toast.error(error?.message || 'Failed to reorder components');
        }
      }
    }
  };

  const handleSaveFormDetails = async () => {
    if (!formName.trim()) {
      toast.error('Form name is required');
      return;
    }

    try {
      await updateForm({
        id: id!,
        name: formName,
        description: formDescription,
        categoryId: selectedCategoryId || undefined,
      }).unwrap();
      toast.success('Form details updated');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update form');
    }
  };

  const handleAddComponent = async (componentData: Omit<FormComponent, 'id' | 'order'>) => {
    if (isNewForm) {
      // For new forms, add to local state via Redux
      const newComponent: FormComponent = {
        ...componentData,
        id: `temp-${Date.now()}`,
        order: components.length,
      };
      dispatch(addComponentAction(newComponent));
      dispatch(setComponentEditorOpen(false));
      toast.success('Component added');
    } else {
      try {
        const result = await addComponent({
          formId: id!,
          component: componentData,
        }).unwrap();
        // Optimistic update or state sync happens via invalidation, but we can also update locally if needed
        // Assuming the mutation returns the new component, we could add it. 
        // But since we invalidate 'Form', the query will refetch and update store via useEffect.
        // For smoother UX, we might want to manually add it to store too if response has it.
        if (result.component) {
             dispatch(addComponentAction(result.component));
        }
        dispatch(setComponentEditorOpen(false));
        toast.success('Component added successfully');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to add component');
      }
    }
  };

  const handleEditComponent = (component: FormComponent) => {
    dispatch(setEditingComponentId(component.id));
    dispatch(setComponentEditorOpen(true));
  };

  const handleUpdateComponent = async (componentData: Omit<FormComponent, 'id' | 'order'>) => {
    if (!editingComponentId) return;

    if (isNewForm || editingComponentId.startsWith('temp-')) {
      // Update local Redux state for new forms
      dispatch(updateComponentAction({ id: editingComponentId, component: componentData }));
      dispatch(setComponentEditorOpen(false));
      dispatch(setEditingComponentId(null));
      toast.success('Component updated');
    } else {
      try {
        const result = await updateComponent({
          formId: id!,
          componentId: editingComponentId,
          component: componentData,
        }).unwrap();
        
        if (result.component) {
            dispatch(updateComponentAction({ id: editingComponentId, component: result.component }));
        }
        
        dispatch(setComponentEditorOpen(false));
        dispatch(setEditingComponentId(null));
        toast.success('Component updated successfully');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to update component');
      }
    }
  };

  const handleDeleteComponent = async (componentId: string) => {
    if (!confirm('Are you sure you want to delete this component?')) return;

    if (isNewForm || componentId.startsWith('temp-')) {
      dispatch(removeComponent(componentId));
      toast.success('Component removed');
    } else {
      try {
        await deleteComponent({
          formId: id!,
          componentId,
        }).unwrap();
        // Ideally we wait for refetch, but we can optimistically remove
        dispatch(removeComponent(componentId));
        toast.success('Component deleted successfully');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete component');
      }
    }
  };

  const handlePublish = async () => {
    if (!id || isNewForm) {
      toast.error('Please save the form first');
      return;
    }

    if (components.length === 0) {
      toast.error('Add at least one component before publishing');
      return;
    }

    try {
      await publishForm({ id }).unwrap();
      toast.success('Form published successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to publish form');
    }
  };

  const handleSaveAsDraft = async () => {
    if (!id || isNewForm) {
      toast.error('Please create the form first');
      return;
    }

    try {
      await saveAsDraft({ id }).unwrap();
      toast.success('Form saved as draft');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save as draft');
    }
  };

  const handleAssignCategory = async (categoryId: string) => {
    if (!id || isNewForm) return;

    try {
      await assignFormToCategory({
        formId: id,
        categoryId,
      }).unwrap();
      dispatch(setSelectedCategory(categoryId));
      toast.success('Category assigned');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to assign category');
    }
  };

  if (isLoadingForm) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface-base border-b border-border-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings/forms')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {isNewForm ? 'Create New Form' : formName || 'Edit Form'}
                </h1>
                <p className="text-sm text-text-secondary">
                  {form?.status && (
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        form.status === 'PUBLISHED'
                          ? 'bg-status-success/10 text-status-success'
                          : form.status === 'DRAFT'
                          ? 'bg-status-warning/10 text-status-warning'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {form.status}
                    </span>
                  )}
                  {form?.version && (
                    <span className="ml-2 text-text-tertiary">
                      Version {form.version}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isNewForm && (
                <>
                  <Button variant="outline" size="sm" onClick={() => dispatch(setVersionHistoryOpen(true))}>
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveAsDraft}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button 
                    onClick={handlePublish}
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
                  >
                    <PublishIcon className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Details */}
          <div className="lg:col-span-1">
            <div className="bg-surface-base border border-border-primary rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Form Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Form Name *
                  </label>
                  <Input
                    type="text"
                    value={formName}
                    onChange={(e) => dispatch(setFormName(e.target.value))}
                    placeholder="e.g., Property Listing Form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => dispatch(setFormDescription(e.target.value))}
                    placeholder="Describe this form"
                    className="w-full px-3 py-2 border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Assign to Category
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      if (isNewForm) {
                        dispatch(setSelectedCategory(categoryId));
                      } else {
                        handleAssignCategory(categoryId);
                      }
                    }}
                    className="w-full px-3 py-2 border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base"
                  >
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {!isNewForm && (
                  <Button onClick={handleSaveFormDetails} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Details
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Form Builder */}
          <div className="lg:col-span-2">
            <div className="bg-surface-base border border-border-primary rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">
                  Form Components ({components.length})
                </h2>
                <Button 
                  onClick={() => {
                    dispatch(setEditingComponentId(null));
                    dispatch(setComponentEditorOpen(true));
                  }}
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              </div>

              {components.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border-primary rounded-lg">
                  <Eye className="h-12 w-12 mx-auto text-text-tertiary mb-4" />
                  <p className="text-text-secondary mb-4">No components yet</p>
                  <Button 
                    onClick={() => dispatch(setComponentEditorOpen(true))}
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Component
                  </Button>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={components.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {components.map((component) => (
                        <ComponentItem
                          key={component.id}
                          component={component}
                          onEdit={handleEditComponent}
                          onDelete={handleDeleteComponent}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Component Editor Modal */}
      {isComponentEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingComponent ? 'Edit Component' : 'Add Component'}
            </h2>
            <ComponentEditor
              component={editingComponent}
              onSave={editingComponent ? handleUpdateComponent : handleAddComponent}
              onCancel={() => {
                dispatch(setComponentEditorOpen(false));
                dispatch(setEditingComponentId(null));
              }}
            />
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {isVersionHistoryOpen && versions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Version History</h2>
              <Button variant="ghost" onClick={() => dispatch(setVersionHistoryOpen(false))}>
                Close
              </Button>
            </div>
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="border border-border-primary rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Version {version.version}</h3>
                    <span className="text-sm text-text-secondary">
                      {new Date(version.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {version.components.length} components
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
