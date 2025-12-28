import {
  pgTable,
  serial,
  text,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columnHelper.js";

export const tierEnum = pgEnum("tier", ["free", "pro", "enterprise"]);

// Using JSONB for flexible structure
export const pricingPlansTable = pgTable("pricing_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: jsonb("price").notNull(),
  // Structure: { monthly: number, yearly: number, currency: string }
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  tier: tierEnum("tier").notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  limits: jsonb("limits").notNull(),
  // Structure: { repositories: number, contributors: number, commitsPerContributor: number }
  ...timestamps,
});
