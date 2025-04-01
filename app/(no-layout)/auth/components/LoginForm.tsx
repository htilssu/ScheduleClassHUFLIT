"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadingSlice } from "@/lib/state";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(loadingAction.setLoading(true));
    dispatch(loadingAction.setLoadingText("Đang đăng nhập..."));

    try {
      const result = await signIn("credentials", {
        username: form.values.username,
        password: form.values.password,
        redirect: false,
      });

      if (result?.error) {
        const errorCode = result.error as keyof typeof errorMessages;
        const errorMessage = errorMessages[errorCode] || errorMessages.default;
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (result?.ok) {
        toast.success("Đăng nhập thành công!");
        router.push(redirect);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      toast.error(errorMessages.default);
    } finally {
      dispatch(loadingAction.setLoading(false));
      dispatch(loadingAction.setLoadingText(""));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Tên đăng nhập / Email</Label>
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
