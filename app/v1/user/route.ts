import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Lấy thông tin từ session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Không tìm thấy phiên đăng nhập" },
      { status: 401 }
    );
  }

  try {
    // Lấy thông tin chi tiết từ database nếu có email
    const userData = session.user.email
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
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
        role: "user", // Giá trị mặc định
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
