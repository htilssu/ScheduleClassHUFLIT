import React from 'react';
import LandingPage from "@/app/(layout)/components/LandingPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Xếp Lịch học Online',
    description: 'Mọi khó khăn trong việc xếp lịch học cứ để chúng tôi lo!!',
    openGraph: {
        title: 'Xếp Lịch học Online',
        description: 'Mọi khó khăn trong việc xếp lịch học cứ để chúng tôi lo!!',
    }
}


function Page() {
    return (
        <div>
            <LandingPage/>
        </div>
    );
}

export default Page;
