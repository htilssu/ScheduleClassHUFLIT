"use client";

import React, { useState } from "react";
import { Modal, Stack, PasswordInput, Button, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

interface ChangePasswordModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<{ success: boolean; message?: string; code?: string }>;
}

// Định nghĩa các mã lỗi có thể xảy ra
export enum PasswordErrorCode {
  INVALID_CURRENT_PASSWORD = "invalid_current_password",
  SAME_PASSWORD = "same_password",
  WEAK_PASSWORD = "weak_password",
  SERVER_ERROR = "server_error",
}

// Bảng dịch mã lỗi sang thông báo người dùng
const errorMessages: Record<string, string> = {
  [PasswordErrorCode.INVALID_CURRENT_PASSWORD]:
    "Mật khẩu hiện tại không chính xác",
  [PasswordErrorCode.SAME_PASSWORD]:
    "Mật khẩu mới không được trùng với mật khẩu hiện tại",
  [PasswordErrorCode.WEAK_PASSWORD]: "Mật khẩu mới không đủ mạnh",
  [PasswordErrorCode.SERVER_ERROR]:
    "Có lỗi xảy ra khi đổi mật khẩu, vui lòng thử lại sau",
  default: "Có lỗi xảy ra khi đổi mật khẩu",
};

// Schema validation với Zod
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Mật khẩu phải có ít nhất 1 ký tự in hoa",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Mật khẩu phải có ít nhất 1 ký tự số",
      }),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
    path: ["newPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePasswordModal = ({
  opened,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PasswordFormValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: zodResolver(passwordSchema),
  });

  const handleSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (result.success) {
        // Reset form on success
        form.reset();
        onClose();
      } else {
        // Xử lý lỗi dựa trên mã lỗi nếu có
        if (result.code) {
          const errorMessage =
            errorMessages[result.code] || errorMessages.default;

          // Xác định trường cần hiển thị lỗi dựa trên mã lỗi
          switch (result.code) {
            case PasswordErrorCode.INVALID_CURRENT_PASSWORD:
              form.setFieldError("currentPassword", errorMessage);
              break;
            case PasswordErrorCode.SAME_PASSWORD:
            case PasswordErrorCode.WEAK_PASSWORD:
              form.setFieldError("newPassword", errorMessage);
              break;
            default:
              form.setFieldError("currentPassword", errorMessage);
          }
        } else if (result.message) {
          // Fallback: xử lý dựa trên nội dung thông báo
          if (
            result.message.toLowerCase().includes("mật khẩu hiện tại") ||
            result.message.toLowerCase().includes("current password")
          ) {
            form.setFieldError("currentPassword", result.message);
          } else if (
            result.message.toLowerCase().includes("mật khẩu mới") ||
            result.message.toLowerCase().includes("new password")
          ) {
            form.setFieldError("newPassword", result.message);
          } else {
            form.setFieldError("currentPassword", result.message);
          }
        } else {
          form.setFieldError("currentPassword", errorMessages.default);
        }
      }
    } catch (error) {
      console.error("Error changing password:", error);
      form.setFieldError(
        "currentPassword",
        errorMessages[PasswordErrorCode.SERVER_ERROR]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title="Đổi mật khẩu"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <PasswordInput
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            withAsterisk
            {...form.getInputProps("currentPassword")}
          />
          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            withAsterisk
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            withAsterisk
            {...form.getInputProps("confirmPassword")}
          />
          <Text size="sm" c="dimmed">
            Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 ký tự in hoa và
            1 ký tự số
          </Text>
          <Button
            type="submit"
            color="orange"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Đổi mật khẩu
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
