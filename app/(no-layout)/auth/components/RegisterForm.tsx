"use client";

import { useRouter } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, PasswordInput, Button, Box, Text } from "@mantine/core";
import { signUp } from "@/app/actions/auth-actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadingSlice } from "@/lib/state";
import { RegisterData } from "@/app/types/auth";
import { z } from "zod";

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
  const dispatch = useDispatch();
  const { setLoading, setLoadingText } = loadingSlice.actions;

  const form = useForm<RegisterFormValues>({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
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
        toast.success("Đăng ký thành công!");
        // Chuyển hướng người dùng sau khi đăng ký thành công
        router.push("/");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi đăng ký");
      }
    } catch (error) {
      console.error("Lỗi khi gửi form đăng ký:", error);
      toast.error("Có lỗi xảy ra khi đăng ký");
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingText(""));
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Tên đăng nhập hoặc Email"
          placeholder="Nhập tên đăng nhập hoặc email"
          {...form.getInputProps("username")}
          mb="md"
        />
        <Text size="xs" color="dimmed" mb="md">
          Nếu nhập email, hệ thống sẽ tự động sử dụng làm tên đăng nhập
        </Text>

        <PasswordInput
          withAsterisk
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          {...form.getInputProps("password")}
          mb="md"
        />

        <PasswordInput
          withAsterisk
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          {...form.getInputProps("confirmPassword")}
          mb="md"
        />

        <Button type="submit" fullWidth mt="md" color="orange">
          Đăng ký
        </Button>
      </form>
    </Box>
  );
}
