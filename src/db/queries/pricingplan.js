import { db } from "../../config/db.config.js";
import { pricingPlansTable } from "../schema/pricingplan.schema.js";
import { executeQuery } from "../../utils/ExecuteQuery.js";
import { eq } from "drizzle-orm";

// Checkout queries docs
// https://orm.drizzle.team/docs/data-querying
// https://orm.drizzle.team/docs/generated-columns

export const createPricingPlanQuery = async (pricingPlanData) => {
  // [] means extract first right side results
  const [newPricingPlan] = await executeQuery(
    async () =>
      await db.insert(pricingPlansTable).values(pricingPlanData).returning(),
    "Error while creating pricing plan"
  );
  return newPricingPlan;
};

export const getAllPricingPlanQuery = async () => {
  // No [] means i want all data not just first.
  const pricingPlans = await executeQuery(
    async () => await db.select().from(pricingPlansTable),
    "Error while getting pricing plan"
  );
  return pricingPlans;
};

export const getPricingPlanByIdQuery = async (id) => {
  const [pricingPlan] = await executeQuery(
    async () =>
      await db
        .select()
        .from(pricingPlansTable)
        .where(eq(pricingPlansTable.id, id)),
    "Error while getting pricing plan"
  );
  return pricingPlan;
};

export const updatePricingPlanQuery = async (pricingPlanData, id) => {
  const [updatedPricingPlan] = await executeQuery(
    async () =>
      await db
        .update(pricingPlansTable)
        .set(pricingPlanData)
        .where(eq(pricingPlansTable.id, id))
        .returning(),
    "Error while updating pricing plan"
  );
  return updatedPricingPlan;
};

export const deletePricingPlanQuery = async (id) => {
  const [deletedPricingPlan] = await executeQuery(
    async () =>
      await db
        .delete(pricingPlansTable)
        .where(eq(pricingPlansTable.id, id))
        .returning(),
    "Error while deleting pricing plan"
  );
  return deletedPricingPlan;
};
