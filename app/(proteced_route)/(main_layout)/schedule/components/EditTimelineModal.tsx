import { Modal, TextInput, Textarea, Group, Button } from "@mantine/core";

interface EditTimelineModalProps {
  opened: boolean;
  onClose: () => void;
  timelineName: string;
  setTimelineName: (name: string) => void;
  timelineDesc: string;
  setTimelineDesc: (desc: string) => void;
  handleEdit: () => void;
}

/**
 * Modal để chỉnh sửa lịch học.
 * @param opened Trạng thái mở/đóng của modal.
 * @param onClose Hàm để đóng modal.
 * @param timelineName Tên lịch học hiện tại.
 * @param setTimelineName Hàm cập nhật tên lịch học.
 * @param timelineDesc Mô tả lịch học hiện tại.
 * @param setTimelineDesc Hàm cập nhật mô tả.
 * @param handleEdit Hàm xử lý lưu chỉnh sửa.
 */
export function EditTimelineModal({
  opened,
  onClose,
  timelineName,
  setTimelineName,
  timelineDesc,
  setTimelineDesc,
  handleEdit,
}: EditTimelineModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
        <Button variant="outline" onClick={onClose} radius="md">
          Hủy
        </Button>
        <Button
          onClick={handleEdit}
          disabled={!timelineName.trim()}
          radius="md"
        >
          Lưu
        </Button>
      </Group>
    </Modal>
  );
}
