import { AppError } from "../utils/AppError.js";

// This function wraps Zod schema
export const validate = (schema) => (req, res, next) => {
  const validationResult = schema.safeParse(req.body);
  if (!validationResult.success) {
    const errorMsg = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    return next(AppError.badRequest(errorMsg));
  }
  req.body = validationResult.data;
  next();
};
