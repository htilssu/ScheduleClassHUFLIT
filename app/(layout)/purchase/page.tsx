import React from 'react';
import {Metadata} from "next";
import Purchase from "@/app/(layout)/purchase/components/Purchase";

export const metadata: Metadata = {
    title: 'Dịch vụ của chúng tôi',
    description: 'Gói dịch vụ của ứng dụng',
}

const Page = () => {
    return (
        <div>
            <Purchase/>
        </div>
    );
};

export default Page;