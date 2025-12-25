import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardFilters } from '@app/features/dashboard/types';

interface DashboardState {
  filters: DashboardFilters;
  selectedDateRange: {
    from: string;
    to: string;
  };
  selectedCategory: string | null;
  selectedStatus: string | null;
  isLoading: boolean;
}

const initialState: DashboardState = {
  filters: {},
  selectedDateRange: {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    to: new Date().toISOString().split('T')[0], // today
  },
  selectedCategory: null,
  selectedStatus: null,
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<DashboardFilters>) {
      state.filters = action.payload;
    },
    setDateRange(state, action: PayloadAction<{ from: string; to: string }>) {
      state.selectedDateRange = action.payload;
      state.filters.dateRange = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.filters.category = action.payload;
      } else {
        delete state.filters.category;
      }
    },
    setStatus(state, action: PayloadAction<string | null>) {
      state.selectedStatus = action.payload;
      if (action.payload) {
        state.filters.status = action.payload;
      } else {
        delete state.filters.status;
      }
    },
    setLocation(state, action: PayloadAction<string | null>) {
      if (action.payload) {
        state.filters.location = action.payload;
      } else {
        delete state.filters.location;
      }
    },
    clearFilters(state) {
      state.filters = {};
      state.selectedCategory = null;
      state.selectedStatus = null;
      // Keep date range as it's always needed
      state.filters.dateRange = state.selectedDateRange;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFilters,
  setDateRange,
  setCategory,
  setStatus,
  setLocation,
  clearFilters,
  setLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;