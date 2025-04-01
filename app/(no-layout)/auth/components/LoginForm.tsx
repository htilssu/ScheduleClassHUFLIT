"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadingSlice } from "@/lib/state";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginParam {
  username: string;
  password: string;
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginParam>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const loadingAction = loadingSlice.actions;
  const dispatch = useDispatch();

  const errorMessages = {
    user_not_found: "Tài khoản không tồn tại",
    invalid_password: "Mật khẩu không chính xác",
    default: "Đã xảy ra lỗi khi đăng nhập",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        dispatch(loadingAction.setLoading(true));

        signIn("credentials", {
          username: form.values.username,
          password: form.values.password,
          redirect: false,
        }).then((value) => {
          if (value?.error) {
            const errorCode = value.code as keyof typeof errorMessages;
            const errorMessage =
              errorMessages[errorCode] || errorMessages.default;
            setError(errorMessage);
            toast.error(errorMessage);
          }
          dispatch(loadingAction.setLoading(false));
        });
      }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="username">Email</Label>
        <Input id="username" {...form.getInputProps("username")} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          {...form.getInputProps("password")}
          type="password"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full">
        Đăng nhập
      </Button>
    </form>
  );
}
