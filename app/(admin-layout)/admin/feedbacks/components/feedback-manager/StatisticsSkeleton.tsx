import { Paper, Title, Group, Text, Skeleton } from "@mantine/core";

export const StatisticsSkeleton = () => (
    <Paper withBorder p="md" mb="xl" radius="md">
        <Title order={3} mb="md">Thống kê đánh giá</Title>
        <Group align="flex-start" gap="xl">
            <div>
                <Text size="sm" c="dimmed">Đánh giá trung bình</Text>
                <Group gap="xs">
                    <Skeleton height={32} width={40} radius="xl" />
                    <Group gap={2}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} height={16} width={16} radius="xl" />
                        ))}
                    </Group>
                </Group>
            </div>
            <Group gap="xl">
                {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} style={{ textAlign: 'center' }}>
                        <Group gap={2} justify="center" mb={4}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} height={16} width={16} radius="xl" />
                            ))}
                        </Group>
                        <Skeleton height={20} width={40} radius="xl" />
                    </div>
                ))}
            </Group>
        </Group>
    </Paper>
); 