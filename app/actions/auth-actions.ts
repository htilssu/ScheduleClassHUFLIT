"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterData, RegisterResponse } from "../types/auth";
// Hàm kiểm tra định dạng email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function signUp(data: RegisterData): Promise<RegisterResponse> {
  try {
    const { name, username, password } = data;

    // Validate input
    if (!name || !username || !password) {
      return {
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      };
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return {
        success: false,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      };
    }

    // Kiểm tra người dùng đã tồn tại chưa
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }, // Kiểm tra cả email nếu username là email
        ],
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Tên đăng nhập hoặc email đã tồn tại",
      };
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Xác định giá trị email
    const emailValue = isValidEmail(username) ? username : null;

    // Tạo người dùng mới
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: emailValue,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Đăng ký thành công",
    };
  } catch (error) {
    console.error("Error in signUp process:", error);

    // Kiểm tra lỗi unique constraint cụ thể của Prisma
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      if (error.message.includes("User_username_key")) {
        return { success: false, message: "Tên đăng nhập đã tồn tại." };
      }
      if (error.message.includes("User_email_key")) {
        return { success: false, message: "Email đã tồn tại." };
      }
      // Có thể thêm kiểm tra cho các key unique khác nếu cần
      return {
        success: false,
        message: "Lỗi ràng buộc dữ liệu. Vui lòng kiểm tra lại thông tin.",
      };
    }

    // Lỗi chung
    return {
      success: false,
      message: "Có lỗi không xác định xảy ra khi đăng ký",
    };
  }
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Chưa đăng nhập",
      };
    }

    const { currentPassword, newPassword } = data;

    // Validate input
    if (!currentPassword || !newPassword) {
      return {
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      };
    }

    // Check password length
    if (newPassword.length < 6) {
      return {
        success: false,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      };
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user) {
      return {
        success: false,
        message: "Không tìm thấy người dùng",
      };
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return {
        success: false,
        message: "Mật khẩu hiện tại không đúng",
      };
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: "Đổi mật khẩu thành công",
    };
  } catch (error) {
    console.error("Error in changePassword:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi đổi mật khẩu",
    };
  }
}
