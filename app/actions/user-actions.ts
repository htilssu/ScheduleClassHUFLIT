"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary, { deleteImage } from "@/lib/cloudinary";

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

export async function updateImageUserProfile(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, message: "Chưa đăng nhập" };
    }

    const file = formData.get('image') as File;
    if (!file) {
      return { success: false, message: "Không tìm thấy ảnh" };
    }

    // Lấy thông tin user hiện tại để có URL ảnh cũ
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true }
    });

    // Nếu có ảnh cũ, xóa nó khỏi Cloudinary
    if (currentUser?.image) {
      try {
        // Trích xuất public_id từ URL Cloudinary
        const url = new URL(currentUser.image);
        const pathParts = url.pathname.split('/');
        // Lấy folder và tên file (bỏ qua phần mở rộng)
        const folder = pathParts[pathParts.length - 2]; // user-avatars
        const fileName = pathParts[pathParts.length - 1].split('.')[0]; // kbv1wdkpaikogkjxfavm
        const publicId = `${folder}/${fileName}`;
        console.log('Deleting old image with public_id:', publicId);
        await deleteImage(publicId);
      } catch (error) {
        console.error('Error deleting old image:', error);
        // Tiếp tục quá trình upload ảnh mới ngay cả khi xóa ảnh cũ thất bại
      }
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "user-avatars",
          },
          (error: Error | undefined, result: any) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    if (!uploadResponse) {
      return { success: false, message: "Lỗi khi tải ảnh lên" };
    }

    // Update user profile with new image URL
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: (uploadResponse as any).secure_url,
      },
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
    console.error("Lỗi khi cập nhật ảnh đại diện:", error);
    return { success: false, message: "Có lỗi xảy ra khi cập nhật ảnh đại diện" };
  }
}
