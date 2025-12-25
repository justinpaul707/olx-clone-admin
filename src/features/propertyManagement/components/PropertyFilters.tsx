import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/app/store/store';
import {
  setStatusFilter,
  setCategoryFilter,
  setSubcategoryFilter,
  setUserFilter,
  setCityFilter,
  setStateFilter,
  setCountryFilter,
  setDateRangeFilter,
  setPriceRangeFilter,
  resetFilters,
} from '@app/features/propertyManagement/store/propertyManagementSlice';
import { PropertyStatus } from '@app/features/propertyManagement/types';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { X, Filter } from 'lucide-react';

interface PropertyFiltersProps {
  categories: Array<{ id: string; name: string }>;
  subcategories: Array<{ id: string; name: string; categoryId?: string }>;
  onClose?: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  categories,
  subcategories,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.propertyManagement);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => dispatch(setStatusFilter(e.target.value ? (e.target.value as PropertyStatus) : undefined))}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {Object.values(PropertyStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={filters.categoryId || ''}
            onChange={(e) => {
              dispatch(setCategoryFilter(e.target.value || undefined));
              if (!e.target.value) {
                dispatch(setSubcategoryFilter(undefined));
              }
            }}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        {filters.categoryId && (
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <select
              id="subcategory"
              value={filters.subcategoryId || ''}
              onChange={(e) => dispatch(setSubcategoryFilter(e.target.value || undefined))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subcategories</option>
              {subcategories
                .filter((sub) => sub.categoryId === filters.categoryId)
                .map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Location Filters */}
        <div className="space-y-3">
          <Label>Location</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="text"
                placeholder="City"
                value={filters.city || ''}
                onChange={(e) => dispatch(setCityFilter(e.target.value || undefined))}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="State"
                value={filters.state || ''}
                onChange={(e) => dispatch(setStateFilter(e.target.value || undefined))}
              />
            </div>
          </div>
          <Input
            type="text"
            placeholder="Country"
            value={filters.country || ''}
            onChange={(e) => dispatch(setCountryFilter(e.target.value || undefined))}
          />
        </div>

        {/* User/Owner Filter */}
        <div>
          <Label htmlFor="owner">Owner ID</Label>
          <Input
            id="owner"
            type="text"
            placeholder="Enter user ID"
            value={filters.ownerId || ''}
            onChange={(e) => dispatch(setUserFilter(e.target.value || undefined))}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice?.toString() || ''}
              onChange={(e) =>
                dispatch(
                  setPriceRangeFilter({
                    minPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                    maxPrice: filters.maxPrice,
                  })
                )
              }
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice?.toString() || ''}
              onChange={(e) =>
                dispatch(
                  setPriceRangeFilter({
                    minPrice: filters.minPrice,
                    maxPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                )
              }
            />
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div>
              <Input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) =>
                  dispatch(
                    setDateRangeFilter({
                      startDate: e.target.value || undefined,
                      endDate: filters.endDate,
                    })
                  )
                }
              />
              <span className="text-xs text-gray-500">From</span>
            </div>
            <div>
              <Input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) =>
                  dispatch(
                    setDateRangeFilter({
                      startDate: filters.startDate,
                      endDate: e.target.value || undefined,
                    })
                  )
                }
              />
              <span className="text-xs text-gray-500">To</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={onClose} className="flex-1">
          Close
        </Button>
        <Button onClick={handleResetFilters} variant="outline" className="flex-1">
          Reset All
        </Button>
      </div>
    </div>
  );
};
