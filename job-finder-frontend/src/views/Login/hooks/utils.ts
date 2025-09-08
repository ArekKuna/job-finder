import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Enter valid email' })
    .min(1, { message: 'This field is required' })
    .trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});

export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
