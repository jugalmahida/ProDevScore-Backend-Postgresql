import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";
import {
  createUserValidationSchema,
  userIdValidationSchema,
} from "../validations/users.validation.js";

import { validate } from "../middleware/validation.middleware.js";

const router = Router();

router.post(
  "/register",
  validate({ body: createUserValidationSchema }),
  registerUser
);

// router.post("/verifyCode", verifyCodeAndSetTokens);

// router.post("/login", loginUser);

// router.post("/refresh-tokens", refreshTokens);

// router.post("/forget-password", forgetPassword);

// router.post("/verifyToken/:token", verifyForgetPasswordTokenAndResetPassword);

// router.get("/me", authMiddleware, isAdminOrUser, getCurrentUser);

export default router;
