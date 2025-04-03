"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema cho việc tạo từ cấm
const CreateBadWordSchema = z.object({
  words: z.array(z.string().min(1, "Từ cấm không được để trống")),
});

// Lấy danh sách bad word (có thể dùng trực tiếp prisma trong Server Component nếu cần)
export async function getBadWordsAction() {
  try {
    const badWords = await prisma.badWord.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, badWords };
  } catch (error) {
    return { success: false, error: "Không thể lấy danh sách từ cấm" };
  }
}

// Thêm bad word mới
export async function createBadWordAction(words: string[]) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Không có quyền truy cập." };
  }

  try {
    // Validate dữ liệu
    const validatedFields = CreateBadWordSchema.safeParse({ words });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Tạo nhiều từ cấm cùng lúc
    const createdBadWords = await prisma.$transaction(
      validatedFields.data.words.map((word) =>
        prisma.badWord.create({
          data: { word },
        })
      )
    );

    revalidatePath("/admin/badwords"); // Revalidate trang quản lý
    return { success: true, badWords: createdBadWords };
  } catch (error) {
    console.error("Error creating bad word:", error);
    return {
      success: false,
      error: "Không thể thêm từ cấm",
    };
  }
}

// Xóa bad word
export async function deleteBadWordAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Không có quyền truy cập." };
  }

  if (!id) {
    return { success: false, error: "ID không hợp lệ." };
  }

  try {
    await prisma.badWord.delete({
      where: { id },
    });
    revalidatePath("/admin/badwords"); // Revalidate trang quản lý
    return { success: true };
  } catch (error) {
    console.error("Error deleting bad word:", error);
    return { success: false, error: "Lỗi khi xóa từ cấm." };
  }
}
