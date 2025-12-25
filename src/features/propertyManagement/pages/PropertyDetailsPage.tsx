import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetPropertyDetailsQuery,
  useDeletePropertyMutation,
} from '@app/features/propertyManagement/api/propertyManagementApi';
import { PropertyDetailsCard } from '@app/features/propertyManagement/components/PropertyDetailsCard';
import { Button } from '@app/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { propertyManagementService } from '@app/features/propertyManagement/services/propertyManagementService';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPropertyDetailsQuery(id || '');
  const [deleteProperty] = useDeletePropertyMutation();

  const handleEdit = () => {
    navigate(`/properties/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!data?.property) return;

    const canDelete = propertyManagementService.canDeleteProperty(data.property);
    if (!canDelete.canDelete) {
      toast.error(canDelete.reason);
      return;
    }

    if (!confirm(`Are you sure you want to delete "${data.property.title}"?`)) {
      return;
    }

    try {
      const result = await deleteProperty({ id: data.property.id }).unwrap();
      if (result.success) {
        toast.success(result.message || 'Property deleted successfully');
        navigate('/properties');
      } else {
        toast.error(result.message || 'Failed to delete property');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while deleting property';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data?.property) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/properties')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/properties')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
      </div>

      {/* Property Details */}
      <div className="max-w-4xl mx-auto">
        <PropertyDetailsCard
          property={data.property}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Related Properties */}
      {data.relatedProperties && data.relatedProperties.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.relatedProperties.map((relatedProperty) => (
              <div
                key={relatedProperty.id}
                onClick={() => navigate(`/properties/${relatedProperty.id}`)}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                {relatedProperty.images?.[0] ? (
                  <img
                    src={relatedProperty.images[0].url}
                    alt={relatedProperty.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 truncate">{relatedProperty.title}</h4>
                  <p className="text-blue-600 font-bold mt-1">
                    {propertyManagementService.formatPrice(
                      relatedProperty.price,
                      relatedProperty.currency
                    )}
                  </p>
                  {relatedProperty.location && (
                    <p className="text-sm text-gray-500 mt-1">
                      {relatedProperty.location.city}, {relatedProperty.location.state}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
