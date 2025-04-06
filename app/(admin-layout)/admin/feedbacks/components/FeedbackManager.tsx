"use client";

import React from "react";
import {
  Button,
  Card,
  Text,
  Group,
  Stack,
  Container,
  Pagination,
  Flex,
  Modal,
  LoadingOverlay,
  Title,
  ButtonGroup,
} from "@mantine/core";
import { Star } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { deleteFeedback } from "@/lib/actions/feedback";
import { useRouter } from "next/navigation";
import { FeedbackResponse } from "./feedback-manager/types";
import { RATING_COLORS } from "./feedback-manager/constants";
import { FeedbackSkeleton } from "./feedback-manager/FeedbackSkeleton";
import { StatisticsSkeleton } from "./feedback-manager/StatisticsSkeleton";
import { Statistics } from "./feedback-manager/Statistics";
import { FeedbackCard } from "./feedback-manager/FeedbackCard";

const FeedbackManager = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRating, setSelectedRating] = React.useState<string | null>(
    null
  );
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = React.useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = React.useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery<FeedbackResponse, Error>({
    queryKey: ["feedbacks", currentPage, selectedRating],
    queryFn: async () => {
      const response = await fetch(
        `/v1/admin/feedbacks?page=${currentPage}&limit=10${
          selectedRating ? `&rating=${selectedRating}` : ""
        }`,
        {}
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const getRatingColor = (rating: number) => {
    return (
      RATING_COLORS[`${rating} sao` as keyof typeof RATING_COLORS] || "#000000"
    );
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const result = await deleteFeedback(id);

      if (result.success) {
        await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        notifications.show({
          title: "Thành công",
          message: "Đã xóa đánh giá thành công",
          color: "green",
        });
      } else {
        notifications.show({
          title: "Lỗi",
          message: result.message || "Có lỗi xảy ra khi xóa đánh giá",
          color: "red",
        });
      }
    } catch (error: any) {
      console.error("Error deleting feedback:", error);
      notifications.show({
        title: "Lỗi",
        message: error.message || "Có lỗi xảy ra khi xóa đánh giá",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
      setConfirmModalOpen(false);
      setFeedbackToDelete(null);
    }
  };

  const openConfirmModal = (id: string) => {
    setFeedbackToDelete(id);
    setConfirmModalOpen(true);
  };

  const handleViewUser = async (user: {
    id: string;
    name: string | null;
    email: string;
  }) => {
    router.push(`/admin/users?search=${user.email}`);
  };

  const handleReply = async (feedbackId: string) => {
    // Implement reply functionality
    console.log("Reply to feedback:", feedbackId, replyContent);
    setReplyingTo(null);
    setReplyContent("");
  };

  return (
    <Container size="xl">
      <Stack gap="lg">
        <Card withBorder>
          <Title order={2} mb="md">
            Quản lý phản hồi
          </Title>

          <Group mb="xl">
            <Text size="sm" fw={500}>
              Lọc theo đánh giá:
            </Text>
            <ButtonGroup>
              <Button
                variant={selectedRating === null ? "filled" : "light"}
                color="gray"
                onClick={() => setSelectedRating(null)}
              >
                Tất cả
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={
                    selectedRating === rating.toString() ? "filled" : "light"
                  }
                  color={getRatingColor(rating)}
                  onClick={() => setSelectedRating(rating.toString())}
                  leftSection={<Star size={14} />}
                >
                  {rating} sao
                </Button>
              ))}
            </ButtonGroup>
          </Group>

          {isLoading ? (
            <StatisticsSkeleton />
          ) : (
            data?.statistics && <Statistics statistics={data.statistics} />
          )}

          <Stack gap="md">
            {isLoading ? (
              <>
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
                <FeedbackSkeleton />
              </>
            ) : (
              data?.feedbacks.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  onDelete={openConfirmModal}
                  onViewUser={handleViewUser}
                  onReply={handleReply}
                  copiedEmail={copiedEmail}
                  setCopiedEmail={setCopiedEmail}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                />
              ))
            )}
          </Stack>

          {!isLoading && data?.pagination && (
            <Flex justify="center" mt="md">
              <Pagination
                total={data.pagination.totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                withEdges
              />
            </Flex>
          )}
        </Card>
      </Stack>

      <Modal
        opened={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setFeedbackToDelete(null);
        }}
        title="Xác nhận xóa"
        centered
        withCloseButton={false}
      >
        <Stack gap="md">
          <Text>Bạn có chắc chắn muốn xóa đánh giá này?</Text>
          <Text size="sm" c="dimmed">
            Hành động này không thể hoàn tác.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              variant="subtle"
              onClick={() => {
                setConfirmModalOpen(false);
                setFeedbackToDelete(null);
              }}
            >
              Hủy
            </Button>
            <Button
              color="red"
              onClick={() => feedbackToDelete && handleDelete(feedbackToDelete)}
              loading={isDeleting}
            >
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default FeedbackManager;
