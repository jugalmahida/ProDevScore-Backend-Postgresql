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

export const pricingPlanIdValidationSchema = z.object({
  // id: z.number().int().min(0), <- this gives error because in params everything is string & this is checking only number, end up with error cycle.

  // below solution will first covert string into number then check the validation
  // id: z.coerce.number({ required_error: "Id is required" }).int().positive(), <- this bypass validation if id like 12e22 then it convert into valid int like 1.2e+23. End up query executing like where id = 1.2e+23. which not valid.

  // this new solution will check id by validating 0-9 number only & convert into number
  id: z.string().regex(/^\d+$/, "Invalid Id").transform(Number),
});

// .partial() makes all fields optional means if user pass monthlyPrice then it execute monthlyPrice validation, no other validation will execute, In short anything is pass in body being execute validation only that fields
export const updatePricingPlanValidationSchema =
  createPricingPlanValidationSchema.partial();
