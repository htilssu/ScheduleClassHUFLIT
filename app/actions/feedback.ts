"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFeedback(data: {
  content: string;
  rating: number;
}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const feedback = await prisma.feedback.create({
      data: {
        content: data.content,
        rating: data.rating,
        userId: session.user.id,
      },
    });

    revalidatePath("/");
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Error creating feedback:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
