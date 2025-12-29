import express from "express";
import {
  createPricingPlan,
  getAllPricingPlans,
  getPricingPlanById,
} from "../controllers/pricingplan.controller.js";

import {
  createPricingPlanValidationSchema,
  getPricingPlanByIdValidationSchema,
} from "../validations/pricingplan.js";

import { validate } from "../middleware/validation.js";

const router = express.Router();

router.get("/", getAllPricingPlans);

router.post(
  "/",
  validate(createPricingPlanValidationSchema),
  createPricingPlan
);

router.get(
  "/:id",
  validate(getPricingPlanByIdValidationSchema),
  getPricingPlanById
);

// router.put("/:id", updatePricingPlan);

// router.delete("/:id", deletePricingPlan);

export default router;
