"use client";

import {
  Box,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  Skeleton,
  Button,
} from "@mantine/core";
import {
  IconCalendar,
  IconSchool,
  IconUsers,
  IconMessage,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface ChartData {
  date: string;
  users: number;
  classes: number;
  timelines: number;
  feedbacks: number;
}

interface FeedbackByDay {
  date: string;
  total: number;
  ratings: {
    [key: string]: number;
  };
}

const RATING_COLORS = {
  "1 sao": "#ff0000",
  "2 sao": "#ff6b00",
  "3 sao": "#ffd700",
  "4 sao": "#00b894",
  "5 sao": "#00c853",
};

async function fetchDashboardStats() {
  const response = await fetch("/v1/admin/stats/dashboard");
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Có lỗi xảy ra");
  }
  return response.json();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DashboardSkeleton() {
  return (
    <Box className="space-y-6">
      <Group justify="space-between">
        <Skeleton height={32} width={200} />
      </Group>

      <Grid>
        {[1, 2, 3, 4].map((index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <Group justify="space-between" mb={5}>
                <Skeleton height={20} width={120} />
                <Skeleton height={18} width={18} circle />
              </Group>
              <Skeleton height={36} width={100} mb={5} />
              <Skeleton height={16} width={200} />
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <Skeleton height={24} width={200} mb={5} />
                <Skeleton height={16} width={300} />
              </div>
              <Box h={400} w="100%">
                <Skeleton height="100%" />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <Skeleton height={24} width={200} mb={5} />
                <Skeleton height={16} width={300} />
              </div>
              <Box h={400} w="100%">
                <Skeleton height="100%" />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default function AdminDashboardPage() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // Cache trong 5 phút
    refetchOnWindowFocus: false, // Không refetch khi focus lại window
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Text c="red">
          {error instanceof Error ? error.message : "Có lỗi xảy ra"}
        </Text>
      </Box>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Box className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Dashboard</Title>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">
                Tổng người dùng
              </Text>
              <IconUsers size={18} color="gray" />
            </Group>
            <Text fw={700} size="xl">
              {stats.totalUsers?.toLocaleString() || 0}
            </Text>
            <Text size="xs" c="dimmed">
              +{stats.newUsersThisMonth?.toLocaleString() || 0} người dùng mới
              trong tháng này
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">
                Tổng lớp học
              </Text>
              <IconSchool size={18} color="gray" />
            </Group>
            <Text fw={700} size="xl">
              {stats.totalClasses?.toLocaleString() || 0}
            </Text>
            <Text size="xs" c="dimmed">
              +{stats.newClassesThisMonth?.toLocaleString() || 0} lớp học mới
              trong tháng này
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">
                Lịch học hoạt động
              </Text>
              <IconCalendar size={18} color="gray" />
            </Group>
            <Text fw={700} size="xl">
              {stats.activeTimelines?.toLocaleString() || 0}
            </Text>
            <Text size="xs" c="dimmed">
              {stats.recentlyUpdatedClasses?.toLocaleString() || 0} lớp học vừa
              cập nhật lịch
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">
                Tổng phản hồi
              </Text>
              <IconMessage size={18} color="gray" />
            </Group>
            <Text fw={700} size="xl">
              {stats.totalFeedbacks?.toLocaleString() || 0}
            </Text>
            <Text size="xs" c="dimmed">
              +{stats.feedbacksThisMonth?.toLocaleString() || 0} phản hồi trong
              tháng này
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <Title order={4}>Lịch sử hoạt động</Title>
                <Text size="sm" c="dimmed">
                  Hoạt động của người dùng trong tháng hiện tại
                </Text>
              </div>
              <Box h={400} w="100%">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={2}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={formatFullDate} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      name="Người dùng mới"
                    />
                    <Line
                      type="monotone"
                      dataKey="classes"
                      stroke="#82ca9d"
                      name="Lớp học mới"
                    />
                    <Line
                      type="monotone"
                      dataKey="timelines"
                      stroke="#ffc658"
                      name="Lịch học cập nhật"
                    />
                    <Line
                      type="monotone"
                      dataKey="feedbacks"
                      stroke="#ff7300"
                      name="Phản hồi"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <div className="flex items-center gap-2">
                  <Title order={4}>Phân loại phản hồi</Title>
                  <Link href="/admin/feedbacks" passHref>
                    <Button component="a" variant="light" size="xs">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
                <Text size="sm" c="dimmed">
                  Số lượng phản hồi theo từng mức đánh giá trong tháng
                </Text>
              </div>
              <Box h={400} w="100%">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.feedbackByDay}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={2}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={formatFullDate} />
                    <Legend />
                    {Object.entries(RATING_COLORS).map(([rating, color]) => (
                      <Bar
                        key={rating}
                        dataKey={`ratings.${rating}`}
                        name={rating}
                        fill={color}
                        stackId="a"
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
