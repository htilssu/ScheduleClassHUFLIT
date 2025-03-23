
import React from 'react';
import Contact from "@/app/(layout)/contact/components/Contact";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Liên hệ',
    description: 'Liên hệ của ứng dụng',
}

const Page = () => {
    return (
        <div className={"h-screen"}>
            <Contact/>
        </div>
    );
};

export default Page;