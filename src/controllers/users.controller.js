import {
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIdQuery,
  updateUserQuery,
  getUserByEmailQuery,
} from "../db/queries/users.js";

import { asyncHandler } from "../utils/AsyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { AppSuccess } from "../utils/AppSuccess.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const exitingUser = await getUserByEmailQuery(email);
  
  if (exitingUser) {
    return next(AppError.conflict("User already exists"));
  }

  const newUser = await createUserQuery({ fullName, email, password });

  // const freePlan = await PricingPlan.findOne({ tier: "free" });

  // if (!freePlan) {
  //   return AppError.internalError("Free plan configuration error");
  // }

  // // Temporary setting the one month limit.
  // const now = new Date();
  // const oneMonthLater = new Date(now);
  // oneMonthLater.setMonth(now.getMonth() + 1);

  // await UserSubscriptions.create({
  //   userId: checkNewUser._id,
  //   currentPlan: freePlan._id,
  //   currentUsage: {
  //     repositories: 0,
  //     commits: 0,
  //     lastResetDate: now,
  //   },
  //   startDate: now,
  //   endDate: oneMonthLater,
  //   renewalDate: oneMonthLater,
  // });
  AppSuccess.ok(newUser).send(res);
});
