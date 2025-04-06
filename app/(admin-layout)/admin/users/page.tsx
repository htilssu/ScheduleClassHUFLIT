"use client";

import { useState } from "react";
import {
  Title,
  Card,
  Group,
  Button,
  Box,
  Flex,
  Text,
  Pagination,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useUsers } from "@/lib/hook/useUsers";
import { User } from "@/lib/hook/useUsers";
import { UserTable, UserTableSkeleton } from "./components/UserTable";
import { UserSearch } from "./components/UserSearch";
import { UserEditModal } from "./components/UserEditModal";
import { AddUserModal } from "./components/AddUserModal";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { UserDetailModal } from "./components/UserDetailModal";
import { updateUser, deleteUser } from "@/app/actions/admin-actions";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { data, isLoading, error } = useUsers({
    page: activePage,
    limit: 12,
    search: searchQuery,
  });

  const users = data?.users || [];
  const totalPages = data?.pagination.totalPages || 1;

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleContact = (user: User) => {
    // TODO: Implement contact functionality
    console.log("Contacting user:", user);
  };

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setIsAddModalOpen(true);
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    if (!selectedUser) {
      // Handle add new user case
      return;
    }

    // Ensure isActive is a boolean
    const updateData = {
      ...userData,
      isActive: Boolean(userData.isActive),
    };

    const result = await updateUser(selectedUser.id, updateData);
    if (result.success) {
      notifications.show({
        title: "Thành công",
        message: "Cập nhật thông tin người dùng thành công",
        color: "green",
      });
      // Invalidate and refetch users query
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } else {
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật thông tin người dùng",
        color: "red",
      });
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const result = await deleteUser(selectedUser.id);
    if (result.success) {
      notifications.show({
        title: "Thành công",
        message: "Xóa người dùng thành công",
        color: "green",
      });
      // Invalidate and refetch users query
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } else {
      notifications.show({
        title: "Lỗi",
        message: "Không thể xóa người dùng",
        color: "red",
      });
    }
    setIsDeleteModalOpen(false);
    setSelectedUser(undefined);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Text color="red">Đã có lỗi xảy ra khi tải dữ liệu</Text>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Flex justify="space-between" align="center">
        <Title order={2}>Quản lý người dùng</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          color="orange"
          onClick={handleAddUser}
        >
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

        <UserSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <Box pos="relative">
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
              onContact={handleContact}
            />
          )}
        </Box>

        <Flex justify="center" mt="md">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            withEdges
          />
        </Flex>
      </Card>

      <AddUserModal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSaveUser}
      />

      <UserEditModal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveUser}
        user={selectedUser}
        title="Chỉnh sửa người dùng"
      />

      <DeleteConfirmationModal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />

      <UserDetailModal
        opened={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
