"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useForm} from "@mantine/form"
import {signIn} from "next-auth/react"

interface LoginParam {
    username: string
    password: string
}

export function LoginForm() {
    const form = useForm<LoginParam>({
        initialValues: {
            username: "",
            password: ""
        }
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            signIn("credentials", {
                username: form.values.username,
                password: form.values.password,
                redirect: false
            }).then(value => {
            });
        }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                    id="username"
                    {...form.getInputProps("username")}
                    required
                />
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
            <Button type="submit" className="w-full">
                Đăng nhập
            </Button>
        </form>
    )
}