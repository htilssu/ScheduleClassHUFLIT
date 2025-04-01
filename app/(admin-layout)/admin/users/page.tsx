"use client";

import { useState } from "react";
import {
  Title,
  Card,
  TextInput,
  Group,
  Button,
  Badge,
  Table,
  Text,
  ActionIcon,
  Tooltip,
  Pagination,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconTrash,
  IconEdit,
  IconDotsVertical,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const dummyUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    role: "Sinh viên",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "thib@example.com",
    role: "Giảng viên",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@example.com",
    role: "Sinh viên",
    status: "Bị khóa",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "thid@example.com",
    role: "Sinh viên",
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "vane@example.com",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "Hoạt động") {
      return (
        <Badge
          color="green"
          variant="light"
          leftSection={<IconCheck size={14} />}
        >
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge color="red" variant="light" leftSection={<IconX size={14} />}>
          {status}
        </Badge>
      );
    }
  };

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>{getStatusBadge(user.status)}</Table.Td>
      <Table.Td>
        <Flex gap="xs">
          <Tooltip label="Chỉnh sửa">
            <ActionIcon color="blue" variant="subtle">
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Xóa">
            <ActionIcon color="red" variant="subtle">
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Thêm tùy chọn">
            <ActionIcon variant="subtle">
              <IconDotsVertical size={16} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-6">
      <Flex justify="space-between" align="center">
        <Title order={2}>Quản lý người dùng</Title>
        <Button leftSection={<IconPlus size={16} />} color="blue">
          Thêm người dùng
        </Button>
      </Flex>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Flex justify="space-between" align="center">
            <Title order={3} size="h4">
              Danh sách người dùng
            </Title>
            <Text size="sm" color="dimmed">
              Quản lý tất cả người dùng trong hệ thống
            </Text>
          </Flex>
        </Card.Section>

        <TextInput
          placeholder="Tìm kiếm người dùng..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mt="md"
          mb="md"
        />

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

        <Flex justify="flex-end" mt="md">
          <Pagination total={2} value={activePage} onChange={setActivePage} />
        </Flex>
      </Card>
    </div>
  );
}
