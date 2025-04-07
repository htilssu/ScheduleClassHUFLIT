import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /v1/timeline - Lấy danh sách timeline của người dùng
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Người dùng chưa đăng nhập" },
        { status: 401 }
      );
    }

    const timelines = await prisma.timeline.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(timelines);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách timeline:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách lịch học" },
      { status: 500 }
    );
  }
}
