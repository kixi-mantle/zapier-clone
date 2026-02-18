import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { _env } from '../credentials';


const db = drizzle(_env.DATABASE_URL)