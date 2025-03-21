'use client'

import React from 'react';
import Loading from "@/app/(no-layout)/schedule/loading";


const Page = () => {
    return (
        <div className={"h-screen"}>
            <div className={"flex justify-center items-center"}>
                Hello các bạn. Chào mừng đến trang HOME
                <Loading/>
            </div>
        </div>
    );
};

export default Page;