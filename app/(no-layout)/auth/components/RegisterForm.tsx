"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Text,
  Alert,
} from "@mantine/core";
import { signUp } from "@/app/actions/auth-actions";
import { useDispatch } from "react-redux";
import { loadingSlice } from "@/lib/state";
import { RegisterData } from "@/app/types/auth";
import { z } from "zod";
import { IconAlertCircle } from "@tabler/icons-react";
import { signIn } from "@/lib/auth";
import { resetUser } from "@/lib/state/user";
import { AppDispatch } from "@/lib/state";
import { useState } from "react";

// Schema validation với Zod
const registerSchema = z
  .object({
    username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const redirect =
    redirectPath && redirectPath.trim() !== "" ? redirectPath : "/home";
  const dispatch = useDispatch<AppDispatch>();
  const { setLoading, setLoadingText } = loadingSlice.actions;
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    // Xóa lỗi cũ
    setError(null);

    // Hiển thị loading
    dispatch(setLoading(true));
    dispatch(setLoadingText("Đang đăng ký..."));

    try {
      const registerData: RegisterData = {
        username: values.username,
        password: values.password,
      };

      const result = await signUp(registerData);

      if (result.success) {
        // Đăng nhập tự động sau khi đăng ký thành công
        dispatch(setLoadingText("Đang đăng nhập..."));
        try {
          await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
          });

          // Đặt lại state user để kích hoạt việc load lại dữ liệu
          dispatch(resetUser());

          router.push(redirect);
        } catch (error) {
          console.error("Lỗi khi đăng nhập tự động:", error);
          setError("Đăng ký thành công nhưng không thể đăng nhập tự động");
          router.push("/auth"); // Chuyển hướng đến trang đăng nhập
        }
      } else {
        setError(result.message || "Có lỗi xảy ra khi đăng ký");
      }
    } catch (error) {
      console.error("Lỗi khi gửi form đăng ký:", error);
      setError("Có lỗi xảy ra khi đăng ký");
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingText(""));
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
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

        <Button type="submit" fullWidth color="orange">
          Đăng ký
        </Button>
      </form>
    </Box>
  );
}
