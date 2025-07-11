import { Modal, TextInput, Select, Switch, Button, Group } from "@mantine/core";
import { User } from "@/lib/hook/useUsers";

interface UserModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
  user?: User;
  title: string;
}

export const UserEditModal = ({
  opened,
  onClose,
  onSubmit,
  user,
  title,
}: UserModalProps) => {
  const isEditMode = !!user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData: Partial<User> = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      isActive: formData.get("isActive") === "on",
    };
    onSubmit(userData);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Tên"
          name="name"
          defaultValue={user?.name || ""}
          placeholder="Nhập tên người dùng"
          required
        />
        <TextInput
          label="Tên đăng nhập"
          name="username"
          defaultValue={user?.username || ""}
          placeholder="Nhập tên đăng nhập"
          disabled
          mt="md"
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          defaultValue={user?.email || ""}
          placeholder="Nhập email"
          disabled
          mt="md"
        />
        <Select
          label="Vai trò"
          name="role"
          defaultValue={user?.role || "DEFAULT_USER"}
          data={[
            { value: "DEFAULT_USER", label: "Sinh viên" },
            { value: "PREMIUM_USER", label: "Sinh viên Premium" },
            { value: "ADMIN", label: "Quản trị viên" },
          ]}
          required
          mt="md"
        />
        <Switch
          label="Hoạt động"
          name="isActive"
          defaultChecked={user?.isActive ?? true}
          mt="md"
          color="green"
        />
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" color="blue">
            Lưu
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
