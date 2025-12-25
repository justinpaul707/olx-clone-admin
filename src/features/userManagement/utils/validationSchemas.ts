import { z } from 'zod';
import { UserStatus } from '@app/features/userManagement/types';

// Create User Schema
export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Full name is required.' })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces.',
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(128, { message: 'Password cannot exceed 128 characters.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
    }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password.' }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return /^\+?[\d\s-()]+$/.test(val);
      },
      { message: 'Invalid phone number format.' }
    ),
  roleId: z.string().min(1, { message: 'Role is required.' }),
  status: z.nativeEnum(UserStatus).optional().default(UserStatus.ACTIVE),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

// Update User Schema
export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Name can only contain letters and spaces.',
    })
    .optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .optional(),
  phone: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        return /^\+?[\d\s-()]+$/.test(val);
      },
      { message: 'Invalid phone number format.' }
    )
    .optional(),
  roleId: z.string().optional(),
  status: z.nativeEnum(UserStatus).optional(),
  address: z.string().max(200, { message: 'Address cannot exceed 200 characters.' }).optional(),
  bio: z.string().max(500, { message: 'Bio cannot exceed 500 characters.' }).optional(),
});

// Change Status Schema
export const changeStatusSchema = z.object({
  status: z.nativeEnum(UserStatus, {
    errorMap: () => ({ message: 'Please select a valid status.' }),
  }),
});

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: 'Password is required.' })
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(128, { message: 'Password cannot exceed 128 characters.' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
      }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

// User Filter Schema
export const userFilterSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(UserStatus).optional(),
  roleId: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Type exports
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type ChangeStatusFormData = z.infer<typeof changeStatusSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UserFilterFormData = z.infer<typeof userFilterSchema>;
