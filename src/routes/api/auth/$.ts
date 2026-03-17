import { createFileRoute } from '@tanstack/react-router';
import { env } from 'cloudflare:workers';

import { getAuth } from '#/lib/auth';

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: ({ request }) => getAuth(env.DB).handler(request),
      POST: ({ request }) => getAuth(env.DB).handler(request),
    },
  },
});
