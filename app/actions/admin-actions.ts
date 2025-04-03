"use server";

import { revalidatePath } from "next/cache";
import { User } from "@/hooks/useUsers";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function updateUser(userId: string, userData: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name,
        role: userData.role as Role,
        isActive: userData.isActive
      },
    });

    revalidatePath("/admin/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
