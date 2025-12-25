import React from 'react';
import type { Property } from '@app/features/propertyManagement/types';
import { propertyManagementService } from '@app/features/propertyManagement/services/propertyManagementService';
import { Button } from '@app/components/ui/button';
import { Edit, Trash2, Eye, Star, StarOff, MapPin } from 'lucide-react';
import { DataTable } from '@app/components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@app/lib/utils';

interface PropertiesTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
  onViewDetails: (property: Property) => void;
  onToggleFeatured: (property: Property) => void;
  isLoading?: boolean;
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  onEdit,
  onDelete,
  onViewDetails,
  onToggleFeatured,
  isLoading = false,
}) => {
  const columns: ColumnDef<Property>[] = [
    {
      id: 'property',
      header: 'Property',
      cell: ({ row }) => {
        const property = row.original;
        const featuredImage = propertyManagementService.getFeaturedImage(property);
        return (
          <div className="flex items-center gap-3">
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={property.title}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                No Image
              </div>
            )}
            <div className="max-w-xs">
              <div className="font-medium text-gray-900 truncate">
                {property.title}
                {property.isFeatured && (
                  <Star className="inline ml-1 h-3 w-3 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              {property.condition && (
                <div className="text-xs text-gray-500">
                  {propertyManagementService.getConditionLabel(property.condition)}
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-gray-900">
            {propertyManagementService.formatPrice(row.original.price, row.original.currency)}
          </div>
          {row.original.isNegotiable && (
            <div className="text-xs text-blue-600">Negotiable</div>
          )}
        </div>
      ),
    },
    {
      header: 'Location',
      id: 'location',
      cell: ({ row }) => {
        const property = row.original;
        const locationString = propertyManagementService.getLocationString(property);
        return (
          <div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="truncate max-w-[150px]" title={locationString}>
                {property.location?.city || 'N/A'}
              </span>
            </div>
            {property.location?.state && (
              <div className="text-xs text-gray-500">{property.location.state}</div>
            )}
          </div>
        );
      },
    },
    {
      header: 'Owner',
      accessorKey: 'owner',
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-gray-900">{row.original.owner?.fullName || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.original.owner?.email}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-gray-900">{row.original.category?.name || 'N/A'}</div>
          {row.original.subcategory && (
            <div className="text-xs text-gray-500">{row.original.subcategory.name}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const property = row.original;
        const statusColor = propertyManagementService.getStatusColor(property.status);
        return (
          <span
            className={cn(
              'inline-flex rounded-md border px-2 py-1 text-xs font-medium',
              statusColor
            )}
          >
            {propertyManagementService.getStatusLabel(property.status)}
          </span>
        );
      },
    },
    {
      header: 'Stats',
      id: 'stats',
      cell: ({ row }) => (
        <div className="text-xs text-gray-600 space-y-1">
          <div>👁️ {row.original.views || 0} views</div>
          <div>💬 {row.original.chats || 0} chats</div>
          <div>❤️ {row.original.favorites || 0} favorites</div>
        </div>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
          {row.original.expiresAt && (
            <div className="text-xs text-red-600">
              Expires: {new Date(row.original.expiresAt).toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(property)}
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(property)}
              title="Edit Property"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFeatured(property)}
              title={property.isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
              className={property.isFeatured ? 'text-yellow-600' : 'text-gray-600'}
            >
              {property.isFeatured ? (
                <Star className="h-4 w-4 fill-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(property)}
              title="Delete Property"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={properties}
      columns={columns}
      isLoading={isLoading}
      loadingMessage="Loading properties..."
      emptyMessage="No properties found"
    />
  );
};
