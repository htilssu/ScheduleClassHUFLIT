import React from 'react';
import MainContent from "@/app/(layout)/home/components/MainContent";
import Notify from "@/app/(layout)/home/components/Notify";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Trang chủ - Xếp lịch học',
    description: 'Trang chủ của ứng dụng',
}

const Page = () => {
    return (
        <div className={"mb-20"}>
            <div className="flex max-w-7xl justify-start mx-auto mt-5 lg:gap-5 gap-0">
                <div className="w-full lg:w-[70%] xl:w-[70%] 2xl:w-[70%]">
                    <MainContent/>
                </div>
                <div className="xl:w-[25%] 2xl:[29%] w-[26%] fixed xl:right-16 right-8 2xl:left-2/3 top-22">
                    <Notify/>
                </div>
            </div>
        </div>
    );
};

export default Page;