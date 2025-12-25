import React, { useState } from 'react';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { useGetReportsQuery } from '../api/reportsApi';
import type { ReportFilters } from '../types';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

export const ReportsPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
  });
  const [isCompareMode, setIsCompareMode] = useState(false);

  const { data: reportData, isLoading, refetch } = useGetReportsQuery(filters);

  const handleFilterChange = (key: keyof ReportFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [type]: value },
    }));
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    toast.info(`Exporting report as ${type.toUpperCase()}...`);
    // Mock export logic
    setTimeout(() => {
        toast.success(`Report exported successfully!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6 bg-background-primary min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Reports & Analytics</h1>
          <p className="mt-1 text-text-secondary">Analyze performance and trends</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
            </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-surface-base border border-border-primary rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
            </h3>
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Date Range</label>
                <div className="flex gap-2">
                    <Input 
                        type="date" 
                        value={filters.dateRange.startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                    />
                    <span className="self-center">-</span>
                    <Input 
                        type="date" 
                        value={filters.dateRange.endDate}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                    />
                </div>
            </div>
            
             <div>
                <label className="block text-sm font-medium mb-1">Filter by Location</label>
                <Input 
                    placeholder="Enter city or region"
                    value={filters.location || ''}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Filter by User ID</label>
                <Input 
                    placeholder="User ID"
                    value={filters.userId || ''}
                    onChange={(e) => handleFilterChange('userId', e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 pt-6">
                <input 
                    type="checkbox" 
                    id="compareMode"
                    checked={isCompareMode}
                    onChange={(e) => setIsCompareMode(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="compareMode" className="text-sm font-medium">Compare with Previous Year</label>
            </div>
        </div>
      </div>

      {/* Reports Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Summary Cards */}
          <div className="bg-surface-base p-6 rounded-lg border border-border-primary">
              <div className="text-sm text-text-secondary">Total Revenue</div>
              <div className="text-2xl font-bold mt-2">$ {reportData?.summary.totalRevenue.toLocaleString() || '---'}</div>
          </div>
          <div className="bg-surface-base p-6 rounded-lg border border-border-primary">
             <div className="text-sm text-text-secondary">Total Listings</div>
             <div className="text-2xl font-bold mt-2">{reportData?.summary.totalListings.toLocaleString() || '---'}</div>
          </div>
           <div className="bg-surface-base p-6 rounded-lg border border-border-primary">
             <div className="text-sm text-text-secondary">Active Users</div>
             <div className="text-2xl font-bold mt-2">{reportData?.summary.totalUsers.toLocaleString() || '---'}</div>
          </div>
           <div className="bg-surface-base p-6 rounded-lg border border-border-primary">
             <div className="text-sm text-text-secondary">Growth</div>
             <div className="text-2xl font-bold mt-2 text-green-600">+{reportData?.summary.growth || 0}%</div>
          </div>
      </div>

      {isLoading ? (
          <div className="text-center py-12">Loading report data...</div>
      ) : (
          <div className="bg-surface-base border border-border-primary rounded-lg p-6 min-h-[400px]">
              <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
              {/* Placeholder for Chart */}
              <div className="flex items-center justify-center h-[300px] bg-gray-50 border border-dashed border-gray-200 rounded">
                  <p className="text-gray-500">Chart Visualization Area (Revenue / Listings trend over time)</p>
                  {isCompareMode && <p className="ml-2 text-brand-primary">(Comparison Mode Active)</p>}
              </div>
              
              <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Detailed Data</h3>
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                              <tr>
                                  <th className="px-6 py-3">Date</th>
                                  <th className="px-6 py-3">Revenue</th>
                                  <th className="px-6 py-3">New Listings</th>
                                  <th className="px-6 py-3">Active Users</th>
                              </tr>
                          </thead>
                          <tbody>
                              {reportData?.performance.map((item, idx) => (
                                  <tr key={idx} className="border-b">
                                      <td className="px-6 py-4">{item.date}</td>
                                      <td className="px-6 py-4">${item.revenue.toLocaleString()}</td>
                                      <td className="px-6 py-4">{item.newListings}</td>
                                      <td className="px-6 py-4">{item.activeUsers}</td>
                                  </tr>
                              ))}
                              {!reportData?.performance.length && (
                                  <tr>
                                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No data available for selected period</td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
