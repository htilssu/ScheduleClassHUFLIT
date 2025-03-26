import React from 'react';
import ShareTimeLinePage from "@/app/(no-layout)/schedule/share/components/ShareTimeLinePage";
import {Metadata} from 'next';
import {SearchParams} from '@/app/page.type';


export const metadata: Metadata = {
    title: 'Chia sẻ lịch học với bạn bè',
    description: 'Chia sẻ lịch học',
}

async function Page({params}: { params: Promise<{ schedule_id: string }>, searchParams: SearchParams }) {
    const {schedule_id: timeLineId} = await params;


    return (
        <>
            <ShareTimeLinePage classes={[]}/>
        </>
    );
}

export default Page;