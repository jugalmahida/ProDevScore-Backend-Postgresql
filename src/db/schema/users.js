import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { timestamps } from "./columnHelper.js";

export const roleEnum = pgEnum("role", ["admin", "user"]);
export const authProviderEnum = pgEnum("authProvider", ["Email", "Github"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  role: roleEnum(),
  refresh_token: text("refresh_token"),
  isVerified: integer("isVerified").default(0),
  verificationCode: integer("isVerified"),
  expiresCodeAt: date("expiresCodeAt"),
  forgetPasswordToken: text("forgetPasswordToken"),
  forgetPasswordTokenExpiry: text("forgetPasswordTokenExpiry"),
  githubId: text("githubId").unique(),
  privateRepos: text("privateRepos")
    .array()
    .default(sql`'{}'::text[]`),
  authProvider: authProviderEnum(),
  ...timestamps,
});
