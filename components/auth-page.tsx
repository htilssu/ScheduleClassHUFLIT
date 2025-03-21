"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { cn } from "@/lib/utils/TwMerge"
import { post } from "@/lib/utils/request"
import {RegisterForm} from "@/app/(no-layout)/auth/components/RegisterForm";
import {LoginForm} from "@/app/(no-layout)/auth/components/LoginForm";

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
                                isLogin ? "text-orange-500" : "text-gray-500"
                            )}
                            onClick={() => setIsLogin(true)}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={cn(
                                "flex-1 py-2 text-sm font-medium transition-colors duration-200",
                                !isLogin ? "text-orange-500" : "text-gray-500"
                            )}
                            onClick={() => setIsLogin(false)}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-in-out"
                        style={{
                            width: "50%",
                            transform: `translateX(${isLogin ? "0%" : "100%"})`,
                        }}
                    />
                </div>

                {isLogin ? (
                    <LoginForm
                        username={username}
                        password={password}
                        onUsernameChange={handleChangeUserName}
                        onPasswordChange={handleChangePassword}
                        onSubmit={handleLogin}
                    />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </div>
    )
}