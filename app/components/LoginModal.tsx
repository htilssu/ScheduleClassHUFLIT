import React from "react";
import { Modal, Text, Button, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";

/**
 * Props cho component LoginModal
 * @param opened - Trạng thái hiển thị của modal
 * @param onClose - Hàm xử lý đóng modal
 * @param onLogin - Hàm xử lý khi người dùng chọn đăng nhập
 * @param title - Tiêu đề của modal, mặc định là "Phiên đăng nhập đã hết hạn"
 * @param message - Nội dung thông báo, mặc định là "Phiên đăng nhập của bạn đã hết hạn..."
 */
interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

/**
 * Modal thông báo hết phiên đăng nhập và chuyển hướng đến trang đăng nhập
 */
export function LoginModal({
  opened,
  onClose,
  title = "Phiên đăng nhập đã hết hạn",
  message = "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục sử dụng.",
}: LoginModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Flex justify="flex-end" gap="md">
        <Button variant="default" onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handleLogin}>Đăng nhập</Button>
      </Flex>
    </Modal>
  );
}
