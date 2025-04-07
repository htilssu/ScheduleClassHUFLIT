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
  statistics: {
    ratingStats: Array<{ rating: number; _count: { rating: number } }>;
    averageRating: number;
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
            role: true,
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

    // Get rating statistics
    const ratingStats = await prisma.feedback.groupBy({
      by: ['rating'],
      _count: {
        rating: true
      }
    });

    // Get average rating
    const totalRating = await prisma.feedback.aggregate({
      _avg: {
        rating: true
      }
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: feedbacks,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
      statistics: {
        ratingStats,
        averageRating: totalRating._avg.rating || 0
      }
    };
  },
  ["feedbacks"],
  { revalidate: 600, tags: ["feedback"] } // Cache trong 10 phút (600 giây)
);
