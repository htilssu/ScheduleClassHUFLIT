
import React from 'react';
import Contact from "@/app/(layout)/contact/components/Contact";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Liên hệ với chúng tôi',
    description: 'Liên hệ của ứng dụng',
}

const Page = () => {
    return (
        <div>
            <Contact/>
        </div>
    );
};

export default Page;