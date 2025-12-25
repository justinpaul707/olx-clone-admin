import { z } from 'zod';

export const loginSchema = z.object({
 email: z.string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  fullName: z.string()
    .min(1, { message: "Full name is required." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),
  email: z.string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(128, { message: "Password cannot exceed 128 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one lowercase letter, one uppercase letter, and one number." 
    }),
  confirmPassword: z.string()
    .min(1, { message: "Please confirm your password." }),
  agreeTerms: z.boolean()
    .refine(value => value === true, {
      message: "You must agree to the Terms of Service and Privacy Policy."
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"]
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
