import {
  pgTable,
  serial,
  text,
  boolean,
  pgEnum,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columnHelper.js";
import { sql } from "drizzle-orm";

export const tierEnum = pgEnum("tier", ["free", "pro", "enterprise"]);

export const pricingPlansTable = pgTable("pricing_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  monthlyPrice: integer("monthly_price").notNull(),
  yearlyPrice: integer("yearly_price").notNull(),
  currency: varchar("currency", { length: 5 }).notNull().default("INR"),
  description: text("description").notNull(),
  features: varchar("features", { length: 30 })
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  tier: tierEnum("tier").notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  repositories: integer("repositories").notNull(),
  contributors: integer("contributors").notNull(),
  commitsPerContributor: integer("commits_per_contributor").notNull(),
  maxCommits: integer("max_commits").generatedAlwaysAs(
    sql`"contributors" * "commits_per_contributor"`
  ),
  ...timestamps,
});
