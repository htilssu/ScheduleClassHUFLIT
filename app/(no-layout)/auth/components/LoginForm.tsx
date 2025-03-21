"use client"

import { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginParam {
    username: string
    password: string
}

interface LoginFormProps {
    username: string
    password: string
    onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void
    onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function LoginForm({
                              username,
                              password,
                              onUsernameChange,
                              onPasswordChange,
                              onSubmit
                          }: LoginFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    value={username}
                    onChange={onUsernameChange}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
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