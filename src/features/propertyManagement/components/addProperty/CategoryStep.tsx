import React from 'react';
import { Label } from '@app/components/ui/label';
import type { PropertyCategory, PropertySubcategory } from '../../types';

interface CategoryStepProps {
  categories: PropertyCategory[];
  subcategories: PropertySubcategory[];
  selectedCategoryId: string;
  selectedSubcategoryId: string;
  onChange: (field: string, value: string) => void;
}

export const CategoryStep: React.FC<CategoryStepProps> = ({
  categories,
  subcategories,
  selectedCategoryId,
  selectedSubcategoryId,
  onChange,
}) => {
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === selectedCategoryId
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  onChange('categoryId', category.id);
                  onChange('subcategoryId', ''); // Reset subcategory when category changes
                }}
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-brand-primary ${
                  selectedCategoryId === category.id
                    ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedCategoryId && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <Label className="text-base font-semibold">Subcategory</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {filteredSubcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  onClick={() => onChange('subcategoryId', subcategory.id)}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-brand-primary ${
                    selectedSubcategoryId === subcategory.id
                      ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-medium">{subcategory.name}</div>
                </div>
              ))}
              {filteredSubcategories.length === 0 && (
                <p className="text-sm text-gray-500 col-span-full">No subcategories found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
