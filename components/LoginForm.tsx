import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Input, Text} from "@mantine/core";
import {FaUser} from "react-icons/fa";
import {MdLock} from "react-icons/md";
import {apiRequest} from "@/services/apiRequest";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/router";
import {useForm} from "@mantine/form";


function LoginForm() {
    const [error, setError] = useState()
    const auth = useAuth()
    const router = useRouter()
    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            remember: false
        }
    });

    const {reset} = router.query

    useEffect(() => {
        if (reset && reset === "true") {
            localStorage.setItem("user", "")
        }
    }, [reset]);



    function login(e: { preventDefault: () => void; }) {
        e.preventDefault()
        apiRequest.post(origin + "/api/auth/login", {...form.values}
        ).then(result => {
            if (result.data.message){
                setError(result.data.message)
                return
            }
            localStorage.setItem("token", result.data.token)
            auth.setCurrentUser({...result.data})
            router.push("/").then()
        })
    }


    return (
        <div className="flex w-full flex-col justify-around">
            <Text className={"text-white font-bold text-center"} size={"xl"}>Đăng nhập</Text>
            <Input {...form.getInputProps("username")} leftSection={<FaUser/>} className={"mt-2"}
                   placeholder={"Tên đăng nhập"}/>
            <Input {...form.getInputProps("password")} leftSection={<MdLock/>} className={"mt-2"}
                   placeholder={"Mật khẩu"} type={"password"}/>
            {error && <Text className={"text-purple-900"}>{error}</Text>}
            <div className={"flex items-center mt-3"}>
                <Checkbox {...form.getInputProps("remember")}/>
                <Text className={"ml-2 text-white text-center h-full"}>Ghi nhớ đăng nhập</Text>
            </div>
            <div className={"text-center mt-5"}>
                <Button onClick={login} className="text-center bg-purple-900 hover:bg-amber-100 hover:text-purple-900"
                        fullWidth>Đăng nhập</Button>
            </div>
        </div>
    )
}

export default LoginForm;