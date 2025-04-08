import { Modal, Text, Group, Button } from "@mantine/core";
import { Timeline } from "./types";

interface DeleteTimelineModalProps {
  opened: boolean;
  onClose: () => void;
  selectedTimeline: Timeline | null;
  handleDelete: () => void;
}

/**
 * Modal xác nhận xóa lịch học.
 * @param opened Trạng thái mở/đóng của modal.
 * @param onClose Hàm để đóng modal.
 * @param selectedTimeline Lịch học đang được chọn để xóa.
 * @param handleDelete Hàm xử lý xóa lịch học.
 */
export function DeleteTimelineModal({
  opened,
  onClose,
  selectedTimeline,
  handleDelete,
}: DeleteTimelineModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
        Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến lịch học
        này sẽ bị xóa vĩnh viễn.
      </Text>
      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose} radius="md">
          Hủy
        </Button>
        <Button onClick={handleDelete} radius="md">
          Xóa
        </Button>
      </Group>
    </Modal>
  );
}
