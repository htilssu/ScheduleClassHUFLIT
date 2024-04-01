import React, {useState} from 'react';
import LoginForm from "@/components/LoginForm";
import {Tabs} from "@mantine/core";

function Auth() {

    const [page, setPage] = useState("login")

    return (
        <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-slate-900 to-zinc-600">
            <div className="w-1/3 min-h-[400px] flex flex-col bg-rose-400 rounded-md mt-4 p-5"
            >
                <Tabs defaultValue={"login"}>
                    <Tabs.List justify={"center"}>
                        <Tabs.Tab color={"blue"} className={"text-white font-bold hover:text-purple-900"} value="login"
                                  onClick={() => setPage("login")}>Đăng nhập</Tabs.Tab>
                        <Tabs.Tab color={"blue"} className={"text-white font-bold hover:text-purple-900"}
                                  value="register" onClick={() => setPage("register")}>Đăng ký</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
                <div className={"mt-2 grow flex"}>
                    {page === "login" && <LoginForm/>}
                </div>
                {/*TODO: Add register form*/}
            </div>
        </div>
    );
}


export default Auth;