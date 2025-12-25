import React from 'react';
import type { Property } from '@app/features/propertyManagement/types';
import { propertyManagementService } from '@app/features/propertyManagement/services/propertyManagementService';
import { Card } from '@app/components/ui/card';
import { Button } from '@app/components/ui/button';
import { 
  MapPin, 
  User, 
  Calendar, 
  Eye, 
  MessageCircle, 
  Heart,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@app/lib/utils';

interface PropertyDetailsCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

export const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  const statusColor = propertyManagementService.getStatusColor(property.status);
  const locationString = propertyManagementService.getLocationString(property);
  const featuredImage = propertyManagementService.getFeaturedImage(property);
  const daysUntilExpiration = propertyManagementService.getDaysUntilExpiration(property.expiresAt);

  return (
    <Card className="overflow-hidden">
      {/* Header with Featured Image */}
      <div className="relative h-64 bg-gray-200">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
        {property.isFeatured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-white" />
            <span className="text-sm font-semibold">Featured</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className={cn('inline-flex rounded-md border px-3 py-1 text-sm font-medium', statusColor)}>
            {propertyManagementService.getStatusLabel(property.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title and Price */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {propertyManagementService.formatPrice(property.price, property.currency)}
            </span>
            {property.isNegotiable && (
              <span className="text-sm text-blue-600 font-medium">Negotiable</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="h-5 w-5" />
            <div>
              <div className="text-lg font-semibold text-gray-900">{property.views || 0}</div>
              <div className="text-xs">Views</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="h-5 w-5" />
            <div>
              <div className="text-lg font-semibold text-gray-900">{property.chats || 0}</div>
              <div className="text-xs">Chats</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="h-5 w-5" />
            <div>
              <div className="text-lg font-semibold text-gray-900">{property.favorites || 0}</div>
              <div className="text-xs">Favorites</div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Category</h4>
            <p className="text-sm text-gray-900">{property.category?.name || 'N/A'}</p>
            {property.subcategory && (
              <p className="text-xs text-gray-500">{property.subcategory.name}</p>
            )}
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Condition</h4>
            <p className="text-sm text-gray-900">
              {propertyManagementService.getConditionLabel(property.condition)}
            </p>
          </div>

          <div className="col-span-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location
            </h4>
            <p className="text-sm text-gray-900">{locationString}</p>
            {property.location?.address && (
              <p className="text-xs text-gray-500 mt-1">{property.location.address}</p>
            )}
          </div>

          <div className="col-span-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
              <User className="h-3 w-3" />
              Owner
            </h4>
            <p className="text-sm text-gray-900">{property.owner?.fullName || 'N/A'}</p>
            <p className="text-xs text-gray-500">{property.owner?.email}</p>
            {property.owner?.phone && (
              <p className="text-xs text-gray-500">{property.owner.phone}</p>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Created
            </h4>
            <p className="text-sm text-gray-900">
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
          </div>

          {property.expiresAt && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Expires</h4>
              <p className="text-sm text-gray-900">
                {new Date(property.expiresAt).toLocaleDateString()}
              </p>
              {daysUntilExpiration !== null && daysUntilExpiration > 0 && (
                <p className="text-xs text-orange-600">
                  {daysUntilExpiration} days remaining
                </p>
              )}
            </div>
          )}
        </div>

        {/* Specifications */}
        {property.specifications && Object.keys(property.specifications).length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(property.specifications).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-gray-500">{key}:</span>{' '}
                  <span className="text-gray-900 font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Gallery */}
        {property.images.length > 1 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Gallery</h4>
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image) => (
                <div key={image.id} className="relative aspect-square">
                  <img
                    src={image.url}
                    alt="Property"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {image.isFeatured && (
                    <Star className="absolute top-1 right-1 h-3 w-3 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={() => onEdit(property)} className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Edit Property
          </Button>
          <Button
            onClick={() => onDelete(property)}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
