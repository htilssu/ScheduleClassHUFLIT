import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Không tìm thấy phiên đăng nhập" },
      { status: 401 },
    );
  }

  try {
    // Lấy thông tin chi tiết từ database dựa trên id người dùng
    const userData = session.user.id
      ? await prisma.user.findUnique({
          where: { id: session.user.id },
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            image: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        })
      : null;

    if (userData) {
      if (!userData.isActive || userData.role !== session.user.role) {
        const cookieStore = await cookies();
        cookieStore.delete("schedule-session");

        return NextResponse.json(
          { error: "Tài khoản bị khóa hoặc không có quyền truy cập" },
          { status: 403 },
        );
      }

      return NextResponse.json(userData);
    } else {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
