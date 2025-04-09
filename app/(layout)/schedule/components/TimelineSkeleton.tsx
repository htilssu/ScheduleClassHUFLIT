import { Card, SimpleGrid, Skeleton } from "@mantine/core";

interface TimelineSkeletonProps {
  count?: number;
}

/**
 * Component hiển thị giao diện skeleton cho danh sách lịch học khi đang tải.
 * @param count Số lượng skeleton card cần hiển thị (mặc định là 8).
 */
export function TimelineSkeleton({ count = 8 }: TimelineSkeletonProps) {
  return (
    <SimpleGrid
      cols={{ base: 1, xs: 1, sm: 1, md: 3, lg: 4 }}
      spacing={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
      verticalSpacing={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} padding="lg" radius="md" withBorder>
          <Skeleton height={100} mb="xl" />
          <Skeleton height={8} radius="xl" mb={10} />
          <Skeleton height={8} width="70%" radius="xl" mb="md" />
          <Skeleton height={8} width="40%" radius="xl" mb="xl" />
          <Skeleton height={36} radius="md" />
        </Card>
      ))}
    </SimpleGrid>
  );
}
