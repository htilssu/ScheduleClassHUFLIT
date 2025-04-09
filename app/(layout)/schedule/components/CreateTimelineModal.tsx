import { Modal, TextInput, Textarea, Group, Button } from "@mantine/core";

interface CreateTimelineModalProps {
  opened: boolean;
  onClose: () => void;
  timelineName: string;
  setTimelineName: (name: string) => void;
  timelineDesc: string;
  setTimelineDesc: (desc: string) => void;
  handleCreate: () => void;
}

/**
 * Modal để tạo lịch học mới.
 * @param opened Trạng thái mở/đóng của modal.
 * @param onClose Hàm để đóng modal.
 * @param timelineName Tên lịch học.
 * @param setTimelineName Hàm cập nhật tên lịch học.
 * @param timelineDesc Mô tả lịch học.
 * @param setTimelineDesc Hàm cập nhật mô tả.
 * @param handleCreate Hàm xử lý tạo lịch học.
 */
export function CreateTimelineModal({
  opened,
  onClose,
  timelineName,
  setTimelineName,
  timelineDesc,
  setTimelineDesc,
  handleCreate,
}: CreateTimelineModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
        <Button variant="outline" onClick={onClose} radius="md">
          Hủy
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!timelineName.trim()}
          radius="md"
        >
          Tạo
        </Button>
      </Group>
    </Modal>
  );
}
