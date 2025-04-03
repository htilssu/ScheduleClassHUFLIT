"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Hàm GET để lấy danh sách mã
export async function GET() {
  try {
    const codes = await prisma.code.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(codes);
  } catch (error) {
    console.error("Error fetching codes:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy danh sách mã" },
      { status: 500 }
    );
  }
}
