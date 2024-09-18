import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle<typeof schema>(pool);

const main = async () => {
  try {
    console.log('Seeding database');
    // Delete all data
    await db.delete(schema.User);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
};

main();
