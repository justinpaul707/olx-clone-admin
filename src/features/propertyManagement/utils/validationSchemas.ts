import { z } from 'zod';
import { PropertyStatus, PropertyCondition } from '@app/features/propertyManagement/types';

// Create Property Schema
export const createPropertySchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .min(5, { message: 'Title must be at least 5 characters long.' })
    .max(200, { message: 'Title cannot exceed 200 characters.' }),
  description: z
    .string()
    .min(1, { message: 'Description is required.' })
    .min(20, { message: 'Description must be at least 20 characters long.' })
    .max(5000, { message: 'Description cannot exceed 5000 characters.' }),
  price: z
    .number({ message: 'Price must be a number.' })
    .positive({ message: 'Price must be greater than 0.' })
    .max(999999999, { message: 'Price is too high.' }),
  currency: z.string().optional().default('USD'),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  subcategoryId: z.string().min(1, { message: 'Subcategory is required.' }),
  locationId: z.string().optional(),
  ownerId: z.string().min(1, { message: 'Owner is required.' }),
  status: z.enum([PropertyStatus.ACTIVE, PropertyStatus.INACTIVE, PropertyStatus.PENDING, PropertyStatus.SOLD, PropertyStatus.EXPIRED, PropertyStatus.REJECTED, PropertyStatus.DRAFT]).optional().default(PropertyStatus.PENDING),
  condition: z.enum([PropertyCondition.NEW, PropertyCondition.LIKE_NEW, PropertyCondition.GOOD, PropertyCondition.FAIR, PropertyCondition.POOR]).optional(),
  isNegotiable: z.boolean().optional().default(false),
  specifications: z.record(z.string(), z.any()).optional(),
});

// Update Property Schema
export const updatePropertySchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long.' })
    .max(200, { message: 'Title cannot exceed 200 characters.' })
    .optional(),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters long.' })
    .max(5000, { message: 'Description cannot exceed 5000 characters.' })
    .optional(),
  price: z
    .number({ message: 'Price must be a number.' })
    .positive({ message: 'Price must be greater than 0.' })
    .max(999999999, { message: 'Price is too high.' })
    .optional(),
  currency: z.string().optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  locationId: z.string().optional(),
  status: z.enum([PropertyStatus.ACTIVE, PropertyStatus.INACTIVE, PropertyStatus.PENDING, PropertyStatus.SOLD, PropertyStatus.EXPIRED, PropertyStatus.REJECTED, PropertyStatus.DRAFT]).optional(),
  condition: z.enum([PropertyCondition.NEW, PropertyCondition.LIKE_NEW, PropertyCondition.GOOD, PropertyCondition.FAIR, PropertyCondition.POOR]).optional(),
  isNegotiable: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  specifications: z.record(z.string(), z.any()).optional(),
});

// Property Filter Schema
export const propertyFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum([PropertyStatus.ACTIVE, PropertyStatus.INACTIVE, PropertyStatus.PENDING, PropertyStatus.SOLD, PropertyStatus.EXPIRED, PropertyStatus.REJECTED, PropertyStatus.DRAFT]).optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  locationId: z.string().optional(),
  ownerId: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  condition: z.enum([PropertyCondition.NEW, PropertyCondition.LIKE_NEW, PropertyCondition.GOOD, PropertyCondition.FAIR, PropertyCondition.POOR]).optional(),
  isFeatured: z.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
}).refine(
  (data) => {
    if (data.minPrice && data.maxPrice) {
      return data.minPrice <= data.maxPrice;
    }
    return true;
  },
  {
    message: 'Minimum price cannot be greater than maximum price.',
    path: ['minPrice'],
  }
).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  {
    message: 'Start date cannot be after end date.',
    path: ['startDate'],
  }
);

// Property Location Schema
export const propertyLocationSchema = z.object({
  address: z.string().min(1, { message: 'Address is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  state: z.string().min(1, { message: 'State is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Export type definitions
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PropertyFilterInput = z.infer<typeof propertyFilterSchema>;
export type PropertyLocationInput = z.infer<typeof propertyLocationSchema>;
