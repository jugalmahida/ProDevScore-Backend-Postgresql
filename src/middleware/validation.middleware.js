import { AppError } from "../utils/AppError.js";

/**
 * Validates request parts (body, params, query) against Zod schemas.
 * * Usage:
 * validate({
 * body: bodySchema,   // optional
 * params: paramSchema // optional
 * query: querySchema  // optional
 * })
 */
export const validate = (schemas) => (req, res, next) => {
  const validationErrors = [];

  // 1. Validate Body
  if (schemas.body) {
    const result = schemas.body.safeParse(req.body);
    if (!result.success) {
      validationErrors.push(
        ...result.error.errors.map((e) => `Body: ${e.message}`)
      );
    } else {
      req.body = result.data; // Strip unknown keys if using strict schemas
    }
  }

  // 2. Validate Params
  if (schemas.params) {
    const result = schemas.params.safeParse(req.params);
    if (!result.success) {
      validationErrors.push(
        ...result.error.errors.map((e) => `Params: ${e.message}`)
      );
    } else {
      // Note: Usually we don't replace req.params entirely as express relies on it,
      // but strictly typed parsing is fine if matches express route definitions.
      req.params = result.data;
    }
  }

  // 3. Validate Query (Optional but recommended)
  if (schemas.query) {
    const result = schemas.query.safeParse(req.query);
    if (!result.success) {
      validationErrors.push(
        ...result.error.errors.map((e) => `Query: ${e.message}`)
      );
    } else {
      req.query = result.data;
    }
  }

  // 4. If there are errors, throw them all at once
  if (validationErrors.length > 0) {
    const errorMsg = validationErrors.join(", ");
    return next(AppError.badRequest(errorMsg));
  }

  next();
};
