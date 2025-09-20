import {
  Card,
  Image,
  Group,
  Text,
  Menu,
  ActionIcon,
  Badge,
  Button,
  rem,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { Timeline } from "./types";

interface TimelineCardProps {
  timeline: Timeline;
  onOpenEdit: (timeline: Timeline) => void;
  onOpenDelete: (timeline: Timeline) => void;
  formatDate: (dateString: string) => string;
}

/**
 * Component hiển thị một card lịch học.
 * @param timeline Dữ liệu lịch học.
 * @param onOpenEdit Hàm để mở modal chỉnh sửa.
 * @param onOpenDelete Hàm để mở modal xóa.
 * @param formatDate Hàm để định dạng ngày tháng.
 */
export function TimelineCard({
  timeline,
  onOpenEdit,
  onOpenDelete,
  formatDate,
}: TimelineCardProps) {
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
              onClick={() => onOpenEdit(timeline)}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              c="red"
              onClick={() => onOpenDelete(timeline)}
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
}
