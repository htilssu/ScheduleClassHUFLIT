import { Paper, Title, Group, Text, Badge } from "@mantine/core";
import { Star } from "lucide-react";
import { RatingStat } from "./types";
import { RATING_COLORS } from "./constants";

interface StatisticsProps {
    statistics: {
        ratingStats: RatingStat[];
        averageRating: number;
    };
}

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
        <Star
            key={index}
            className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
    ));
};

const getRatingColor = (rating: number) => {
    return RATING_COLORS[`${rating} sao` as keyof typeof RATING_COLORS] || '#000000';
};

export const Statistics = ({ statistics }: StatisticsProps) => {
    // Calculate total number of feedbacks
    const totalFeedbacks = statistics.ratingStats.reduce((sum, stat) => sum + stat._count.rating, 0);

    return (
        <Paper withBorder p="md" mb="xl" radius="md">
            <Title order={3} mb="md">Thống kê đánh giá</Title>
            <Group align="flex-start" gap="xl">
                <div>
                    <Group gap={"xs"}>
                        <Text size="sm" c="dimmed">Đánh giá trung bình</Text>
                        <Badge color={"gray"} variant="light">
                            ({totalFeedbacks})
                        </Badge>
                    </Group>
                    <Group gap="xs">
                        <Text size="xl" fw={700} c={getRatingColor(Math.round(statistics.averageRating))}>
                            {statistics.averageRating.toFixed(1)}
                        </Text>
                        <Group gap={2}>{renderStars(Math.round(statistics.averageRating))}</Group>
                    </Group>
                </div>
                <Group gap="xl">
                    {statistics.ratingStats
                        .sort((a, b) => b.rating - a.rating)
                        .map((stat: RatingStat) => (
                            <div key={stat.rating} style={{ textAlign: 'center' }}>
                                <Group gap={2} justify="center" mb={4}>
                                    {renderStars(stat.rating)}
                                </Group>
                                <Badge color={"gray"} variant="light">
                                    {stat._count.rating}
                                </Badge>
                            </div>
                        ))}
                </Group>
            </Group>
        </Paper>
    );
}; 