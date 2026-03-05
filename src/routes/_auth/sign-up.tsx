import { useForm } from 'react-hook-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { authClient } from '#/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { signUpSchema } from '#/lib/validations/auth';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { Label } from '#/components/ui/label';
import { Input } from '#/components/ui/input';
import { Spinner } from '#/components/ui/spinner';
import type { SignUpValues } from '#/lib/validations/auth';

export const Route = createFileRoute('/_auth/sign-up')({ component: SignUp });

function SignUp() {
  const navigate = useNavigate({ from: '/sign-up' });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpValues) => authClient.signUp.email(data),
    onSuccess: ({ error }) => {
      if (error) {
        if (error.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
          setError('email', {
            message: 'Email is already in use. Please use a different email.',
          });
        } else if (error.code === 'PASSWORD_TOO_SHORT') {
          setError('password', { message: error.message });
        } else {
          if (error.message) {
            setError('root', { message: error.message });
          } else {
            setError('root', {
              message: 'An unknown error occurred. Please try again.',
            });
          }
        }

        return;
      }

      navigate({ to: '/' });
    },
    onError: (error) => {
      console.error('Sign up error:', error);
      setError('root', {
        message: 'An error occurred while signing up. Please try again.',
      });
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          {errors.root && <p className="text-destructive text-sm">{errors.root.message}</p>}

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner data-icon="inline-start" />}
            Sign Up
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="h-0 p-0" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
