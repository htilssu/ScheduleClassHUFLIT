"use client"

import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils/TwMerge"
import {post} from "@/lib/utils/request";

interface LoginParam {
    username: string
    password: string
}

function login(data: LoginParam) {
    post("/v1/sign-in", data).then(r => {
        location.href = "/"
    })
}

export function AuthPageComponent() {
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const toggleAuth = () => setIsLogin(!isLogin)

    function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (username === '' || password === '') {
            return
        }

        login({
            username,
            password
        })
    }

    function handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="relative">
                    <div className="flex">
                        <button
                            className={cn(
                                "flex-1 py-2 text-sm font-medium transition-colors duration-200",
                                isLogin ? "text-primary" : "text-gray-500"
                            )}
                            onClick={() => setIsLogin(true)}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={cn(
                                "flex-1 py-2 text-sm font-medium transition-colors duration-200",
                                !isLogin ? "text-primary" : "text-gray-500"
                            )}
                            onClick={() => setIsLogin(false)}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                        style={{
                            width: "50%",
                            transform: `translateX(${isLogin ? "0%" : "100%"})`,
                        }}
                    />
                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" onChange={handleChangeUserName} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" onChange={handleChangePassword} type="password" required/>
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </form>
                ) : (
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Họ tên</Label>
                            <Input id="name" type="text" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                            <Input id="confirmPassword" type="password" required/>
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng ký
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}