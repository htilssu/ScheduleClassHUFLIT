import React from 'react';
import DirectionPage from "@/app/(layout)/direction/components/DirectionPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Hướng dẫn sử dụng',
    description: 'Hướng dẫn của ứng dụng',
}

const Page = () => {
    return (
        <div>
            <DirectionPage/>
        </div>
    );
};

export default Page;