import React from 'react';
import { useAppSelector } from '@app/app/store/store';
import { 
  useGetDashboardStatsQuery,
  useGetPropertiesQuery,
  useGetCategoriesQuery 
} from '@app/features/dashboard/api/dashboardApi';
import StatsCard from '@app/features/dashboard/components/StatsCard';
import PropertiesTable from '@app/features/dashboard/components/PropertiesTable';
import DashboardFilters from '@app/features/dashboard/components/DashboardFilters';

// Mock icons - you can replace these with actual icon components
const HomeIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const DashboardPage: React.FC = () => {
  const { filters } = useAppSelector((state) => state.dashboard);
  
  // Fetch dashboard data
  const { 
    data: stats, 
    isLoading: statsLoading, 
    refetch: refetchStats 
  } = useGetDashboardStatsQuery(filters);
  
  const { 
    data: properties, 
    isLoading: propertiesLoading,
    refetch: refetchProperties 
  } = useGetPropertiesQuery({ 
    page: 1, 
    limit: 10, 
    filters 
  });
  
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useGetCategoriesQuery();

  const handleFiltersChange = () => {
    refetchStats();
    refetchProperties();
  };

  const handleViewProperty = (propertyId: string) => {
    console.log('View property:', propertyId);
    // TODO: Navigate to property details page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OLX Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your marketplace performance and analytics</p>
        </div>

        {/* Filters */}
        {!categoriesLoading && categories && (
          <DashboardFilters 
            categories={categories} 
            onFiltersChange={handleFiltersChange}
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Properties"
            value={stats?.totalProperties || 0}
            icon={<HomeIcon />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Users"
            value={stats?.totalUsers || 0}
            icon={<UsersIcon />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Categories"
            value={stats?.totalCategories || 0}
            icon={<CategoryIcon />}
          />
          <StatsCard
            title="Total Revenue"
            value={stats?.totalRevenue || 0}
            icon={<RevenueIcon />}
            format="currency"
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard
            title="Active Listings"
            value={stats?.activeListings || 0}
            icon={<HomeIcon />}
          />
          <StatsCard
            title="Pending Approvals"
            value={stats?.pendingApprovals || 0}
            icon={<CategoryIcon />}
          />
        </div>

        {/* Properties Table */}
        <div className="mb-8">
          <PropertiesTable
            properties={properties?.data || []}
            isLoading={propertiesLoading || statsLoading}
            onViewDetails={handleViewProperty}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                View All Properties
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                Manage Categories
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                User Management
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>New property submitted</p>
              <p>User registered</p>
              <p>Category updated</p>
              <p>Property approved</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="text-sm text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm text-green-600 font-medium">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;