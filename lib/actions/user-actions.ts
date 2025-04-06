"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
  formData:
    | FormData
    | {
        name?: string;
        username?: string;
        image?: string;
      }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, message: "Chưa đăng nhập" };
    }

    // Chuyển đổi formData sang object nếu cần
    const data =
      formData instanceof FormData
        ? Object.fromEntries(formData.entries())
        : formData;

    // Lọc bỏ các trường undefined hoặc null
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.username) updateData.username = data.username;
    if (data.image) updateData.image = data.image;

    // Kiểm tra xem có dữ liệu cập nhật không
    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "Không có thông tin cập nhật" };
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        role: true,
      },
    });

    revalidatePath("/profile");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    return { success: false, message: "Có lỗi xảy ra khi cập nhật thông tin" };
  }
}
