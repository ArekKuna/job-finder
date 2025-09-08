import { z } from 'zod';

const companySizeEnum = z.enum(['MIKRO', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE', 'CORPORATE'], {
  message: 'Choose one of specified options',
});

export const employerRegistrationSchema = z
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
    companyName: z.string().min(1, { message: 'This field is required' }),
    companySize: companySizeEnum,
    industry: z.string().min(1, { message: 'This field is required' }),
    companyWebsite: z.string().min(1, { message: 'This field is required' }),
    phoneNumber: z.string().min(1, { message: 'This field is required' }),
    location: z.string().min(1, { message: 'This field is required' }),
    description: z.string().nullable(),
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

export const employerRegistrationFormDefaults: EmployerRegistrationSchemaType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  companySize: 'MEDIUM',
  industry: '',
  companyWebsite: '',
  phoneNumber: '',
  location: '',
  description: '',
};

export type EmployerRegistrationSchemaType = z.infer<typeof employerRegistrationSchema>;
