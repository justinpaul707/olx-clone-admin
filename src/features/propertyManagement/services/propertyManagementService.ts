import type { Property } from '@app/features/propertyManagement/types';
import { PropertyStatus, PropertyCondition } from '@app/features/propertyManagement/types';

export const propertyManagementService = {
  // Helper functions for property status
  isPropertyActive: (property: Property): boolean => {
    return property.status === PropertyStatus.ACTIVE;
  },

  isPropertyInactive: (property: Property): boolean => {
    return property.status === PropertyStatus.INACTIVE;
  },

  isPropertySold: (property: Property): boolean => {
    return property.status === PropertyStatus.SOLD;
  },

  isPropertyExpired: (property: Property): boolean => {
    if (property.status === PropertyStatus.EXPIRED) return true;
    if (property.expiresAt) {
      return new Date(property.expiresAt) < new Date();
    }
    return false;
  },

  getStatusColor: (status: PropertyStatus): string => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return 'text-green-600 bg-green-50 border-green-200';
      case PropertyStatus.INACTIVE:
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case PropertyStatus.PENDING:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case PropertyStatus.SOLD:
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case PropertyStatus.EXPIRED:
        return 'text-red-600 bg-red-50 border-red-200';
      case PropertyStatus.REJECTED:
        return 'text-red-700 bg-red-100 border-red-300';
      case PropertyStatus.DRAFT:
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  },

  getStatusLabel: (status: PropertyStatus): string => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return 'Active';
      case PropertyStatus.INACTIVE:
        return 'Inactive';
      case PropertyStatus.PENDING:
        return 'Pending';
      case PropertyStatus.SOLD:
        return 'Sold';
      case PropertyStatus.EXPIRED:
        return 'Expired';
      case PropertyStatus.REJECTED:
        return 'Rejected';
      case PropertyStatus.DRAFT:
        return 'Draft';
      default:
        return 'Unknown';
    }
  },

  getConditionColor: (condition?: PropertyCondition): string => {
    switch (condition) {
      case PropertyCondition.NEW:
        return 'text-green-700 bg-green-100';
      case PropertyCondition.LIKE_NEW:
        return 'text-blue-700 bg-blue-100';
      case PropertyCondition.GOOD:
        return 'text-teal-700 bg-teal-100';
      case PropertyCondition.FAIR:
        return 'text-yellow-700 bg-yellow-100';
      case PropertyCondition.POOR:
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  },

  getConditionLabel: (condition?: PropertyCondition): string => {
    switch (condition) {
      case PropertyCondition.NEW:
        return 'New';
      case PropertyCondition.LIKE_NEW:
        return 'Like New';
      case PropertyCondition.GOOD:
        return 'Good';
      case PropertyCondition.FAIR:
        return 'Fair';
      case PropertyCondition.POOR:
        return 'Poor';
      default:
        return 'N/A';
    }
  },

  // Format price with currency
  formatPrice: (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  },

  // Get featured image from property
  getFeaturedImage: (property: Property): string | undefined => {
    const featuredImage = property.images.find((img) => img.isFeatured);
    return featuredImage?.url || property.images[0]?.url;
  },

  // Validate if property can be deleted
  canDeleteProperty: (property: Property): { canDelete: boolean; reason?: string } => {
    if (property.status === PropertyStatus.SOLD) {
      return {
        canDelete: false,
        reason: 'Cannot delete sold properties. Please archive instead.',
      };
    }
    return { canDelete: true };
  },

  // Export properties to CSV
  exportPropertiesToCSV: (properties: Property[]) => {
    const headers = [
      'ID',
      'Title',
      'Price',
      'Currency',
      'Status',
      'Category',
      'Subcategory',
      'Location',
      'Owner',
      'Views',
      'Chats',
      'Favorites',
      'Featured',
      'Condition',
      'Created At',
    ];

    const rows = properties.map((property) => [
      property.id,
      property.title,
      property.price,
      property.currency,
      property.status,
      property.category?.name || 'N/A',
      property.subcategory?.name || 'N/A',
      `${property.location?.city || ''}, ${property.location?.state || ''}`,
      property.owner?.fullName || 'N/A',
      property.views,
      property.chats,
      property.favorites,
      property.isFeatured ? 'Yes' : 'No',
      property.condition || 'N/A',
      new Date(property.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `properties-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },

  // Format date range for display
  formatDateRange: (startDate?: string, endDate?: string): string => {
    if (!startDate && !endDate) return 'All time';
    if (startDate && !endDate) return `From ${new Date(startDate).toLocaleDateString()}`;
    if (!startDate && endDate) return `Until ${new Date(endDate).toLocaleDateString()}`;
    return `${new Date(startDate!).toLocaleDateString()} - ${new Date(endDate!).toLocaleDateString()}`;
  },

  // Calculate days remaining until expiration
  getDaysUntilExpiration: (expiresAt?: string): number | null => {
    if (!expiresAt) return null;
    const expirationDate = new Date(expiresAt);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  // Get property location string
  getLocationString: (property: Property): string => {
    const parts = [
      property.location?.city,
      property.location?.state,
      property.location?.country,
    ].filter(Boolean);
    return parts.join(', ') || 'Location not specified';
  },
};
