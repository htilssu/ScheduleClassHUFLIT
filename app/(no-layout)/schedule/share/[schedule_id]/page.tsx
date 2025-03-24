import React from 'react';
import ShareTimelinePage from "@/app/(no-layout)/schedule/share/components/ShareTimelinePage";
import {Metadata} from 'next';


export const metadata: Metadata = {
    title: 'Chia sẻ lịch học với bạn bè',
    description: 'Chia sẻ lịch học',
}

async function Page({params}: { params: Promise<{ schedule_id: string }> }) {
    const {schedule_id} = await params;

    return (
        <ShareTimelinePage/>
    );
}

export default Page;