import { z } from "zod";

export const createUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string().min(6, "Password must be 6 character long"),
});

export const userIdValidationSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid Id").transform(Number),
});
