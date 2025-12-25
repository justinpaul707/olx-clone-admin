import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetPropertiesQuery,
  useGetPropertyStatsQuery,
  useGetCategoriesQuery,
  useGetAllSubcategoriesQuery,
  useDeletePropertyMutation,
  useToggleFeaturedMutation,
  useBulkDeletePropertiesMutation,
} from '@app/features/propertyManagement/api/propertyManagementApi';
import {
  setPage,
  setSearchQuery,
  toggleFilterPanel,
  clearSelectedProperties,
} from '@app/features/propertyManagement/store/propertyManagementSlice';
import type { RootState } from '@app/app/store/store';
import { PropertiesTable } from '@app/features/propertyManagement/components/PropertiesTable';
import { PropertyFilters } from '@app/features/propertyManagement/components/PropertyFilters';
import { ThemedStatsCard } from '@app/features/propertyManagement/components/ThemedStatsCard';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import CustomPagination from '@app/components/pagination/CustomPagination';
import type { Property } from '@app/features/propertyManagement/types';
import { propertyManagementService } from '@app/features/propertyManagement/services/propertyManagementService';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Download,
  Filter,
  RefreshCw,
  Trash2,
  Home,
  TrendingUp,
  Package,
  DollarSign,
} from 'lucide-react';
import { toast } from 'react-toastify';

export const PropertyManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; property: Property | null }>({
    show: false,
    property: null,
  });

  const { filters, selectedProperties, isFilterOpen } = useSelector(
    (state: RootState) => state.propertyManagement
  );

  const { data: propertiesData, isLoading, refetch } = useGetPropertiesQuery(filters);
  const { data: stats } = useGetPropertyStatsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: subcategories = [] } = useGetAllSubcategoriesQuery();
  const [deleteProperty] = useDeletePropertyMutation();
  const [toggleFeatured] = useToggleFeaturedMutation();
  const [bulkDelete] = useBulkDeletePropertiesMutation();

  const properties = propertiesData?.properties || [];
  const totalPages = propertiesData?.totalPages || 0;
  const currentPage = propertiesData?.currentPage || 1;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleEdit = (property: Property) => {
    navigate(`/properties/${property.id}/edit`);
  };

  const handleViewDetails = (property: Property) => {
    navigate(`/properties/${property.id}`);
  };

  const confirmDelete = (property: Property) => {
    const canDelete = propertyManagementService.canDeleteProperty(property);
    if (!canDelete.canDelete) {
      toast.error(canDelete.reason);
      return;
    }
    setDeleteConfirm({ show: true, property });
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteConfirm.property) return;

    try {
      const result = await deleteProperty({ id: deleteConfirm.property.id }).unwrap();
      if (result.success) {
        toast.success(result.message || 'Property deleted successfully');
      } else {
        toast.error(result.message || 'Failed to delete property');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while deleting property';
      toast.error(errorMessage);
    } finally {
      setDeleteConfirm({ show: false, property: null });
    }
  };

  const handleToggleFeatured = async (property: Property) => {
    try {
      const result = await toggleFeatured({
        id: property.id,
        isFeatured: !property.isFeatured,
      }).unwrap();
      if (result.success) {
        toast.success(
          property.isFeatured
            ? 'Property removed from featured'
            : 'Property marked as featured'
        );
      } else {
        toast.error(result.message || 'Failed to update featured status');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating featured status';
      toast.error(errorMessage);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) {
      toast.warning('Please select properties to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
      return;
    }

    try {
      const result = await bulkDelete({ ids: selectedProperties }).unwrap();
      if (result.success) {
        toast.success(`Successfully deleted ${result.deletedCount} properties`);
        dispatch(clearSelectedProperties());
      } else {
        toast.error(result.message || 'Failed to delete properties');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while deleting properties';
      toast.error(errorMessage);
    }
  };


  const handleExport = () => {
    propertyManagementService.exportPropertiesToCSV(properties);
    toast.success('Properties exported successfully');
  };

  return (
    <div className="space-y-6 p-6 bg-background-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Property Management</h1>
          <p className="mt-1 text-text-secondary">Manage and monitor all properties</p>
        </div>
        <Button 
          onClick={() => navigate('/properties/create')}
          className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Property
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ThemedStatsCard
            title="Total Properties"
            value={stats.totalProperties}
            icon={Home}
            trend={{ value: '+12%', isPositive: true }}
            description="from last month"
          />
          <ThemedStatsCard
            title="Active Properties"
            value={stats.activeProperties}
            icon={TrendingUp}
            trend={{ value: '+8%', isPositive: true }}
            description="currently active"
          />
          <ThemedStatsCard
            title="Sold Properties"
            value={stats.soldProperties}
            icon={Package}
            trend={{ value: '+5%', isPositive: true }}
            description="this month"
          />
          <ThemedStatsCard
            title="Average Price"
            value={propertyManagementService.formatPrice(stats.averagePrice)}
            icon={DollarSign}
            trend={{ value: '+3%', isPositive: true }}
            description="market average"
          />
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search properties by title, location, or owner..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(toggleFilterPanel())}
            className={isFilterOpen ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {selectedProperties.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected ({selectedProperties.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {isFilterOpen && (
        <PropertyFilters
          categories={categories}
          subcategories={subcategories}
          onClose={() => dispatch(toggleFilterPanel())}
        />
      )}

      {/* Properties Table */}
      <PropertiesTable
        properties={properties}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        onViewDetails={handleViewDetails}
        onToggleFeatured={handleToggleFeatured}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && deleteConfirm.property && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Property</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{deleteConfirm.property.title}"? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm({ show: false, property: null })}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
