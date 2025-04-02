"use client";

import { signUp } from "@/app/actions/auth-actions";
import { RegisterData } from "@/app/types/auth";
import { AppDispatch, loadingSlice } from "@/lib/state";
import { resetUser } from "@/lib/state/user";
import {
  Alert,
  Box,
  Button,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";


// Schema validation với Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

export function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const redirect =
    redirectPath && redirectPath.trim() !== "" ? redirectPath : "/home";
  const dispatch = useDispatch<AppDispatch>();
  const { setLoading, setLoadingText } = loadingSlice.actions;
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    setError(null);
    setSuccessMessage(null);
    dispatch(setLoading(true));
    dispatch(setLoadingText("Đang xử lý..."));

    try {
      const registerData: RegisterData = {
        name: values.name,
        username: values.username,
        password: values.password,
      };

      const result = await signUp(registerData);

      if (result.success) {
        setSuccessMessage("Đăng ký thành công! Chuyển sang đăng nhập...");
        form.reset(); // Reset form sau khi đăng ký thành công

        // Đợi 1.5 giây để hiển thị thông báo thành công trước khi chuyển tab
        setTimeout(() => {
          if (onRegisterSuccess) {
            onRegisterSuccess(); // Gọi callback để chuyển sang tab đăng nhập
          }
        }, 1500);
      } else {
        setError(result.message || "Có lỗi xảy ra khi đăng ký");
      }
    } catch (error) {
      console.error("Lỗi khi gọi action signUp:", error);
      setError("Có lỗi không xác định xảy ra");
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingText(""));
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Text component="label" htmlFor="name" size="sm" fw={500}>
            Họ tên
          </Text>
          <TextInput id="name" {...form.getInputProps("name")} required />
        </div>

        <div className="space-y-2">
          <Text component="label" htmlFor="username" size="sm" fw={500}>
            Tên đăng nhập hoặc Email
          </Text>
          <TextInput
            id="username"
            {...form.getInputProps("username")}
            required
          />
        </div>

        <div className="space-y-2">
          <Text component="label" htmlFor="password" size="sm" fw={500}>
            Mật khẩu
          </Text>
          <PasswordInput
            id="password"
            {...form.getInputProps("password")}
            required
          />
        </div>

        <div className="space-y-2">
          <Text component="label" htmlFor="confirmPassword" size="sm" fw={500}>
            Xác nhận mật khẩu
          </Text>
          <PasswordInput
            id="confirmPassword"
            {...form.getInputProps("confirmPassword")}
            required
          />
        </div>

        {error && (
          <Alert color="red" title="Lỗi" variant="light">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert color="green" title="Thành công" variant="light">
            {successMessage}
          </Alert>
        )}

        <Button type="submit" fullWidth color="orange">
          Đăng ký
        </Button>
      </form>
    </Box>
  );
}
