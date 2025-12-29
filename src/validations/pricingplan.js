import { z } from "zod";

export const createPricingPlanValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  monthlyPrice: z
    .number({ required_error: "Monthly price is required" })
    .min(0),
  yearlyPrice: z.number({ required_error: "Yearly price is required" }).min(0),
  currency: z.string({ required_error: "Currency is required" }).max(5),
  description: z.string({ required_error: "Description is required" }).min(1),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  tier: z.string({ required_error: "Tier name is required" }),
  isPopular: z.boolean({ required_error: "isPopular flag is required" }),
  repositories: z.number().int().min(0),
  contributors: z.number().int().min(0),
  commitsPerContributor: z.number().int().min(0),
});

export const getPricingPlanByIdValidationSchema = z.object({
  // id: z.number().int().min(0), <- this gives error because in params everything is string & this is checking only number, end up with error cycle.

  // below solution will first covert string into number then check the validation
  id: z.coerce.number({ required_error: "Id is required" }).int().positive(),
});

export const updatePricingPlanValidationSchema =
  createPricingPlanValidationSchema.partial();
