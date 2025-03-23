import React from 'react';
import MainContent from "@/app/(layout)/home/components/MainContent";
import Notify from "@/app/(layout)/home/components/Notify";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Trang chủ của ứng dụng',
}

const Page = () => {
    return (
        <div className={"mb-20"}>
            <div className="flex justify-center items-start max-w-7xl mx-auto mt-5 gap-5">
                <MainContent/>
                <Notify/>
            </div>
        </div>
    );
};

export default Page;