import {Button} from '@mantine/core';
import React from 'react';
import Link from "next/link";
import {IconArrowRight} from "@tabler/icons-react";
import {useAuth} from "@/contexts/AuthContext";
import {apiRequest} from "@/services/apiRequest";

function Navbar() {

    const {user} = useAuth();

    function logout() {
        apiRequest.post(origin + '/api/auth/logout',{action: 'logout'}).then(() => {
            localStorage.setItem("token", "")
            window.location.href = '/';
        });
    }

    return (
        <div className="flex items-center justify-around gap-5 bg-amber-100 h-16 p-2">
            <div className={""}></div>
            <div className={"flex gap-5"}>
                <Button className={"hover:text-yellow-100"} component={Link} href={"/"}>Home</Button>
                <Button className={"hover:text-yellow-100"} component={Link} href={"/schedule"}>Xếp lịch</Button>
                <Button className={"hover:text-yellow-100"} component={Link} href={"/info"}>Thông tin</Button>
            </div>
            <div className={"flex gap-5"}>
                {user ? <Button className={"hover:text-yellow-100"}  onClick={logout}>Đăng xuất</Button> :
                    <Button className={"hover:text-yellow-100"} component={Link} href={"/auth"}>Đăng nhập</Button>}
            </div>
        </div>
    );
}

export default Navbar;