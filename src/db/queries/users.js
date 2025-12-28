import { db } from "../../config/db.config.js";
import { usersTable } from "../schema/users.js";

export const createUser = async (userData) => {
  try {
    const [user] = await db.insert(usersTable).values(userData).returning();
    user.password = "";
    return user;
  } catch (error) {
    throw Error(`Error while creating user: ${error.message}`);
  }
};
