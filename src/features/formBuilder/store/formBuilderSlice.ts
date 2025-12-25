import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormComponent, Form } from '@app/features/formBuilder/types';

interface FormBuilderState {
  // Form Data
  currentForm: Form | null;
  formId: string | null;
  formName: string;
  formDescription: string;
  selectedCategoryId: string;
  components: FormComponent[];
  
  // UI State
  isLoading: boolean;
  isSaving: boolean;
  activeComponentId: string | null; // For drag and drop
  editingComponentId: string | null; // For the editor modal
  isComponentEditorOpen: boolean;
  isVersionHistoryOpen: boolean;
  isSettingsOpen: boolean; // Just in case we need it later
}

const initialState: FormBuilderState = {
  currentForm: null,
  formId: null,
  formName: '',
  formDescription: '',
  selectedCategoryId: '',
  components: [],
  isLoading: false,
  isSaving: false,
  activeComponentId: null,
  editingComponentId: null,
  isComponentEditorOpen: false,
  isVersionHistoryOpen: false,
  isSettingsOpen: false,
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    // Form Initialization
    initForm(state, action: PayloadAction<{ id: string; isNew: boolean }>) {
      state.formId = action.payload.isNew ? null : action.payload.id;
      // Reset state for new form, or keep existing if just switching IDs (logic can simply rest on loaded data)
      if (action.payload.isNew) {
        state.currentForm = null;
        state.formName = '';
        state.formDescription = '';
        state.selectedCategoryId = '';
        state.components = [];
      }
    },
    setFormData(state, action: PayloadAction<Form>) {
      state.currentForm = action.payload;
      state.formId = action.payload.id;
      state.formName = action.payload.name;
      state.formDescription = action.payload.description || '';
      state.selectedCategoryId = action.payload.categoryId || '';
      state.components = action.payload.components || [];
    },
    
    // Field Updates
    setFormName(state, action: PayloadAction<string>) {
      state.formName = action.payload;
    },
    setFormDescription(state, action: PayloadAction<string>) {
      state.formDescription = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategoryId = action.payload;
    },

    // Component Management
    setComponents(state, action: PayloadAction<FormComponent[]>) {
      state.components = action.payload;
    },
    addComponent(state, action: PayloadAction<FormComponent>) {
      state.components.push(action.payload);
    },
    updateComponent(state, action: PayloadAction<{ id: string; component: Partial<FormComponent> }>) {
      const index = state.components.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.components[index] = { ...state.components[index], ...action.payload.component };
      }
    },
    removeComponent(state, action: PayloadAction<string>) {
      state.components = state.components.filter(c => c.id !== action.payload);
    },
    reorderComponents(state, action: PayloadAction<FormComponent[]>) {
      state.components = action.payload;
    },

    // UI State Management
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    setActiveComponentId(state, action: PayloadAction<string | null>) {
      state.activeComponentId = action.payload;
    },
    setEditingComponentId(state, action: PayloadAction<string | null>) {
      state.editingComponentId = action.payload;
    },
    setComponentEditorOpen(state, action: PayloadAction<boolean>) {
      state.isComponentEditorOpen = action.payload;
    },
    setVersionHistoryOpen(state, action: PayloadAction<boolean>) {
      state.isVersionHistoryOpen = action.payload;
    },
    resetFormBuilder() {
        return initialState;
    }
  },
});

export const {
  initForm,
  setFormData,
  setFormName,
  setFormDescription,
  setSelectedCategory,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
  reorderComponents,
  setLoading,
  setSaving,
  setActiveComponentId,
  setEditingComponentId,
  setComponentEditorOpen,
  setVersionHistoryOpen,
  resetFormBuilder
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
