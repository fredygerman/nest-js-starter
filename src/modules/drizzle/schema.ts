// import { relations } from 'drizzle-orm';

import {
  pgTable,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
  uuid,
  date,
} from 'drizzle-orm/pg-core';

export const User = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  first_name: varchar('first_name', { length: 256 }),
  last_name: varchar('last_name', { length: 256 }),
  phone_number: varchar('phone_number', { length: 256 }),
  is_phone_number_verified: boolean('is_phone_number_verified').default(false),
  email: varchar('email', { length: 256 }),
  dob: date('dob'),
  avatar_url: varchar('avatar_url', { length: 256 }),
  on_boarded: boolean('on_boarded').default(false),
  locale: varchar('locale', { length: 256 }).default('en'),
  role: varchar('role', {
    enum: ['user', 'admin'],
  }).default('user'),
  status: varchar('status', {
    enum: ['active', 'inactive', 'deleted'],
  }).default('active'),
  password: varchar('password', { length: 256 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
