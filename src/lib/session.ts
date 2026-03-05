import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { env } from 'cloudflare:workers';

import { getAuth } from './auth';

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await getAuth(env.devfolio).api.getSession({ headers });

  return session;
});

export const ensureSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await getAuth(env.devfolio).api.getSession({ headers });

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
});
