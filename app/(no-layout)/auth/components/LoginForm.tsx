"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {loadingSlice} from "@/lib/state"
import {useForm} from "@mantine/form"
import {signIn} from "next-auth/react"
import {useDispatch} from "react-redux"

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

    const loadingAction = loadingSlice.actions
    const dispatch = useDispatch()

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(loadingAction.setLoading(true))

            signIn("credentials", {
                username: form.values.username,
                password: form.values.password,
                redirect: false
            }).then(value => {
                //TODO: handle login error
                dispatch(loadingAction.setLoading(false))
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