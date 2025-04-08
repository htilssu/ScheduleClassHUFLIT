import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ForbiddenError } from "@/lib/exceptions/ForbiddenError";

/**
 * Tạo đối tượng Date ở múi giờ UTC với giờ cụ thể
 * @param year - Năm
 * @param month - Tháng (0-11)
 * @param day - Ngày
 * @param hours - Giờ
 * @param minutes - Phút
 * @param seconds - Giây
 * @param ms - Mili giây
 * @returns Đối tượng Date ở múi giờ UTC
 */
function createUTCDate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0
): Date {
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new ForbiddenError("Bạn không có quyền truy cập thông tin này");
    }

    // Lấy thời gian đầu và cuối tháng hiện tại
    const now = new Date();
    const startOfMonth = createUTCDate(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = createUTCDate(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Lấy tổng số người dùng và số người dùng mới trong tháng
    const [totalUsers, newUsersThisMonth] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
    ]);

    // Lấy tổng số lớp học và số lớp mới trong tháng
    const [totalClasses, newClassesThisMonth] = await Promise.all([
      prisma.class.count(),
      prisma.class.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
    ]);

    // Tạo thời gian 7 ngày trước và 24 giờ trước theo UTC
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const sevenDaysAgoUTC = createUTCDate(
      sevenDaysAgo.getFullYear(),
      sevenDaysAgo.getMonth(),
      sevenDaysAgo.getDate()
    );

    const oneDayAgoUTC = createUTCDate(
      oneDayAgo.getFullYear(),
      oneDayAgo.getMonth(),
      oneDayAgo.getDate(),
      oneDayAgo.getHours(),
      oneDayAgo.getMinutes(),
      oneDayAgo.getSeconds()
    );

    // Lấy số timeLine đang hoạt động và số timeLine vừa cập nhật
    const [activeTimeLines, recentlyUpdatedTimeLines] = await Promise.all([
      prisma.timeLine.count({
        where: {
          updatedAt: {
            gte: sevenDaysAgoUTC, // 7 ngày qua với UTC
          },
        },
      }),
      prisma.timeLine.count({
        where: {
          updatedAt: {
            gte: oneDayAgoUTC, // 24 giờ qua với UTC
          },
        },
      }),
    ]);

    // Lấy thông tin phân tích feedback
    const [totalFeedbacks, feedbacksThisMonth] = await Promise.all([
      prisma.feedback.count(),
      prisma.feedback.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
    ]);

    // Lấy số lượng feedback theo từng ngày trong tháng
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    const feedbackByDay = await Promise.all(
      Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
        // Tạo startOfDay và endOfDay theo UTC
        const startOfDay = createUTCDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const endOfDay = createUTCDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59,
          999
        );

        return Promise.all([
          prisma.feedback.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
          prisma.feedback.groupBy({
            by: ["rating"],
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
            _count: {
              rating: true,
            },
          }),
        ]).then(([total, byRating]) => ({
          date: startOfDay.toISOString(),
          total,
          ratings: byRating.reduce(
            (acc, curr) => ({
              ...acc,
              [`${curr.rating} sao`]: curr._count.rating,
            }),
            {}
          ),
        }));
      })
    );

    // Lấy phân tích theo loại feedback
    const feedbackTypes = await prisma.feedback.groupBy({
      by: ["rating"],
      _count: {
        rating: true,
      },
    });

    // Lấy dữ liệu cho biểu đồ theo từng ngày trong 7 ngày qua
    const chartData = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        // Tạo startOfDay và endOfDay theo UTC
        const startOfDay = createUTCDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const endOfDay = createUTCDate(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59,
          999
        );

        return Promise.all([
          prisma.user.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
          prisma.class.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
          prisma.timeLine.count({
            where: {
              updatedAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
          prisma.feedback.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }),
        ]).then(([users, classes, timeLines, feedbacks]) => ({
          date: startOfDay.toISOString(),
          users,
          classes,
          timeLines,
          feedbacks,
        }));
      })
    );

    return NextResponse.json({
      totalUsers,
      newUsersThisMonth,
      totalClasses,
      newClassesThisMonth,
      activeTimeLines,
      recentlyUpdatedClasses: recentlyUpdatedTimeLines,
      totalFeedbacks,
      feedbacksThisMonth,
      feedbackByDay,
      feedbackTypes,
      chartData: chartData.reverse(),
    });
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy thông tin thống kê" },
      { status: 500 }
    );
  }
}
