import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./users.schema.js";
import { pricingPlansTable } from "./pricingplan.schema.js";
import { timestamps } from "./columnHelper.js";

export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  currentPlan: integer("current_plan")
    .notNull()
    .references(() => pricingPlansTable.id),
  totalUsedRepositories: varchar("total_used_repositories", { length: 50 })
    .array()
    .default(sql, `'{}'::varchar[]`),
  totalUsedContributors: varchar("total_used_contributors", { length: 50 })
    .array()
    .default(sql, `'{}'::varchar[]`),
  startDate: date("start_date"),
  endDate: date("end_date"),
  renewalDate: date("renewal_date"),
  ...timestamps,
});
