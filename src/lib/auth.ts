import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { AnyD1Database } from 'drizzle-orm/d1';

import { getDb } from '#/db';

function createAuthInstance(d1: AnyD1Database) {
  return betterAuth({
    database: drizzleAdapter(getDb(d1), {
      provider: 'sqlite',
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
    plugins: [tanstackStartCookies()],
  });
}

let _auth: ReturnType<typeof createAuthInstance> | undefined;

export function getAuth(d1: AnyD1Database) {
  return (_auth ??= createAuthInstance(d1));
}
