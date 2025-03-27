"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
    return (
        <form className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" type="text" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input id="username" type="username" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Đăng ký
            </Button>
        </form>
    )
}