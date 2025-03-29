import React from 'react';
import LandingPage from "@/app/(layout)/components/LandingPage";
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Xếp lịch học HUFLIT Online - Tra cứu lịch học HUFLIT',
    description: 'Mọi khó khăn trong việc xếp lịch học cứ để chúng tôi lo!!',
    openGraph: {
        title: 'Xếp lịch học HUFLIT Online - Tra cứu lịch học HUFLIT',
        description: 'Mọi khó khăn trong việc xếp lịch học cứ để chúng tôi lo!!',
        images: "https://huflit.edu.vn/images/logo.png",
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
