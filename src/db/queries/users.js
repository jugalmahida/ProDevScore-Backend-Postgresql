import { db } from "../../config/db.config.js";
import { usersTable } from "../schema/users.js";
import { executeQuery } from "../../utils/ExecuteQuery.js";
import { eq } from "drizzle-orm";

// Checkout queries docs
// https://orm.drizzle.team/docs/data-querying

export const createUser = async (userData) => {
  const [user] = await executeQuery(
    async () => await db.insert(usersTable).values(userData).returning(),
    "Error while creating user"
  );
  return user;
};

export const getAllUsers = async () => {
  const [users] = await executeQuery(
    async () => await db.select().from(usersTable),
    "Error while getting users"
  );
  return users;
};

export const updateUser = async (userData) => {
  const [updatedUser] = await executeQuery(
    async () =>
      await db
        .update(usersTable)
        .set(userData)
        .where(eq(usersTable.id, userData.id))
        .returning(),
    "Error while updating users"
  );
  return updatedUser;
};

export const deleteUser = async (id) => {
  const [deletedUser] = await executeQuery(
    async () =>
      await db.delete(usersTable).where(eq(usersTable.id, id)).returning(),
    "Error while deleting users"
  );
  return deletedUser;
};
