import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string(),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signInSchema = signUpSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
