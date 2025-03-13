'use client'

import {Button} from '@mantine/core';
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import {post} from "@/util/request.util";

function Navbar() {

    const {user} = useAuth();

    function logout() {
        post(origin + '/v1/auth/logout', {action: 'logout'}).then(() => {
            localStorage.setItem("token", "")
            window.location.href = '/';
        });
    }

    return (
        <div className="flex items-center justify-around gap-5 bg-white shadow-lg h-16 px-2 py-8">
            <div className={""}></div>
            <div className={"flex gap-5"}>
                <Button
                    className={"bg-transparent text-base hover:bg-transparent hover:text-lg hover:text-gray-600 transition-all ease-in-out text-black"}
                    component={Link} href={"/"}>Home</Button>
                <Button
                    className={"bg-transparent text-base hover:bg-transparent hover:text-lg hover:text-gray-600 transition-all ease-in-out text-black"}
                    component={Link} href={"/schedule"}>Xếp lịch</Button>
                <Button
                    className={"bg-transparent text-base hover:bg-transparent hover:text-lg hover:text-gray-600 transition-all ease-in-out text-black"}
                    component={Link} href={"/info"}>Thông tin</Button>
            </div>
            <div className={"flex gap-5"}>
                {user ? <Button className={"hover:text-yellow-100"} onClick={logout}>Đăng xuất</Button> :
                    <Button className={"hover:text-yellow-100"} component={Link} href={"/auth"}>Đăng nhập</Button>}
            </div>
        </div>
    );
}

export default Navbar;