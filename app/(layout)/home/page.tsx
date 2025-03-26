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
            <div className="flex max-w-7xl 2xl:justify-center xl:justify-start mx-auto mt-5 lg:gap-5 gap-0">
                <div className="w-full lg:w-[68%] xl:w-[72%]">
                    <MainContent/>
                </div>
                <div className="xl:w-[26%] w-[28%] fixed xl:right-16 right-8 top-22">
                    <Notify/>
                </div>
            </div>
        </div>
    );
};

export default Page;