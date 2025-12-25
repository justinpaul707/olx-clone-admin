import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  useGetPropertiesQuery, 
  useDeletePropertyMutation, 
  useToggleFeaturedMutation
} from '@app/features/propertyManagement/api/propertyManagementApi';
import { useGetUserDetailsQuery } from '@app/features/userManagement/api/userManagementApi';
import { PropertiesTable } from '@app/features/propertyManagement/components/PropertiesTable';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { type Property, PropertyStatus } from '@app/features/propertyManagement/types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@app/app/store/store';
import { 
  setStatusFilter, 
  setDateRangeFilter, 
  resetFilters,
  setUserFilter
} from '@app/features/propertyManagement/store/propertyManagementSlice';

export const UserPropertiesPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const propertyState = useAppSelector((state) => state.propertyManagement);
  const filters = propertyState?.filters || { page: 1, limit: 10 };

  React.useEffect(() => {
    // Set user filter when mounting or userId changes
    if (userId) {
      dispatch(setUserFilter(userId));
    }
    return () => {
      // Clear filters when unmounting
      dispatch(resetFilters());
    };
  }, [dispatch, userId]);

  const { data: userDetails, isLoading: isUserLoading } = useGetUserDetailsQuery(userId || '', { 
    skip: !userId 
  });
  
  const { data: propertiesData, isLoading: isPropertiesLoading, refetch } = useGetPropertiesQuery(filters, {
    skip: !userId,
  });

  const [deleteProperty] = useDeletePropertyMutation();
  const [toggleFeatured] = useToggleFeaturedMutation();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value as PropertyStatus || undefined));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRangeFilter({ startDate: e.target.value, endDate: filters.endDate }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRangeFilter({ startDate: filters.startDate, endDate: e.target.value }));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
    if (userId) {
       dispatch(setUserFilter(userId));
    }
  };

  const handleEdit = (property: Property) => {
    // Navigate to edit page or open modal
    // Assuming we have an edit page structure like /properties/:id/edit
    navigate(`/properties/${property.id}/edit`);
  };

  const handleDelete = async (property: Property) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty({ id: property.id }).unwrap();
        toast.success('Property deleted successfully');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete property');
      }
    }
  };

  const handleViewDetails = (property: Property) => {
    navigate(`/properties/${property.id}`);
  };

  const handleToggleFeatured = async (property: Property) => {
    try {
      await toggleFeatured({ id: property.id, isFeatured: !property.isFeatured }).unwrap();
      toast.success(`Property ${property.isFeatured ? 'removed from' : 'marked as'} featured`);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update featured status');
    }
  };

  const properties = propertiesData?.properties || [];

  return (
    <div className="space-y-6 p-6 bg-background-primary">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            {isUserLoading ? 'Loading user...' : `${userDetails?.user?.profile?.fullName || userDetails?.user?.email || 'User'}'s Properties`}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage properties owned by this user
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1 min-w-[200px]">
           <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
           <select 
             className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={filters.status || ''}
             onChange={handleStatusChange}
           >
             <option value="">All Statuses</option>
             {Object.values(PropertyStatus).map((s) => (
               <option key={s} value={s}>{s}</option>
             ))}
           </select>
        </div>
        
        <div>
           <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
           <Input 
             type="date" 
             value={filters.startDate || ''} 
             onChange={handleStartDateChange} 
             className="w-[180px]"
           />
        </div>

        <div>
           <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
           <Input 
             type="date" 
             value={filters.endDate || ''} 
             onChange={handleEndDateChange} 
             className="w-[180px]"
           />
        </div>

        <Button variant="outline" size="icon" onClick={() => refetch()} title="Refresh">
            <RefreshCw className="h-4 w-4" />
        </Button>

        <Button 
            variant="ghost" 
            onClick={handleClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
            Clear Filters
        </Button>
      </div>

      {/* Table */}
      <PropertiesTable
        properties={properties}
        isLoading={isPropertiesLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
        onToggleFeatured={handleToggleFeatured}
      />
    </div>
  );
};
