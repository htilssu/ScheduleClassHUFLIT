"use client";

import { createFeedback, deleteFeedback } from "@/app/actions/feedback";
import { useUser } from "@/lib/hook/useUser"; // Import hook useUser
import { Alert, Button, Group, Modal, Text, Badge } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
dayjs.extend(relativeTime);

interface Feedback {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
    role?: string; // Thêm trường role
  };
}

// Main Feedback Component
export default function Feedback() {
  const { data: user } = useUser(); // Lấy thông tin người dùng từ store
  const queryClient = useQueryClient();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5,
  });

  // State cho confirm dialog
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  // State cho Alert
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchFeedbacks(pagination.currentPage, pagination.limit);
  }, [pagination.currentPage, pagination.limit]);

  const fetchFeedbacks = async (page: number = 1, limit: number = 5) => {
    try {
      const response = await fetch(
        `/v1/feedback?page=${page}&limit=${limit}`,
        {}
      );
      const data = await response.json();
      setFeedbacks(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const { mutate: submitFeedback, isPending: isSubmitting } = useMutation({
    mutationFn: createFeedback,
    onSuccess: (result) => {
      if (result.success) {
        // Hiển thị Alert thành công
        setAlert({ message: "Gửi đánh giá thành công!", type: "success" });
        setContent("");
        setRating(0);
        queryClient.invalidateQueries({ queryKey: ["feedback"] });
      } else {
        // Hiển thị Alert lỗi
        setAlert({
          message: result.error || "Có lỗi xảy ra khi gửi đánh giá",
          type: "error",
        });
      }
    },
    onError: (error) => {
      // Hiển thị Alert lỗi
      setAlert({
        message: error.message || "Có lỗi xảy ra khi gửi đánh giá",
        type: "error",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      setAlert({
        message: "Vui lòng đăng nhập để gửi feedback",
        type: "error",
      });
      return;
    }
    submitFeedback({ content, rating });
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteFeedback(id);

      if (result.success) {
        fetchFeedbacks(pagination.currentPage, pagination.limit);
      } else {
        setAlert({
          message: result.message || "Có lỗi xảy ra khi xóa đánh giá",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Error deleting feedback:", error);
    } finally {
      // Đóng modal sau khi xóa (dù thành công hay thất bại)
      setConfirmModalOpen(false);
      setFeedbackToDelete(null);
    }
  };

  // Hiển thị modal xác nhận
  const openConfirmModal = (id: string) => {
    setFeedbackToDelete(id);
    setConfirmModalOpen(true);
  };

  // Hiển thị nút phân trang
  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          &laquo; Trước
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === pagination.currentPage
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Sau &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Đánh giá của người dùng</h2>

      {/* Hiển thị Alert */}
      {alert && (
        <Alert
          icon={
            alert.type === "success" ? (
              <IconCheck size={16} />
            ) : (
              <IconX size={16} />
            )
          }
          title={alert.type === "success" ? "Thành công" : "Lỗi"}
          color={alert.type === "success" ? "green" : "red"}
          withCloseButton
          onClose={() => setAlert(null)} // Đóng alert khi nhấn nút close
          mb="md"
        >
          {alert.message}
        </Alert>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn
            </label>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-hidden"
                >
                  <FaStar
                    className={`${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              rows={4}
              placeholder="Nhập đánh giá của bạn..."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        opened={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Xác nhận xóa đánh giá"
        centered
        size="md"
      >
        <Text size="sm" mb="md">
          Bạn có chắc chắn muốn xóa đánh giá này không? Hành động này không thể
          hoàn tác.
        </Text>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            color="red"
            onClick={() => feedbackToDelete && handleDelete(feedbackToDelete)}
            loading={loading}
          >
            Xóa đánh giá
          </Button>
        </Group>
      </Modal>

      <div className="space-y-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white p-4 rounded-lg shadow-xs border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center mb-2">
                  {feedback.user.image && (
                    <Image
                      src={feedback.user.image}
                      alt={feedback.user.name || "User"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {feedback.user.name || "Anonymous"}
                      </p>
                      {/* Hiển thị badge role nếu người dùng hiện tại là admin */}
                      {user && user.role === "ADMIN" && feedback.user.role && (
                        <Badge
                          size="xs"
                          color={
                            feedback.user.role === "ADMIN"
                              ? "red"
                              : feedback.user.role === "PREMIUM_USER"
                              ? "violet"
                              : "blue"
                          }
                        >
                          {feedback.user.role === "DEFAULT_USER"
                            ? "Người dùng"
                            : feedback.user.role === "PREMIUM_USER"
                            ? "Premium"
                            : "Admin"}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < feedback.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nút xóa feedback - chỉ hiển thị nếu người dùng là chủ feedback hoặc là admin */}
                {user &&
                  (user.id === feedback.userId || user.role === "ADMIN") && (
                    <button
                      onClick={() => openConfirmModal(feedback.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                      title="Xóa đánh giá"
                    >
                      <FaTrash size={16} />
                    </button>
                  )}
              </div>
              <p className="text-gray-700">{feedback.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>

      {renderPagination()}

      {pagination.total > 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Hiển thị {Math.min(pagination.limit, feedbacks.length)} trong tổng số{" "}
          {pagination.total} đánh giá
        </p>
      )}
    </div>
  );
}
