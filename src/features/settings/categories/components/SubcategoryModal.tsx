import React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { type Subcategory, type Category } from '@app/features/settings/types';
import { useCreateSubcategoryMutation, useUpdateSubcategoryMutation } from '@app/features/settings/api';
import { toast } from 'react-toastify';
import { ModalContainer } from '@app/components/containers/ModalContainer/ModalContainer';
import { Loader2 } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory?: Subcategory;
  parentCategory?: Category;
}

export const SubcategoryModal: React.FC<SubcategoryModalProps> = ({ isOpen, onClose, subcategory, parentCategory }) => {
  const [createSubcategory, { isLoading: isCreating }] = useCreateSubcategoryMutation();
  const [updateSubcategory, { isLoading: isUpdating }] = useUpdateSubcategoryMutation();

  const form = useForm({
    defaultValues: {
      categoryId: subcategory?.categoryId || parentCategory?.id || '',
      name: subcategory?.name || '',
      slug: subcategory?.slug || '',
      description: subcategory?.description || '',
      isActive: subcategory ? subcategory.isActive : true,
    },
    onSubmit: async ({ value }) => {
      try {
        if (subcategory) {
          await updateSubcategory({ ...value, id: subcategory.id }).unwrap();
          toast.success('Subcategory updated successfully');
        } else {
          await createSubcategory(value).unwrap();
          toast.success('Subcategory created successfully');
        }
        onClose();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to save subcategory');
      }
    },
  });

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={subcategory ? 'Edit Subcategory' : `Add Subcategory to ${parentCategory?.name || 'Category'}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Hidden categoryId field */}
        <form.Field
          name="categoryId"
          children={(field) => <input type="hidden" name={field.name} value={field.state.value} />}
        />

        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => !value ? 'Name is required' : undefined,
          }}
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Mobile Phones"
              />
              {field.state.meta.errors ? (
                <p className="text-red-500 text-xs mt-1">{field.state.meta.errors.join(', ')}</p>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="slug"
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. mobile-phones"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
            </div>
          )}
        />

        <form.Field
          name="description"
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          )}
        />

        <form.Field
          name="isActive"
          children={(field) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="subIsActive"
                name={field.name}
                checked={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="subIsActive" className="text-sm text-gray-700">Active</label>
            </div>
          )}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className={cn("bg-brand-primary text-white hover:bg-brand-primary/90", (isCreating || isUpdating) && "disabled:opacity-100")}
          >
            {(isCreating || isUpdating) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Subcategory'
            )}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
};
