import { createFileRoute } from '@tanstack/react-router';

import { authClient } from '#/lib/auth-client';
import { GoogleIcon } from '#/components/icons/google';
import { GitHubIcon } from '#/components/icons/github';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Button
          className="w-full"
          onClick={() =>
            authClient.signIn.social({
              provider: 'google',
              callbackURL: '/',
            })
          }
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <Button
          className="w-full"
          onClick={() =>
            authClient.signIn.social({
              provider: 'github',
              callbackURL: '/',
            })
          }
        >
          <GitHubIcon />
          Continue with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
