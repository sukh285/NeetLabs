import { db } from "../libs/db.js"; // or wherever your Prisma client is

export const getProblemByIdService = async (id) => {
  try {
    const problem = await db.problem.findUnique({
      where: { id },
    });
    return problem;
  } catch (err) {
    console.error("Error in getProblemByIdService:", err);
    return null;
  }
};
