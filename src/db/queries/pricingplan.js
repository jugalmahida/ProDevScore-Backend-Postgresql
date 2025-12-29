import { db } from "../../config/db.config.js";
import { pricingPlansTable } from "../schema/pricingplan.js";
import { executeQuery } from "../../utils/ExecuteQuery.js";
import { eq } from "drizzle-orm";

// Checkout queries docs
// https://orm.drizzle.team/docs/data-querying

export const createPricingPlanQuery = async (pricingPlanData) => {
  const [newPricingPlan] = await executeQuery(
    async () =>
      await db.insert(pricingPlansTable).values(pricingPlanData).returning(),
    "Error while creating pricing plan"
  );
  return newPricingPlan;
};

export const getAllPricingPlanQuery = async () => {
  const [pricingPlans] = await executeQuery(
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

export const updatePricingPlanQuery = async (pricingPlanData) => {
  const [updatedPricingPlan] = await executeQuery(
    async () =>
      await db
        .update(pricingPlansTable)
        .set(pricingPlanData)
        .where(eq(pricingPlansTable.id, pricingPlanData.id))
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
