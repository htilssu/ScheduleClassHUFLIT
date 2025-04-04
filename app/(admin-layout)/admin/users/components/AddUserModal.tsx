import {
  Modal,
  TextInput,
  Select,
  Switch,
  Button,
  Group,
  Stack,
  Text,
  PasswordInput,
} from "@mantine/core";
import { IconMail, IconUser, IconLock } from "@tabler/icons-react";
import { User } from "@/lib/hook/useUsers";

interface AddUserModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
}

export const AddUserModal = ({
  opened,
  onClose,
  onSubmit,
}: AddUserModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData: Partial<User> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
      isActive: formData.get("isActive") === "true",
    };
    onSubmit(userData);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Thêm người dùng mới"
      size="md"
      radius="md"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Tên"
            name="name"
            placeholder="Nhập tên người dùng"
            required
            leftSection={<IconUser size={16} />}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Nhập email"
            required
            leftSection={<IconMail size={16} />}
          />

          <TextInput
            label="Tên đăng nhập"
            name="username"
            placeholder="Nhập tên đăng nhập"
            required
            leftSection={<IconUser size={16} />}
          />

          <PasswordInput
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
            required
            leftSection={<IconLock size={16} />}
          />

          <Select
            label="Vai trò"
            name="role"
            defaultValue="DEFAULT_USER"
            data={[
              { value: "DEFAULT_USER", label: "Sinh viên" },
              { value: "PREMIUM_USER", label: "Sinh viên Premium" },
              { value: "ADMIN", label: "Quản trị viên" },
            ]}
            required
          />

          <Switch
            label="Kích hoạt tài khoản"
            name="isActive"
            defaultChecked
            description="Tài khoản sẽ được kích hoạt ngay sau khi tạo"
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="blue">
              Thêm người dùng
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
