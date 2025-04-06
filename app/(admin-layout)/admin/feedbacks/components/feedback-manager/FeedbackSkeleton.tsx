import { Card, Group, Stack, Skeleton } from "@mantine/core";

export const FeedbackSkeleton = () => (
    <Card withBorder radius="md" p="md">
        <Group justify="space-between" align="flex-start">
            <Stack gap="xs" style={{ flex: 1 }}>
                <Group gap="xs">
                    <Group gap={2}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} height={16} width={16} radius="xl" />
                        ))}
                    </Group>
                    <Skeleton height={20} width={60} radius="xl" />
                </Group>
                <Group gap="xs">
                    <Skeleton height={20} width={150} radius="xl" />
                    <Skeleton height={16} width={200} radius="xl" />
                </Group>
                <Skeleton height={40} width="100%" radius="md" />
                <Skeleton height={16} width={200} radius="xl" />
            </Stack>
            <Skeleton height={32} width={32} radius="xl" />
        </Group>
    </Card>
); 