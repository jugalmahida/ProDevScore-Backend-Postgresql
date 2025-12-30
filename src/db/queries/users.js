import { db } from "../../config/db.config.js";
import { usersTable } from "../schema/users.schema.js";
import { executeQuery } from "../../utils/ExecuteQuery.js";
import { eq } from "drizzle-orm";

// Checkout queries docs
// https://orm.drizzle.team/docs/data-querying

export const createUserQuery = async (userData) => {
  const [user] = await executeQuery(
    async () => await db.insert(usersTable).values(userData).returning(),
    "Error while creating user"
  );
  return user;
};

export const getAllUsersQuery = async () => {
  const users = await executeQuery(
    async () => await db.select().from(usersTable),
    "Error while getting users"
  );
  return users;
};

export const getUserByIdQuery = async (id) => {
  const users = await executeQuery(
    async () => await db.select().from(usersTable).where(eq(usersTable.id, id)),
    "Error while getting user"
  );
  return users;
};

export const getUserByEmailQuery = async (email) => {
  const users = await executeQuery(
    async () =>
      await db.select().from(usersTable).where(eq(usersTable.email, email)),
    "Error while getting user by email"
  );
  return users;
};

export const updateUserQuery = async (userData, id) => {
  const [updatedUser] = await executeQuery(
    async () =>
      await db
        .update(usersTable)
        .set(userData)
        .where(eq(usersTable.id, id))
        .returning(),
    "Error while updating users"
  );
  return updatedUser;
};

export const deleteUserQuery = async (id) => {
  const [deletedUser] = await executeQuery(
    async () =>
      await db.delete(usersTable).where(eq(usersTable.id, id)).returning(),
    "Error while deleting users"
  );
  return deletedUser;
};
