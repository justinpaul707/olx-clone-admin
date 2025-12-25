import React from 'react';
import { Card } from '@app/components/ui/card';
import type { Property } from '@app/features/dashboard/types';

interface PropertiesTableProps {
  properties: Property[];
  isLoading?: boolean;
  onViewDetails?: (propertyId: string) => void;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  isLoading = false,
  onViewDetails
}) => {
  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SOLD':
        return 'bg-blue-100 text-blue-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Properties</h3>
        <p className="text-sm text-gray-600">Latest property listings</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Property
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-gray-900 truncate max-w-xs">
                      {property.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      {property.user.name}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-900">{property.category.name}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="font-medium text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-900">
                    {property.location.city}, {property.location.state}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-600">
                    {formatDate(property.createdAt)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  {onViewDetails && (
                    <button
                      onClick={() => onViewDetails(property.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {properties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PropertiesTable;