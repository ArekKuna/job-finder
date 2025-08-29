import { z } from 'zod';

export const employeeRegistrationSchema = z
  .object({
    firstName: z.string().min(1, { message: 'This field is required' }),
    lastName: z.string().min(1, { message: 'This field is required' }),
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
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    phoneNumber: z.string().min(1, { message: 'This field is required' }),
    location: z.string().min(1, { message: 'This field is required' }),
    professionalTitle: z.string().min(1, { message: 'This field is required' }),
    bio: z.string().nullable(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Passwords must match',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords must match',
      });
    }
  });

export const employeeRegistrationFormDefaults: EmployeeRegistrationSchemaType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  location: '',
  professionalTitle: '',
  bio: '',
};

export type EmployeeRegistrationSchemaType = z.infer<typeof employeeRegistrationSchema>;
