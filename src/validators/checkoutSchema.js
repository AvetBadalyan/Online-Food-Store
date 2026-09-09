import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(60, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),
  street: z
    .string()
    .min(3, 'Street address is required')
    .max(100, 'Address is too long'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(60, 'City name is too long'),
  postalCode: z
    .string()
    .min(3, 'Postal code is required')
    .max(12, 'Postal code is too long'),
  country: z
    .string()
    .min(2, 'Country is required')
    .max(60, 'Country name is too long'),
  notes: z.string().max(300, 'Notes are too long').optional(),
});
