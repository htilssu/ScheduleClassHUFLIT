"use client";

import { useState, useTransition } from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Group,
  Modal,
  TagsInput,
  Skeleton,
  Stack,
  Text,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconLetterA,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
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
  skippedCount?: number;
}

// Hàm format ngày tháng
function formatDate(date: Date) {
  return new Date(date).toLocaleString("vi-VN");
}

// Hàm nhóm từ cấm theo chữ cái đầu tiên
function groupBadWordsByAlphabet(badWords: BadWord[]) {
  const groups: Record<string, BadWord[]> = {};

  badWords.forEach((word) => {
    // Lấy chữ cái đầu tiên và chuyển về chữ hoa
    const firstChar = word.word.charAt(0).toUpperCase();

    // Kiểm tra xem chữ cái đầu tiên có phải là chữ trong bảng chữ cái không
    const isLetter = /[A-Z]/.test(firstChar);

    // Nếu là chữ cái, thêm vào nhóm tương ứng, ngược lại thêm vào nhóm '#'
    const group = isLetter ? firstChar : "#";

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(word);
  });

  // Sắp xếp các khóa theo alphabet
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    // Đưa '#' xuống cuối
    if (a === "#") return 1;
    if (b === "#") return -1;
    return a.localeCompare(b);
  });

  // Tạo đối tượng mới với các khóa đã được sắp xếp
  const sortedGroups: Record<string, BadWord[]> = {};
  sortedKeys.forEach((key) => {
    sortedGroups[key] = groups[key];
  });

  return sortedGroups;
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
  const groupedBadWords = groupBadWordsByAlphabet(badWords);

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

        // Tạo thông báo thành công với thông tin về các từ bị bỏ qua
        let message = `Đã thêm ${result.badWords?.length || 0} từ cấm mới`;
        if (result.skippedCount && result.skippedCount > 0) {
          message += ` (${result.skippedCount} từ bị bỏ qua do đã tồn tại)`;
        }

        notifications.show({
          title: "Thành công",
          message,
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
        <div>
          <Title order={2}>Quản lý Từ Cấm</Title>
          <Text size="sm" c="dimmed" mt={5}>
            <IconLetterA
              size={14}
              style={{ display: "inline", marginRight: "5px" }}
            />
            Danh sách được sắp xếp theo thứ tự bảng chữ cái (A-Z)
          </Text>
        </div>
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

      <Box
        pos="relative"
        p="md"
        style={{
          backgroundColor: "var(--mantine-color-body)",
          borderRadius: "var(--mantine-radius-md)",
          border: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        {isLoading ? (
          <Stack gap="md">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height={32} width="100%" />
            ))}
          </Stack>
        ) : (
          <Stack gap="md">
            {Object.keys(groupedBadWords).length === 0 && (
              <Text c="dimmed">Không có từ cấm nào.</Text>
            )}

            {Object.entries(groupedBadWords).map(([letter, words]) => (
              <div key={letter}>
                <Group justify="space-between" mb={5}>
                  <Badge size="lg" variant="filled" color="blue">
                    {letter}
                  </Badge>
                  <Text size="xs" c="dimmed">
                    {words.length} từ
                  </Text>
                </Group>
                <Group gap="xs">
                  {words.map((bw) => (
                    <Badge
                      key={bw.id}
                      size="lg"
                      variant="light"
                      rightSection={
                        <ActionIcon
                          variant="transparent"
                          color="red"
                          size="sm"
                          radius="xl"
                          onClick={() => handleDeleteClick(bw)}
                          loading={
                            isDeletePending && selectedBadWord?.id === bw.id
                          }
                          disabled={isDeletePending}
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      }
                    >
                      {bw.word}
                    </Badge>
                  ))}
                </Group>
                <Divider my="sm" />
              </div>
            ))}
          </Stack>
        )}
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
        title="Xác nhận xóa"
        centered
      >
        <Stack>
          <Text>
            Bạn có chắc chắn muốn xóa từ cấm &ldquo;
            <strong>{selectedBadWord?.word}</strong>&rdquo; khỏi hệ thống?
          </Text>
          <Group justify="space-between">
            <Button
              variant="outline"
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
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
