import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Lấy thông tin từ session sử dụng auth()
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Không tìm thấy phiên đăng nhập" },
      { status: 401 }
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
            createdAt: true
          },
        })
      : null;

    // Trả về dữ liệu user từ DB hoặc từ session nếu không tìm thấy
    if (userData) {
      return NextResponse.json(userData);
    } else {
      // Trả về dữ liệu có sẵn từ session với cấu trúc tương tự
      return NextResponse.json({
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        role: "DEFAULT_USER", // Giá trị mặc định khớp với enum trong Prisma
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
