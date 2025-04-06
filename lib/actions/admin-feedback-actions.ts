import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateFeedbackSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Nội dung phải có ít nhất 10 ký tự." })
    .max(1000, { message: "Nội dung không được quá 1000 ký tự." }),
});

// Hàm kiểm tra bad word từ database
async function containsBadWord(text: string): Promise<boolean> {
  const badWords = await prisma.badWord.findMany({
    select: { word: true },
  });
  const lowerText = text.toLowerCase();
  return badWords.some((bw) => lowerText.includes(bw.word));
}

export async function createFeedbackAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["Bạn cần đăng nhập để thực hiện hành động này."],
      },
      success: false,
    };
  }

  const validatedFields = CreateFeedbackSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { content } = validatedFields.data;

  // Kiểm tra bad word
  const hasBadWord = await containsBadWord(content);
  if (hasBadWord) {
    return {
      errors: {
        content: ["Nội dung chứa từ ngữ không phù hợp."],
      },
      success: false,
    };
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        content,
        userId: session.user.id,
      },
    });
    revalidatePath("/admin/feedbacks");
    return {
      success: true,
      feedback,
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Có lỗi xảy ra, vui lòng thử lại."],
      },
      success: false,
    };
  }
}

export async function deleteFeedbackAction(id: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return {
      error: "Không có quyền truy cập.",
      success: false,
    };
  }

  try {
    await prisma.feedback.delete({
      where: { id },
    });
    revalidatePath("/admin/feedbacks");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Có lỗi xảy ra khi xóa feedback.",
      success: false,
    };
  }
}
