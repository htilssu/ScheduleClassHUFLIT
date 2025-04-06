"use client";

import {
  createCodeAction,
  deleteCodeAction,
} from "@/lib/actions/admin-code-actions";
import useUser from "@/lib/hook/useUser";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect, useState, useTransition } from "react";

interface CodeWithUser {
  id: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  expiredAt: string;
  maxUses: number;
  usedCount: number;
  user: {
    name: string | null;
    username: string;
  };
}

// Hàm fetch danh sách mã
async function fetchCodes(): Promise<CodeWithUser[]> {
  const response = await fetch("/v1/admin/codes");
  if (!response.ok) {
    throw new Error("Failed to fetch codes");
  }
  return response.json();
}

// Hàm format ngày tháng
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("vi-VN");
}

export default function CodeManager() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useUser();
  const [timeNow, setTimeNow] = useState<Date | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<CodeWithUser | null>(null);
  const [isCreatePending, startCreateTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  // Query danh sách mã với cache
  const {
    data: codes = [],
    isLoading,
    error,
  } = useQuery<CodeWithUser[], Error>({
    queryKey: ["adminCodes"],
    queryFn: fetchCodes,
    staleTime: 60 * 1000, // Data được coi là fresh trong 60 giây
    gcTime: 5 * 60 * 1000, // Cache data trong 5 phút
    refetchOnWindowFocus: false, // Không refetch khi focus lại window
  });

  // Form tạo mã mới
  const createForm = useForm({
    initialValues: {
      expiredAt: null as Date | null, // Mặc định 1 ngày sau
      maxUses: 1,
    },
  });

  useLayoutEffect(() => {
    setTimeNow(new Date(Date.now()));
    createForm.setFieldValue(
      "expiredAt",
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );
  }, []);

  // Xử lý submit form tạo mã bằng Server Action
  const handleCreateSubmit = async (values: {
    expiredAt: Date | null;
    maxUses: number;
  }) => {
    if (!values.expiredAt) return;

    const formData = new FormData();
    formData.append("expiredAt", values.expiredAt.toISOString());
    formData.append("maxUses", values.maxUses.toString());

    startCreateTransition(async () => {
      const result = await createCodeAction(formData);

      if (result.errors) {
        if ("expiredAt" in result.errors) {
          createForm.setFieldError("expiredAt", result.errors.expiredAt?.[0]);
        }
        if ("maxUses" in result.errors) {
          createForm.setFieldError("maxUses", result.errors.maxUses?.[0]);
        }
        if ("_form" in result.errors) {
          notifications.show({
            title: "Lỗi",
            message: result.errors._form[0],
            color: "red",
          });
        }
        return;
      }

      if (result.success && result.code) {
        // Cập nhật cache với code mới
        queryClient.setQueryData<CodeWithUser[]>(["adminCodes"], (oldData) => {
          if (!oldData) return [];
          const newCode: CodeWithUser = {
            ...result.code,
            createdAt: result.code.createdAt.toISOString(),
            updatedAt: result.code.updatedAt.toISOString(),
            expiredAt: result.code.expiredAt.toISOString(),
            maxUses: result.code.maxUses,
            usedCount: result.code.usedCount,
            user: {
              name: currentUser?.name || null,
              username: currentUser?.username || "Admin",
            },
          };
          // Thêm code mới vào đầu mảng để hiển thị mới nhất trước
          return [newCode, ...oldData];
        });

        notifications.show({
          title: "Thành công",
          message: "Tạo mã thành công",
          color: "green",
        });
        setCreateModalOpen(false);
        createForm.reset();
      }
    });
  };

  // Xử lý xóa mã
  const handleDeleteClick = (code: CodeWithUser) => {
    setSelectedCode(code);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCode) return;

    startDeleteTransition(async () => {
      const result = await deleteCodeAction(selectedCode.id);

      if (result.error) {
        notifications.show({
          title: "Lỗi",
          message: result.error,
          color: "red",
        });
        return;
      }

      if (result.success) {
        // Cập nhật cache bằng cách lọc ra code đã xóa
        queryClient.setQueryData<CodeWithUser[]>(["adminCodes"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((code) => code.id !== selectedCode.id);
        });

        notifications.show({
          title: "Thành công",
          message: "Đã xóa mã",
          color: "green",
        });
        setDeleteModalOpen(false);
        setSelectedCode(null);
      }
    });
  };

  return (
    <Box className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Quản lý Mã</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setCreateModalOpen(true)}
          disabled={isCreatePending}
        >
          Tạo Mã Mới
        </Button>
      </Group>

      {error && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Lỗi!"
          color="red"
          variant="light"
        >
          {error.message}
        </Alert>
      )}

      <Box pos="relative">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Mã</Table.Th>
              <Table.Th>Người tạo</Table.Th>
              <Table.Th>Ngày tạo</Table.Th>
              <Table.Th>Ngày hết hạn</Table.Th>
              <Table.Th>Số lần sử dụng</Table.Th>
              <Table.Th>Hành Động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading
              ? // Skeleton loading state
                Array.from({ length: 5 }).map((_, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Skeleton height={20} width="80%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={20} width="60%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={20} width="70%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={20} width="70%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={20} width="70%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={32} width={32} circle />
                    </Table.Td>
                  </Table.Tr>
                ))
              : codes.map((code) => (
                  <Table.Tr key={code.id}>
                    <Table.Td>
                      <Text fw={500}>{code.code}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Text>{code.user.name || code.user.username}</Text>
                        {code.user.name && (
                          <Text size="sm" c="dimmed">
                            ({code.user.username})
                          </Text>
                        )}
                      </Group>
                    </Table.Td>
                    <Table.Td>{formatDate(code.createdAt)}</Table.Td>
                    <Table.Td>{formatDate(code.expiredAt)}</Table.Td>
                    <Table.Td>
                      <Text>
                        {code.usedCount} / {code.maxUses}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDeleteClick(code)}
                        loading={
                          isDeletePending && selectedCode?.id === code.id
                        }
                        disabled={isDeletePending}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
          </Table.Tbody>
        </Table>
      </Box>

      <Modal
        opened={createModalOpen}
        onClose={() => !isCreatePending && setCreateModalOpen(false)}
        title="Tạo Mã Mới"
        centered
      >
        <form onSubmit={createForm.onSubmit(handleCreateSubmit)}>
          <Stack>
            <DatePickerInput
              name="expiredAt"
              label="Ngày hết hạn"
              placeholder="Chọn ngày hết hạn"
              required
              minDate={timeNow || undefined}
              valueFormat="DD/MM/YYYY"
              {...createForm.getInputProps("expiredAt")}
              disabled={isCreatePending}
            />
            <NumberInput
              name="maxUses"
              label="Số lần sử dụng tối đa"
              placeholder="Nhập số lần sử dụng tối đa"
              min={1}
              defaultValue={1}
              required
              {...createForm.getInputProps("maxUses")}
              disabled={isCreatePending}
            />
            <Button type="submit" loading={isCreatePending}>
              Tạo Mã
            </Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => !isDeletePending && setDeleteModalOpen(false)}
        title="Xác nhận xóa mã"
        centered
      >
        <Text size="sm">
          Bạn có chắc chắn muốn xóa mã <strong>{selectedCode?.code}</strong>{" "}
          không? Hành động này không thể hoàn tác.
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeletePending}
          >
            Hủy
          </Button>
          <Button
            color="red"
            onClick={handleDeleteConfirm}
            loading={isDeletePending}
          >
            Xóa Mã
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
