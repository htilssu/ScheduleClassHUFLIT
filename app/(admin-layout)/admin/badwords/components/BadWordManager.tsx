"use client";

import { useState, useTransition } from "react";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Group,
  Modal,
  TagsInput,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBadWordAction,
  deleteBadWordAction,
  getBadWordsAction,
} from "@/app/actions/admin-badword-actions";

interface BadWord {
  id: string;
  word: string;
  createdAt: Date;
}

interface CreateBadWordResult {
  success: boolean;
  error?: string;
  errors?: {
    words?: string[];
  };
  badWords?: BadWord[];
}

// Hàm format ngày tháng
function formatDate(date: Date) {
  return new Date(date).toLocaleString("vi-VN");
}

export default function BadWordManager() {
  const queryClient = useQueryClient();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBadWord, setSelectedBadWord] = useState<BadWord | null>(null);
  const [isCreatePending, startCreateTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const {
    data: badWordsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminBadWords"],
    queryFn: async () => {
      const result = await getBadWordsAction();
      if (!result.success || !result.badWords) {
        throw new Error(result.error || "Failed to fetch bad words");
      }
      return result.badWords.map((bw) => ({
        ...bw,
        createdAt: new Date(bw.createdAt),
      }));
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const badWords = badWordsData || [];

  const createForm = useForm({
    initialValues: {
      words: [] as string[],
    },
    validate: {
      words: (value) => {
        if (value.length === 0) return "Vui lòng nhập ít nhất một từ cấm";
        return null;
      },
    },
  });

  const handleCreateSubmit = async (values: { words: string[] }) => {
    startCreateTransition(async () => {
      const result = (await createBadWordAction(
        values.words
      )) as CreateBadWordResult;

      if (result.errors) {
        if ("words" in result.errors) {
          createForm.setFieldError("words", result.errors.words?.[0]);
        }
        if (result.error) {
          notifications.show({
            title: "Lỗi",
            message: result.error,
            color: "red",
          });
        }
        return;
      }

      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["adminBadWords"] });
        notifications.show({
          title: "Thành công",
          message: `Đã thêm ${values.words.length} từ cấm mới`,
          color: "green",
        });
        setCreateModalOpen(false);
        createForm.reset();
      }
    });
  };

  const handleDeleteClick = (badWord: BadWord) => {
    setSelectedBadWord(badWord);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBadWord) return;

    startDeleteTransition(async () => {
      const result = await deleteBadWordAction(selectedBadWord.id);

      if (!result.success && result.error) {
        notifications.show({
          title: "Lỗi",
          message: result.error,
          color: "red",
        });
        return;
      }

      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["adminBadWords"] });
        notifications.show({
          title: "Thành công",
          message: "Đã xóa từ cấm",
          color: "green",
        });
        setDeleteModalOpen(false);
        setSelectedBadWord(null);
      }
    });
  };

  return (
    <Box className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Quản lý Từ Cấm</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setCreateModalOpen(true)}
          disabled={isCreatePending}
        >
          Thêm Từ Mới
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
              <Table.Th>Từ Cấm</Table.Th>
              <Table.Th>Ngày Thêm</Table.Th>
              <Table.Th>Hành Động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Skeleton height={20} width="60%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={20} width="70%" />
                    </Table.Td>
                    <Table.Td>
                      <Skeleton height={32} width={32} circle />
                    </Table.Td>
                  </Table.Tr>
                ))
              : badWords.map((bw) => (
                  <Table.Tr key={bw.id}>
                    <Table.Td>
                      <Text fw={500}>{bw.word}</Text>
                    </Table.Td>
                    <Table.Td>{formatDate(bw.createdAt)}</Table.Td>
                    <Table.Td>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDeleteClick(bw)}
                        loading={
                          isDeletePending && selectedBadWord?.id === bw.id
                        }
                        disabled={isDeletePending}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
            {!isLoading && badWords.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={3} align="center">
                  <Text c="dimmed">Không có từ cấm nào.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>

      <Modal
        opened={createModalOpen}
        onClose={() => !isCreatePending && setCreateModalOpen(false)}
        title="Thêm Từ Cấm Mới"
        centered
      >
        <form onSubmit={createForm.onSubmit(handleCreateSubmit)}>
          <Stack>
            <TagsInput
              name="words"
              label="Từ Cấm"
              placeholder="Nhập từ cấm và nhấn Enter hoặc dấu phẩy"
              description="Bạn có thể nhập nhiều từ cấm cùng lúc, phân cách bằng dấu phẩy"
              splitChars={[","]}
              {...createForm.getInputProps("words")}
              disabled={isCreatePending}
            />
            <Button type="submit" loading={isCreatePending}>
              Thêm Từ
            </Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => !isDeletePending && setDeleteModalOpen(false)}
        title="Xác nhận xóa từ cấm"
        centered
      >
        <Text size="sm">
          Bạn có chắc chắn muốn xóa từ <strong>{selectedBadWord?.word}</strong>{" "}
          khỏi danh sách?
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
            Xóa Từ
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
