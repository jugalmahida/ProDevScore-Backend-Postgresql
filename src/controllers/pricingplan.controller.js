import {
  createPricingPlanQuery,
  deletePricingPlanQuery,
  getAllPricingPlanQuery,
  getPricingPlanByIdQuery,
  updatePricingPlanQuery,
} from "../db/queries/pricingplan.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { AppSuccess } from "../utils/AppSuccess.js";

// Create a new Pricing Plan
export const createPricingPlan = asyncHandler(async (req, res, next) => {
  const pricingPlan = await createPricingPlanQuery(req.body);

  if (!pricingPlan) {
    AppError.internalError(
      "Unknown Error occurred while creating the pricing plan"
    );
  }

  AppSuccess.created(pricingPlan).send(res);
});

// Get all Pricing Plans
export const getAllPricingPlans = asyncHandler(async (req, res, next) => {
  const plans = await getAllPricingPlanQuery();
  if (!plans) {
    AppError.notFound("Not found any pricing plan.");
  }
  AppSuccess.ok(plans).send(res);
});

// Get a Pricing Plan by ID
export const getPricingPlanById = asyncHandler(async (req, res, next) => {
  const plan = await getPricingPlanByIdQuery(req.params.id);
  if (!plan) {
    return next(AppError.notFound("Pricing plan not found"));
  }
  AppSuccess.ok(plan).send(res);
});

// Update a Pricing Plan by ID
export const updatePricingPlan = asyncHandler(async (req, res, next) => {
  // req.body & req.params is already validated in the middleware
  const plan = await updatePricingPlanQuery(req.body, req.params.id);

  if (!plan) {
    return next(AppError.notFound("Pricing plan not found"));
  }

  AppSuccess.ok(plan).send(res);
});

// Delete a Pricing Plan by ID
export const deletePricingPlan = asyncHandler(async (req, res, next) => {
  const plan = await deletePricingPlanQuery(req.params.id);

  if (!plan) {
    return next(AppError.notFound("Pricing plan not found"));
  }

  AppSuccess.ok("Pricing plan deleted successfully").send(res);
});
