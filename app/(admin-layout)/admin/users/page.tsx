"use client";

import { useState } from "react";
import {
  Title,
  Card,
  Group,
  Button,
  Box,
  Flex,
  LoadingOverlay,
  Text,
  Pagination,
  Notification,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/hooks/useUsers";
import { UserTable } from "./components/UserTable";
import { UserSearch } from "./components/UserSearch";
import { UserEditModal } from "./components/UserEditModal";
import { AddUserModal } from "./components/AddUserModal";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { UserDetailModal } from "./components/UserDetailModal";
import { updateUser, deleteUser } from "@/app/actions/admin-actions";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { data: users = [], isLoading, error } = useUsers();

  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    const result = await updateUser(selectedUser.id, userData);
    if (result.success) {
      // Show success notification
      console.log("User updated successfully");
    } else {
      // Show error notification
      console.error("Failed to update user:", result.error);
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    const result = await deleteUser(selectedUser.id);
    if (result.success) {
      // Show success notification
      console.log("User deleted successfully");
    } else {
      // Show error notification
      console.error("Failed to delete user:", result.error);
    }
    setIsDeleteModalOpen(false);
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
        <Button leftSection={<IconPlus size={16} />} color="blue" onClick={handleAddUser}>
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
          <LoadingOverlay visible={isLoading} zIndex={1000} />
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
            onContact={handleContact}
          />
        </Box>

        <Flex justify="flex-end" mt="md">
          <Pagination total={2} value={activePage} onChange={setActivePage} />
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
