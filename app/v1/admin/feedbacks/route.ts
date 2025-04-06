"use server";

import {NextRequest, NextResponse} from "next/server";
import { auth } from "@/lib/auth";
import { ForbiddenError } from "@/lib/exceptions/ForbiddenError";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
    try {
        const session = await auth();

        if (!session?.user) {
            throw new ForbiddenError("Bạn không có quyền truy cập thông tin này");
        }

        const url = new URL(request.url);
        const searchParams = url.searchParams;

        const limit = Number(searchParams.get("limit")) || 10;
        const page = Number(searchParams.get("page")) || 1;
        const rating = searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined;

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Build where clause for filtering
        const where = rating ? { rating } : {};

        // Get total count for pagination
        const total = await prisma.feedback.count({ where });

        // Get feedbacks with user information
        const feedbacks = await prisma.feedback.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit
        });

        // Calculate rating statistics
        const ratingStats = await prisma.feedback.groupBy({
            by: ['rating'],
            _count: {
                rating: true
            }
        });

        // Calculate average rating
        const totalRating = await prisma.feedback.aggregate({
            _avg: {
                rating: true
            }
        });

        return NextResponse.json({
            feedbacks,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            statistics: {
                ratingStats,
                averageRating: totalRating._avg.rating || 0
            }
        });

    } catch (error) {
        if (error instanceof ForbiddenError) {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi lấy danh sách FeedBack" },
            { status: 500 }
        );
    }
}
