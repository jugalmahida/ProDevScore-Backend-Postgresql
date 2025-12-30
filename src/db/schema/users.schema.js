import {
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
  role: roleEnum().default("user"),
  refresh_token: varchar("refresh_token", { length: 200 }),
  isVerified: integer("is_verified").default(0),
  verificationCode: integer("verification_code"),
  expiresCodeAt: timestamp("expires_code_at"),
  forgetPasswordToken: varchar("forget_password_token", { length: 200 }),
  forgetPasswordTokenExpiry: timestamp("forget_password_token_expiry"),
  githubId: varchar("github_id", { length: 20 }).unique(),
  privateRepos: varchar("private_repos", { length: 50 })
    .array()
    .default(sql`'{}'::varchar[]`),
  authProvider: authProviderEnum().default("Email"),
  ...timestamps,
});
