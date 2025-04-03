import { Table, Text, Badge, Flex, ActionIcon, Tooltip, Menu, Skeleton } from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconDotsVertical,
  IconCheck,
  IconX,
  IconEye,
  IconMail,
} from "@tabler/icons-react";
import { User } from "@/hooks/useUsers";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewDetails: (user: User) => void;
  onContact: (user: User) => void;
}

const getStatusBadge = (isActive: boolean) => {
  if (isActive) {
    return (
      <Badge color="green" variant="light" leftSection={<IconCheck size={14} />}>
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

export const UserTable = ({
  users,
  onEdit,
  onDelete,
  onViewDetails,
  onContact,
}: UserTableProps) => {
  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name || "Chưa cập nhật"}</Table.Td>
      <Table.Td>{user.email || "Chưa cập nhật"}</Table.Td>
      <Table.Td>{getRoleBadge(user.role)}</Table.Td>
      <Table.Td>{getStatusBadge(user.isActive)}</Table.Td>
      <Table.Td>
        <Flex gap="xs">
          <Tooltip label="Chỉnh sửa">
            <ActionIcon color="blue" variant="subtle" onClick={() => onEdit(user)}>
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Xóa">
            <ActionIcon color="red" variant="subtle" onClick={() => onDelete(user)}>
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Tooltip label="Thêm tùy chọn">
                <ActionIcon variant="subtle">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEye size={14} />}
                onClick={() => onViewDetails(user)}
              >
                Xem chi tiết
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMail size={14} />}
                onClick={() => onContact(user)}
              >
                Liên hệ
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Tên</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Vai trò</Table.Th>
          <Table.Th>Trạng thái</Table.Th>
          <Table.Th>Thao tác</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export const UserTableSkeleton = () => {
  const skeletonRows = [1, 2, 3, 4, 5];
  
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Tên</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Vai trò</Table.Th>
          <Table.Th>Trạng thái</Table.Th>
          <Table.Th>Thao tác</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {skeletonRows.map((index) => (
          <Table.Tr key={index}>
            <Table.Td><Skeleton height={20} width={40} /></Table.Td>
            <Table.Td><Skeleton height={20} width={150} /></Table.Td>
            <Table.Td><Skeleton height={20} width={200} /></Table.Td>
            <Table.Td><Skeleton height={20} width={100} /></Table.Td>
            <Table.Td><Skeleton height={20} width={80} /></Table.Td>
            <Table.Td>
              <Flex gap="xs">
                <Skeleton height={32} width={32} circle />
                <Skeleton height={32} width={32} circle />
                <Skeleton height={32} width={32} circle />
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 