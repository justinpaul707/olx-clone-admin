import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Property, PropertyListParams } from '@app/features/propertyManagement/types';
import { PropertyStatus } from '@app/features/propertyManagement/types';

interface PropertyManagementState {
  selectedProperties: string[];
  filters: PropertyListParams;
  selectedProperty: Property | null;
  isFilterOpen: boolean;
}

const initialState: PropertyManagementState = {
  selectedProperties: [],
  filters: {
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  selectedProperty: null,
  isFilterOpen: false,
};

const propertyManagementSlice = createSlice({
  name: 'propertyManagement',
  initialState,
  reducers: {
    setSelectedProperties(state, action: PayloadAction<string[]>) {
      state.selectedProperties = action.payload;
    },
    togglePropertySelection(state, action: PayloadAction<string>) {
      const propertyId = action.payload;
      const index = state.selectedProperties.indexOf(propertyId);
      if (index > -1) {
        state.selectedProperties.splice(index, 1);
      } else {
        state.selectedProperties.push(propertyId);
      }
    },
    clearSelectedProperties(state) {
      state.selectedProperties = [];
    },
    setFilters(state, action: PayloadAction<Partial<PropertyListParams>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.filters.page = 1; // Reset to first page on search
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.filters.limit = action.payload;
      state.filters.page = 1; // Reset to first page on page size change
    },
    setStatusFilter(state, action: PayloadAction<PropertyStatus | undefined>) {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.categoryId = action.payload;
      state.filters.page = 1;
    },
    setSubcategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.subcategoryId = action.payload;
      state.filters.page = 1;
    },
    setLocationFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.locationId = action.payload;
      state.filters.page = 1;
    },
    setUserFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.ownerId = action.payload;
      state.filters.page = 1;
    },
    setCityFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.city = action.payload;
      state.filters.page = 1;
    },
    setStateFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.state = action.payload;
      state.filters.page = 1;
    },
    setCountryFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.country = action.payload;
      state.filters.page = 1;
    },
    setDateRangeFilter(
      state,
      action: PayloadAction<{ startDate?: string; endDate?: string }>
    ) {
      state.filters.startDate = action.payload.startDate;
      state.filters.endDate = action.payload.endDate;
      state.filters.page = 1;
    },
    setPriceRangeFilter(
      state,
      action: PayloadAction<{ minPrice?: number; maxPrice?: number }>
    ) {
      state.filters.minPrice = action.payload.minPrice;
      state.filters.maxPrice = action.payload.maxPrice;
      state.filters.page = 1;
    },
    setSorting(state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    setSelectedProperty(state, action: PayloadAction<Property | null>) {
      state.selectedProperty = action.payload;
    },
    toggleFilterPanel(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setFilterPanelOpen(state, action: PayloadAction<boolean>) {
      state.isFilterOpen = action.payload;
    },
  },
});

export const {
  setSelectedProperties,
  togglePropertySelection,
  clearSelectedProperties,
  setFilters,
  resetFilters,
  setSearchQuery,
  setPage,
  setPageSize,
  setStatusFilter,
  setCategoryFilter,
  setSubcategoryFilter,
  setLocationFilter,
  setUserFilter,
  setCityFilter,
  setStateFilter,
  setCountryFilter,
  setDateRangeFilter,
  setPriceRangeFilter,
  setSorting,
  setSelectedProperty,
  toggleFilterPanel,
  setFilterPanelOpen,
} = propertyManagementSlice.actions;

export default propertyManagementSlice.reducer;
