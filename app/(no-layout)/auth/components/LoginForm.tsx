"use client";

import { loadingSlice } from "@/lib/state";
import { useForm } from "@mantine/form";
import { Button, TextInput, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { resetUser } from "@/lib/state/user";
import { AppDispatch } from "@/lib/state";

interface LoginParam {
  username: string;
  password: string;
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const redirect =
    redirectPath && redirectPath.trim() !== "" ? redirectPath : "/home";

  const loadingAction = loadingSlice.actions;
  const dispatch = useDispatch<AppDispatch>();

  const errorMessages = {
    user_not_found: "Tài khoản không tồn tại",
    invalid_password: "Mật khẩu không chính xác",
    default: "Đã xảy ra lỗi khi đăng nhập",
  };

  const form = useForm<LoginParam>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginParam) => {
    setError(null);
    dispatch(loadingAction.setLoading(true));
    dispatch(loadingAction.setLoadingText("Đang đăng nhập..."));

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.code) {
        const errorCode = result.code;
        const errorMessage =
          errorMessages[errorCode as keyof typeof errorMessages] ||
          errorMessages.default;
        setError(errorMessage);
      } else if (result?.ok) {
        dispatch(resetUser());
        router.push(redirect);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setError(errorMessages.default);
    } finally {
      dispatch(loadingAction.setLoading(false));
      dispatch(loadingAction.setLoadingText(""));
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Text component="label" htmlFor="username" size="sm" fw={500}>
          Tên đăng nhập / Email
        </Text>
        <TextInput id="username" {...form.getInputProps("username")} required />
      </div>
      <div className="space-y-2">
        <Text component="label" htmlFor="password" size="sm" fw={500}>
          Mật khẩu
        </Text>
        <TextInput
          id="password"
          {...form.getInputProps("password")}
          type="password"
          required
        />
      </div>
      {error && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
      <Button type="submit" fullWidth color="orange">
        Đăng nhập
      </Button>
    </form>
  );
}
