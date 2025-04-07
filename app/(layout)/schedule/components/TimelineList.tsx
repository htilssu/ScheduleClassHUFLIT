"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Text,
  SimpleGrid,
  Button,
  Group,
  Modal,
  TextInput,
  ActionIcon,
  Menu,
  Textarea,
  Container,
  Title,
  Paper,
  Badge,
  Center,
  Loader,
  Image,
  Skeleton,
  Box,
  Flex,
  rem,
} from "@mantine/core";
import {
  IconCalendar,
  IconPlus,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconCalendarTime,
  IconEye,
  IconEdit,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import {
  createTimeline,
  deleteTimeline,
  updateTimeline,
} from "@/lib/actions/timeline-actions";
interface Timeline {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface TimelineListProps {
  userId: string;
}

export function TimelineList({ userId }: TimelineListProps) {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [timelineName, setTimelineName] = useState("");
  const [timelineDesc, setTimelineDesc] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | null>(
    null
  );
  const [createOpened, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  useEffect(() => {
    fetchTimelines();
  }, []);

  const fetchTimelines = async () => {
    try {
      setLoading(true);
      const response = await fetch("/v1/timeline");
      if (!response.ok) {
        throw new Error("Không thể tải danh sách lịch học");
      }
      const data = await response.json();
      setTimelines(data);
    } catch (error) {
      console.error("Lỗi khi tải timeline:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể tải danh sách lịch học",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTimeline = async () => {
    try {
      const result = await createTimeline({
        name: timelineName,
        description: timelineDesc || undefined,
      });

      if (result.success) {
        notifications.show({
          title: "Thành công",
          message: "Đã tạo lịch học mới",
          color: "green",
        });
        setTimelineName("");
        setTimelineDesc("");
        closeCreate();
        fetchTimelines();
      } else {
        notifications.show({
          title: "Lỗi",
          message: result.error || "Không thể tạo lịch học mới",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo timeline:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể tạo lịch học mới",
        color: "red",
      });
    }
  };

  const handleEditTimeline = async () => {
    if (!selectedTimeline) return;

    try {
      const result = await updateTimeline({
        id: selectedTimeline.id,
        name: timelineName,
        description: timelineDesc || undefined,
      });

      if (result.success) {
        notifications.show({
          title: "Thành công",
          message: "Đã cập nhật lịch học",
          color: "green",
        });
        setSelectedTimeline(null);
        setTimelineName("");
        setTimelineDesc("");
        closeEdit();
        fetchTimelines();
      } else {
        notifications.show({
          title: "Lỗi",
          message: result.error || "Không thể cập nhật lịch học",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật timeline:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật lịch học",
        color: "red",
      });
    }
  };

  const handleDeleteTimeline = async () => {
    if (!selectedTimeline) return;

    try {
      const result = await deleteTimeline(selectedTimeline.id);

      if (result.success) {
        notifications.show({
          title: "Thành công",
          message: "Đã xóa lịch học",
          color: "green",
        });
        setSelectedTimeline(null);
        closeDelete();
        fetchTimelines();
      } else {
        notifications.show({
          title: "Lỗi",
          message: result.error || "Không thể xóa lịch học",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa timeline:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể xóa lịch học",
        color: "red",
      });
    }
  };

  const openEditModal = (timeline: Timeline) => {
    setSelectedTimeline(timeline);
    setTimelineName(timeline.name);
    setTimelineDesc(timeline.description || "");
    openEdit();
  };

  const openDeleteModal = (timeline: Timeline) => {
    setSelectedTimeline(timeline);
    openDelete();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Container
      size="lg"
      py="xl"
      className="border-[1px] border-gray-200 rounded-md my-20"
    >
      <Box>
        <Flex justify="space-between" align="center" mb="lg">
          <Title order={2}>
            <IconCalendarTime
              size={22}
              style={{ marginRight: 10, marginBottom: -2 }}
            />
            Lịch học của tôi
          </Title>
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={openCreate}
            variant="filled"
            radius="md"
            size="md"
          >
            Tạo lịch học mới
          </Button>
        </Flex>

        {loading ? (
          <Paper p="xl" radius="md" withBorder>
            <Center style={{ height: 200 }}>
              <Loader size="lg" />
            </Center>
          </Paper>
        ) : timelines.length === 0 ? (
          <Paper p="xl" radius="md" withBorder>
            <Center
              style={{ flexDirection: "column", height: 300, padding: 20 }}
            >
              <IconCalendar
                size={60}
                style={{ opacity: 0.3, marginBottom: 20 }}
              />
              <Text fw={600} size="xl" ta="center" mb={10}>
                Bạn chưa có lịch học nào
              </Text>
              <Text c="dimmed" ta="center" mb={20}>
                Tạo lịch học mới để quản lý thời gian học tập hiệu quả hơn
              </Text>
              <Button
                onClick={openCreate}
                variant="light"
                leftSection={<IconPlus size={14} />}
              >
                Tạo lịch học đầu tiên
              </Button>
            </Center>
          </Paper>
        ) : (
          <SimpleGrid
            cols={{ base: 1, xs: 1, sm: 1, md: 3, lg: 4 }}
            spacing={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
            verticalSpacing={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
          >
            {timelines.map((timeline) => {
              const updatedDate = formatDate(timeline.updatedAt);

              return (
                <Card
                  key={timeline.id}
                  shadow="md"
                  radius="md"
                  withBorder
                  padding="lg"
                  styles={{
                    root: {
                      borderWidth: 2,
                      borderColor: "#e9ecef",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#4dabf7",
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 25px rgba(34, 139, 230, 0.15)",
                      },
                    },
                  }}
                >
                  <Card.Section
                    style={{
                      borderBottom: "3px solid #4dabf7",
                      background: "linear-gradient(to right, #4dabf7, #228be6)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        timeline.name
                      )}&background=random&color=fff&size=256`}
                      height={100}
                      alt={timeline.name}
                    />
                    <Badge
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#1A365D",
                        color: "white",
                        fontWeight: 600,
                        padding: "5px 10px",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        fontSize: "0.75rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      radius="sm"
                    >
                      Lịch học
                    </Badge>
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={600} size="lg" lineClamp={1} style={{ flex: 1 }}>
                      {timeline.name}
                    </Text>
                    <Menu position="right-end" shadow="lg">
                      <Menu.Target>
                        <ActionIcon variant="light">
                          <IconDotsVertical size={14} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEye size={14} />}
                          component={Link}
                          href={`/schedule/${timeline.id}`}
                        >
                          Xem chi tiết
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconEdit size={14} />}
                          onClick={() => openEditModal(timeline)}
                        >
                          Chỉnh sửa
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          leftSection={<IconTrash size={14} />}
                          c="red"
                          onClick={() => openDeleteModal(timeline)}
                        >
                          Xóa
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  {timeline.description && (
                    <Text c="dimmed" size="sm" lineClamp={2} mb="md">
                      {timeline.description}
                    </Text>
                  )}

                  <Text size="xs" c="dimmed" mb="md">
                    Cập nhật lần cuối: {updatedDate}
                  </Text>

                  <Button
                    variant="light"
                    c="#4dabf7"
                    fullWidth
                    radius="md"
                    component={Link}
                    href={`/schedule/${timeline.id}`}
                    leftSection={<IconEye size={14} />}
                    style={{ borderColor: "#4dabf7" }}
                  >
                    Xem chi tiết
                  </Button>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </Box>

      {/* Modal tạo timeline mới */}
      <Modal
        opened={createOpened}
        onClose={closeCreate}
        title="Tạo lịch học mới"
        centered
        size="md"
      >
        <TextInput
          label="Tên lịch học"
          placeholder="Nhập tên lịch học"
          value={timelineName}
          onChange={(e) => setTimelineName(e.target.value)}
          required
          mb="md"
          radius="md"
        />
        <Textarea
          label="Mô tả (tùy chọn)"
          placeholder="Mô tả ngắn gọn về lịch học này"
          value={timelineDesc}
          onChange={(e) => setTimelineDesc(e.target.value)}
          mb="xl"
          radius="md"
          autosize
          minRows={3}
        />
        <Group justify="flex-end">
          <Button variant="outline" onClick={closeCreate} radius="md">
            Hủy
          </Button>
          <Button
            onClick={handleCreateTimeline}
            disabled={!timelineName.trim()}
            radius="md"
            c="blue"
          >
            Tạo
          </Button>
        </Group>
      </Modal>

      {/* Modal chỉnh sửa timeline */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title="Chỉnh sửa lịch học"
        centered
        size="md"
      >
        <TextInput
          label="Tên lịch học"
          placeholder="Nhập tên lịch học"
          value={timelineName}
          onChange={(e) => setTimelineName(e.target.value)}
          required
          mb="md"
          radius="md"
        />
        <Textarea
          label="Mô tả (tùy chọn)"
          placeholder="Mô tả ngắn gọn về lịch học này"
          value={timelineDesc}
          onChange={(e) => setTimelineDesc(e.target.value)}
          mb="xl"
          radius="md"
          autosize
          minRows={3}
        />
        <Group justify="flex-end">
          <Button variant="outline" onClick={closeEdit} radius="md">
            Hủy
          </Button>
          <Button
            onClick={handleEditTimeline}
            disabled={!timelineName.trim()}
            radius="md"
            c="blue"
          >
            Lưu
          </Button>
        </Group>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Xóa lịch học"
        centered
        size="md"
      >
        <Text size="md" mb="xs" c="black" fw={500}>
          Bạn có chắc chắn muốn xóa lịch học &quot;
          <span style={{ fontWeight: 700, color: "#e03131" }}>
            {selectedTimeline?.name}
          </span>
          &quot;?
        </Text>
        <Text size="sm" c="gray.7" mb="xl">
          Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến lịch
          học này sẽ bị xóa vĩnh viễn.
        </Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={closeDelete} radius="md">
            Hủy
          </Button>
          <Button onClick={handleDeleteTimeline} radius="md">
            Xóa
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
