import { db } from "@/db";

export async function deleteUser(userId: string) {
  await db.user.delete({
    where: {
      id: userId
    }
  });
}
