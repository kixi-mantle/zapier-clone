import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { _env } from './credentials';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: _env.DATABASE_URL!,
  },
});
