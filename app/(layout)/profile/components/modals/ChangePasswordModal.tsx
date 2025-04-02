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
  }) => Promise<{ success: boolean; message?: string }>;
}

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
        // Hiển thị lỗi từ server trên trường tương ứng
        if (
          result.message?.toLowerCase().includes("mật khẩu hiện tại") ||
          result.message?.toLowerCase().includes("current password")
        ) {
          form.setFieldError("currentPassword", result.message);
        } else if (
          result.message?.toLowerCase().includes("mật khẩu mới") ||
          result.message?.toLowerCase().includes("new password")
        ) {
          form.setFieldError("newPassword", result.message);
        } else {
          form.setFieldError("currentPassword", result.message);
        }
      }
    } catch (error) {
      console.error("Error changing password:", error);
      form.setFieldError("currentPassword", "Có lỗi xảy ra khi đổi mật khẩu");
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
