"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface TimelineData {
  name: string;
  description?: string;
}

interface UpdateTimelineData extends TimelineData {
  id: string;
}

interface TimelineResult {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Server action tạo timeline mới
 * @param data Dữ liệu timeline
 * @returns Kết quả thao tác
 */
export async function createTimeline(
  data: TimelineData
): Promise<TimelineResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Người dùng chưa đăng nhập",
      };
    }

    if (!data.name || data.name.trim() === "") {
      return {
        success: false,
        error: "Tên lịch học không được để trống",
      };
    }

    const timeline = await prisma.timeline.create({
      data: {
        name: data.name.trim(),
        description: data.description,
        userId: session.user.id,
      },
    });

    revalidatePath("/schedule");

    return {
      success: true,
      data: timeline,
    };
  } catch (error) {
    console.error("Lỗi khi tạo timeline:", error);
    return {
      success: false,
      error: "Không thể tạo lịch học mới",
    };
  }
}

/**
 * Server action cập nhật timeline
 * @param data Dữ liệu timeline cần cập nhật
 * @returns Kết quả thao tác
 */
export async function updateTimeline(
  data: UpdateTimelineData
): Promise<TimelineResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Người dùng chưa đăng nhập",
      };
    }

    if (!data.name || data.name.trim() === "") {
      return {
        success: false,
        error: "Tên lịch học không được để trống",
      };
    }

    // Kiểm tra quyền
    const existingTimeline = await prisma.timeline.findUnique({
      where: {
        id: data.id,
        userId: session.user.id,
      },
    });

    if (!existingTimeline) {
      return {
        success: false,
        error: "Không tìm thấy lịch học hoặc không có quyền chỉnh sửa",
      };
    }

    const timeline = await prisma.timeline.update({
      where: { id: data.id },
      data: {
        name: data.name.trim(),
        description: data.description,
      },
    });

    revalidatePath("/schedule");

    return {
      success: true,
      data: timeline,
    };
  } catch (error) {
    console.error("Lỗi khi cập nhật timeline:", error);
    return {
      success: false,
      error: "Không thể cập nhật lịch học",
    };
  }
}

/**
 * Server action xóa timeline
 * @param id ID của timeline cần xóa
 * @returns Kết quả thao tác
 */
export async function deleteTimeline(id: string): Promise<TimelineResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Người dùng chưa đăng nhập",
      };
    }

    // Kiểm tra quyền
    const existingTimeline = await prisma.timeline.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingTimeline) {
      return {
        success: false,
        error: "Không tìm thấy lịch học hoặc không có quyền xóa",
      };
    }

    await prisma.timeline.delete({
      where: { id },
    });

    revalidatePath("/schedule");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Lỗi khi xóa timeline:", error);
    return {
      success: false,
      error: "Không thể xóa lịch học",
    };
  }
}
