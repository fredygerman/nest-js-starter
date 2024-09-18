import type { Config } from 'drizzle-kit';
import config from 'src/config';

export default {
  schema: './src/modules/drizzle/schema.ts',
  out: './src/modules/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.databaseURL,
  },
} satisfies Config;
