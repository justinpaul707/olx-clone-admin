import React from 'react';
import { Card } from '@app/components/ui/card';
import { useAppSelector, useAppDispatch } from '@app/app/store/store';
import { setDateRange, setCategory, setStatus, clearFilters } from '@app/features/dashboard/store/dashboardSlice';
import type { Category } from '@app/features/dashboard/types';

interface DashboardFiltersProps {
  categories: Category[];
  onFiltersChange?: () => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  categories,
  onFiltersChange
}) => {
  const dispatch = useAppDispatch();
  const { selectedDateRange, selectedCategory, selectedStatus } = useAppSelector(
    (state) => state.dashboard
  );

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'SOLD', label: 'Sold' },
    { value: 'INACTIVE', label: 'Inactive' },
  ];

  const handleDateRangeChange = (field: 'from' | 'to', value: string) => {
    const newRange = {
      ...selectedDateRange,
      [field]: value,
    };
    dispatch(setDateRange(newRange));
    onFiltersChange?.();
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value || null));
    onFiltersChange?.();
  };

  const handleStatusChange = (value: string) => {
    dispatch(setStatus(value || null));
    onFiltersChange?.();
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    onFiltersChange?.();
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={selectedDateRange.from}
            onChange={(e) => handleDateRangeChange('from', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={selectedDateRange.to}
            onChange={(e) => handleDateRangeChange('to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus || ''}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};

export default DashboardFilters;