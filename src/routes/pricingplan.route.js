import express from "express";
import {
  createPricingPlan,
  getAllPricingPlans,
  getPricingPlanById,
  updatePricingPlan,
  deletePricingPlan,
} from "../controllers/pricingplan.controller.js";

import {
  createPricingPlanValidationSchema,
  pricingPlanIdValidationSchema,
  updatePricingPlanValidationSchema,
} from "../validations/pricingplan.validation.js";

import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", getAllPricingPlans);

router.post(
  "/",
  validate({ body: createPricingPlanValidationSchema }),
  createPricingPlan
);

router.get(
  "/:id",
  validate({ params: pricingPlanIdValidationSchema }),
  getPricingPlanById
);

router.put(
  "/:id",
  validate({
    // This will validate the ID
    params: pricingPlanIdValidationSchema,
    // This will validate the body
    body: updatePricingPlanValidationSchema,
  }),
  updatePricingPlan
);

router.delete(
  "/:id",
  validate({ params: pricingPlanIdValidationSchema }),
  deletePricingPlan
);

export default router;
