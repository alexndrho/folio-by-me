import { readdirSync } from 'node:fs';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: ['.env.local', '.env'] });

const isLocal = process.env.LOCAL === 'true';

function getLocalDbUrl() {
  const dir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
  const file = readdirSync(dir).find((f) => f.endsWith('.sqlite'));
  if (!file) {
    throw new Error(
      `No .sqlite database file found in "${dir}". Ensure the local D1 database has been created.`,
    );
  }
  return `${dir}/${file}`;
}

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  ...(isLocal
    ? { dbCredentials: { url: getLocalDbUrl() } }
    : {
        driver: 'd1-http',
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_TOKEN!,
        },
      }),
});
