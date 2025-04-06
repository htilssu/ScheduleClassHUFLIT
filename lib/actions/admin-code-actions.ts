"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema validation cho việc tạo mã
const CreateCodeSchema = z.object({
  expiredAt: z
    .date({
      required_error: "Ngày hết hạn là bắt buộc",
      invalid_type_error: "Ngày hết hạn không hợp lệ",
    })
    .min(new Date(Date.now() + 12 * 60 * 60 * 1000), {
      // Tối thiểu 12h kể từ bây giờ
      message: "Ngày hết hạn phải ở tương lai (ít nhất 12 giờ)",
    }),
  maxUses: z
    .number({
      required_error: "Số lần sử dụng tối đa là bắt buộc",
      invalid_type_error: "Số lần sử dụng tối đa không hợp lệ",
    })
    .min(1, {
      message: "Số lần sử dụng tối đa phải lớn hơn hoặc bằng 1",
    }),
});

// Server action tạo mã mới
export async function createCodeAction(formData: FormData) {
  const session = await auth();
  const validatedFields = CreateCodeSchema.safeParse({
    expiredAt: new Date(formData.get("expiredAt") as string),
    maxUses: parseInt(formData.get("maxUses") as string, 10),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Tạo mã ngẫu nhiên 8 ký tự
    const code = nanoid(8).toUpperCase();

    if (!session?.user?.id) {
      return {
        errors: {
          _form: ["Không tìm thấy thông tin người dùng"],
        },
      };
    }

    const newCode = await prisma.code.create({
      data: {
        code,
        expiredAt: validatedFields.data.expiredAt,
        createdBy: session.user.id,
        maxUses: validatedFields.data.maxUses,
        usedCount: 0,
      },
    });

    revalidatePath("/admin/codes");
    return { success: true, code: newCode };
  } catch (error) {
    console.error("Error creating code:", error);
    return {
      errors: {
        _form: ["Có lỗi xảy ra khi tạo mã"],
      },
    };
  }
}

// Server action xóa mã
export async function deleteCodeAction(id: string) {
  try {
    if (!id) {
      return { success: false, error: "Thiếu ID của mã cần xóa" };
    }

    // Kiểm tra xem mã có tồn tại không
    const existingCode = await prisma.code.findUnique({
      where: { id: id },
    });

    if (!existingCode) {
      return { success: false, error: "Không tìm thấy mã" };
    }

    // Xóa mã
    await prisma.code.delete({
      where: { id: id },
    });

    revalidatePath("/admin/codes"); // Cập nhật cache
    return { success: true };
  } catch (error) {
    console.error(`Lỗi khi xóa mã ${id} (action):`, error);
    return { success: false, error: "Có lỗi xảy ra khi xóa mã" };
  }
}
