import { pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./columnHelper.js";

export const userSubscriptions = pgTable("user_subscriptions", {
  ...timestamps,
});
