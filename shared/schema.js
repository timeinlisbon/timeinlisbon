import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  phone: text('phone'),
  language: text('language').default('en'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  language: text('language').default('en'),
  createdAt: timestamp('created_at').defaultNow(),
});