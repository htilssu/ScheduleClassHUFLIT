"use client";

import { Box, Card, Grid, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconActivity,
  IconCalendar,
  IconClock,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";

export default function AdminDashboardPage() {
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
              5,234
            </Text>
            <Text size="xs" c="dimmed">
              +120 người dùng mới trong tháng này
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
              132
            </Text>
            <Text size="xs" c="dimmed">
              +8 lớp học mới trong tháng này
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
              85
            </Text>
            <Text size="xs" c="dimmed">
              23 lớp học vừa cập nhật lịch
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb={5}>
              <Text fw={500} size="sm">
                Hoạt động
              </Text>
              <IconActivity size={18} color="gray" />
            </Group>
            <Text fw={700} size="xl">
              +573
            </Text>
            <Text size="xs" c="dimmed">
              +48% so với tuần trước
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <Title order={4}>Lịch sử hoạt động</Title>
                <Text size="sm" c="dimmed">
                  Hoạt động của người dùng trong tuần qua
                </Text>
              </div>
              <Box
                h={300}
                w="100%"
                bg="gray.1"
                style={{ borderRadius: "8px" }}
                className="flex items-center justify-center"
              >
                <Text c="dimmed">Biểu đồ hoạt động sẽ hiển thị ở đây</Text>
              </Box>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack>
              <div>
                <Title order={4}>Lịch học sắp diễn ra</Title>
                <Text size="sm" c="dimmed">
                  Trong 48 giờ tới
                </Text>
              </div>
              <Stack gap="sm">
                {[1, 2, 3, 4].map((item) => (
                  <Box
                    key={item}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <Text size="sm" fw={500}>
                        Nhập môn lập trình
                      </Text>
                      <Group gap="xs">
                        <IconClock size={12} color="gray" />
                        <Text size="xs" c="dimmed">
                          8:00 - 11:30, 12/04/2023
                        </Text>
                      </Group>
                    </div>
                    <Box
                      bg="orange.1"
                      c="orange"
                      className="text-xs px-2 py-1 rounded"
                    >
                      307A1
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
