import React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { type Category } from '@app/features/settings/types';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@app/features/settings/api';
import { toast } from 'react-toastify';
import { ModalContainer } from '@app/components/containers/ModalContainer/ModalContainer';
import { Loader2 } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, category }) => {
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const form = useForm({
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
      imageFile: null as File | null,
      isActive: category ? category.isActive : true,
    },
    onSubmit: async ({ value }) => {
      try {
        const { slug, ...inputData } = value;
        if (category) {
          await updateCategory({ ...inputData, id: category.id }).unwrap();
          toast.success('Category updated successfully');
        } else {
          await createCategory(inputData).unwrap();
          toast.success('Category created successfully');
        }
        onClose();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to save category');
      }
    },
  });

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
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
                placeholder="e.g. Electronics"
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
                placeholder="e.g. electronics"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate</p>
            </div>
          )}
        />

        <form.Field
          name="imageFile"
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="flex items-center gap-4">
                {category?.imageUrl && (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-12 w-12 rounded object-cover border border-gray-200"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Upload an image for the category.</p>
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
                id="isActive"
                name={field.name}
                checked={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
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
              'Save Category'
            )}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
};
