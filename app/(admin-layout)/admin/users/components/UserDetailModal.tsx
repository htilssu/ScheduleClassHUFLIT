import {
  Modal,
  Text,
  Group,
  Stack,
  Badge,
  Avatar,
  ActionIcon,
  Tooltip,
  Paper,
  Button,
  Grid,
  Box,
} from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconCopy,
  IconMail,
  IconUser,
  IconCalendar,
  IconId,
  IconAt,
  IconUserCircle,
} from "@tabler/icons-react";
import { User } from "@/lib/hook/useUsers";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";

interface UserDetailModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | undefined;
}

const getStatusBadge = (isActive: boolean) => {
  if (isActive) {
    return (
      <Badge
        color="green"
        variant="light"
        leftSection={<IconCheck size={14} />}
      >
        Hoạt động
      </Badge>
    );
  } else {
    return (
      <Badge color="red" variant="light" leftSection={<IconX size={14} />}>
        Bị khóa
      </Badge>
    );
  }
};

const getRoleBadge = (role: string) => {
  const roleMap: { [key: string]: { label: string; color: string } } = {
    DEFAULT_USER: { label: "Sinh viên", color: "blue" },
    PREMIUM_USER: { label: "Sinh viên Premium", color: "violet" },
    ADMIN: { label: "Quản trị viên", color: "red" },
  };

  const roleInfo = roleMap[role] || { label: role, color: "gray" };
  return (
    <Badge color={roleInfo.color} variant="light">
      {roleInfo.label}
    </Badge>
  );
};

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text).then(() => {
    notifications.show({
      title: "Đã sao chép",
      message: `${label} đã được sao chép vào clipboard`,
      color: "green",
    });
  });
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
  copyable = false,
}: {
  icon: any;
  label: string;
  value: string;
  copyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(value, label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Group gap="xs" mb="xs">
        <Icon size={16} />
        <Text fw={500} c="dimmed">
          {label}
        </Text>
        {copyable && (
          <Tooltip
            label={copied ? "Copied!" : `Sao chép ${label.toLowerCase()}`}
          >
            <ActionIcon
              variant="subtle"
              color={copied ? "green" : "gray"}
              onClick={handleCopy}
              ml="auto"
            >
              <IconCopy size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Text>{value}</Text>
    </Paper>
  );
};

export const UserDetailModal = ({
  opened,
  onClose,
  user,
}: UserDetailModalProps) => {
  if (!user) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Chi tiết người dùng"
      size="lg"
      radius="md"
      centered
      padding="xl"
    >
      <Stack gap="lg">
        {/* Header Section */}
        <Paper p="lg" radius="md" withBorder>
          <Group align="center" justify="center" mb="md">
            <Avatar src={user.image} size="xl" radius="xl" />
          </Group>
          <Group justify="center" gap="xs">
            <Text fw={700} size="xl">
              {user.name || user.username}
            </Text>
            {getRoleBadge(user.role)}
          </Group>
          <Group justify="center" mt="xs">
            {getStatusBadge(user.isActive)}
          </Group>
        </Paper>

        {/* Info Grid */}
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <InfoItem
                icon={IconId}
                label="ID người dùng"
                value={user.id}
                copyable
              />
              <InfoItem
                icon={IconUserCircle}
                label="Tên đăng nhập"
                value={user.username}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <InfoItem
                icon={IconAt}
                label="Email"
                value={user.email || "Chưa cập nhật"}
                copyable
              />
              <InfoItem
                icon={IconCalendar}
                label="Ngày tạo tài khoản"
                value={new Date(user.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              />
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Actions */}
        <Group justify="flex-end" mt="sm">
          <Button
            variant="light"
            leftSection={<IconMail size={16} />}
            onClick={() => (window.location.href = `mailto:${user.email}`)}
            disabled={!user.email}
          >
            Gửi email
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
