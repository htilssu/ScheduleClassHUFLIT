import { Modal, Text, Button, Group } from "@mantine/core";
import { User } from "@/lib/hook/useUsers";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user?: User;
}

export const DeleteConfirmationModal = ({
  opened,
  onClose,
  onConfirm,
  user,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Xác nhận xóa" size="sm">
      <Text>
        Bạn có chắc chắn muốn xóa người dùng{" "}
        <Text component="span" fw={700}>
          {user?.name || user?.username}
        </Text>
        ?
      </Text>
      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={onClose}>
          Hủy
        </Button>
        <Button color="red" onClick={onConfirm}>
          Xóa
        </Button>
      </Group>
    </Modal>
  );
};
