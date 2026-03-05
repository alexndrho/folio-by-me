import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authClient } from '#/lib/auth-client';
import { signInSchema } from '#/lib/validations/auth';
import type { SignInValues } from '#/lib/validations/auth';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Checkbox } from '#/components/ui/checkbox';
import { Spinner } from '#/components/ui/spinner';

export const Route = createFileRoute('/_auth/sign-in')({ component: SignIn });

function SignIn() {
  const navigate = useNavigate({ from: '/sign-in' });

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignInValues) => authClient.signIn.email(data),
    onSuccess: ({ error }) => {
      if (error) {
        if (error.code === 'INVALID_EMAIL_OR_PASSWORD') {
          setError('email', { message: error.message });
          setError('password', { message: error.message });
        } else {
          if (error.message) {
            setError('root', { message: error.message });
          } else {
            console.error('Unknown sign in error:', error);
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
      console.error('Sign in error:', error);
      setError('root', {
        message: 'An error occurred while signing in. Please try again.',
      });
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col gap-4"
        >
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

          <div className="flex gap-2">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </div>

          {errors.root && <p className="text-destructive text-sm">{errors.root.message}</p>}

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner data-icon="inline-start" />}
            Sign In
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" className="h-0 p-0" asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
