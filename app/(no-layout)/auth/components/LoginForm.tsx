"use client";

import { AppDispatch, loadingSlice } from "@/lib/state";
import { useForm } from "@mantine/form";
import { Button, Text, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { resetUser } from "@/lib/state/user";

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
    account_locked:
      "Tài khoản đã bị khóa. Vui lòng liên hệ admin để được hỗ trợ",
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="space-y-2 mb-3">
        <Text component="label" htmlFor="username" size="sm" fw={500}>
          Tên đăng nhập / Email
        </Text>
        <TextInput id="username" {...form.getInputProps("username")} required />
      </div>
      <div className={"mb-1"}>
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
        <Text c="red" size="sm">
          {error}
        </Text>
      )}
      <Button type="submit" fullWidth color="orange" className={"mt-2"}>
        Đăng nhập
      </Button>
    </form>
  );
}
