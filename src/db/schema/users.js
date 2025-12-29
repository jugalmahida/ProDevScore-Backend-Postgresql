import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { timestamps } from "./columnHelper.js";

export const roleEnum = pgEnum("role", ["admin", "user"]);
export const authProviderEnum = pgEnum("authProvider", ["Email", "Github"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  role: roleEnum(),
  refresh_token: varchar("refresh_token", { length: 200 }),
  isVerified: integer("isVerified").default(0),
  verificationCode: integer("isVerified"),
  expiresCodeAt: timestamp("expiresCodeAt"),
  forgetPasswordToken: varchar("forgetPasswordToken", { length: 200 }),
  forgetPasswordTokenExpiry: timestamp("forgetPasswordTokenExpiry"),
  githubId: varchar("githubId", { length: 20 }).unique(),
  privateRepos: varchar("privateRepos", { length: 50 })
    .array()
    .default(sql`'{}'::varchar[]`),
  authProvider: authProviderEnum(),
  ...timestamps,
});
