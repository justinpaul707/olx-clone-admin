import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category, Subcategory } from '@app/features/settings/types';

interface CategoryState {
  isCategoryModalOpen: boolean;
  isSubcategoryModalOpen: boolean;
  selectedCategory: Category | undefined;
  selectedSubcategory: Subcategory | undefined;
  expandedCategories: Record<string, boolean>;
}

const initialState: CategoryState = {
  isCategoryModalOpen: false,
  isSubcategoryModalOpen: false,
  selectedCategory: undefined,
  selectedSubcategory: undefined,
  expandedCategories: {},
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCategoryModalOpen = action.payload;
      if (!action.payload) {
        state.selectedCategory = undefined;
      }
    },
    setSubcategoryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSubcategoryModalOpen = action.payload;
       if (!action.payload) {
        state.selectedSubcategory = undefined;
      }
    },
    setSelectedCategory: (state, action: PayloadAction<Category | undefined>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubcategory: (state, action: PayloadAction<Subcategory | undefined>) => {
      state.selectedSubcategory = action.payload;
    },
    toggleCategoryExpand: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      state.expandedCategories[categoryId] = !state.expandedCategories[categoryId];
    },
    openCreateCategoryModal: (state) => {
        state.selectedCategory = undefined;
        state.isCategoryModalOpen = true;
    },
    openEditCategoryModal: (state, action: PayloadAction<Category>) => {
        state.selectedCategory = action.payload;
        state.isCategoryModalOpen = true;
    },
    openCreateSubcategoryModal: (state, action: PayloadAction<Category>) => {
        state.selectedCategory = action.payload;
        state.selectedSubcategory = undefined;
        state.isSubcategoryModalOpen = true;
    },
    openEditSubcategoryModal: (state, action: PayloadAction<Subcategory>) => {
        state.selectedSubcategory = action.payload;
        state.isSubcategoryModalOpen = true;
    }
  },
});

export const {
  setCategoryModalOpen,
  setSubcategoryModalOpen,
  setSelectedCategory,
  setSelectedSubcategory,
  toggleCategoryExpand,
  openCreateCategoryModal,
  openEditCategoryModal,
  openCreateSubcategoryModal,
  openEditSubcategoryModal
} = categorySlice.actions;

export default categorySlice.reducer;
