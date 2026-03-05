import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { AnyD1Database } from 'drizzle-orm/d1';

import { createDb } from '#/db';

function createAuthInstance(d1: AnyD1Database) {
  return betterAuth({
    database: drizzleAdapter(createDb(d1), {
      provider: 'sqlite',
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [tanstackStartCookies()],
  });
}

let _auth: ReturnType<typeof createAuthInstance> | undefined;

export function getAuth(d1: AnyD1Database) {
  return (_auth ??= createAuthInstance(d1));
}
