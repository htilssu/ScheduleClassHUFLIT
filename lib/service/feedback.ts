import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

type FeedbackResult = {
  data: any[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

/**
 * Hàm lấy danh sách feedback với phân trang, có cache
 */
export const getFeedbacks = unstable_cache(
  async (page: number = 1, limit: number = 5): Promise<FeedbackResult> => {
    const skip = (page - 1) * limit;

    const totalCountPromise = prisma.feedback.count();

    const feedbacksPromise = prisma.feedback.findMany({
      select: {
        id: true,
        content: true,
        rating: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: skip,
    });

    const [totalCount, feedbacks] = await Promise.all([
      totalCountPromise,
      feedbacksPromise,
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: feedbacks,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  },
  ["feedbacks"],
  { revalidate: 600, tags: ["feedback"] } // Cache trong 10 phút (600 giây)
);
