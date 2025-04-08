import { Paper, Center, Text, Button } from "@mantine/core";
import { IconCalendar, IconPlus } from "@tabler/icons-react";

interface TimelineEmptyStateProps {
  onOpenCreate: () => void;
}

/**
 * Component hiển thị trạng thái rỗng khi người dùng chưa có lịch học nào.
 * @param onOpenCreate Hàm để mở modal tạo lịch học mới.
 */
export function TimelineEmptyState({ onOpenCreate }: TimelineEmptyStateProps) {
  return (
    <Paper p="xl" radius="md" withBorder>
      <Center style={{ flexDirection: "column", height: 300, padding: 20 }}>
        <IconCalendar size={60} style={{ opacity: 0.3, marginBottom: 20 }} />
        <Text fw={600} size="xl" ta="center" mb={10}>
          Bạn chưa có lịch học nào
        </Text>
        <Text c="dimmed" ta="center" mb={20}>
          Tạo lịch học mới để quản lý thời gian học tập hiệu quả hơn
        </Text>
        <Button
          onClick={onOpenCreate}
          variant="light"
          leftSection={<IconPlus size={14} />}
        >
          Tạo lịch học đầu tiên
        </Button>
      </Center>
    </Paper>
  );
}
