import React from 'react';
import ShareTimelinePage from "@/app/(no-layout)/schedule/share/components/ShareTimelinePage";
import {Metadata} from 'next';
import {SearchParams} from '@/app/page.type';
import {getTimeLine} from '@/lib/service/timeline';
import {ClassData} from '@/lib/types';
import {notFound} from 'next/navigation';
import { Prisma } from '@prisma/client';


export const metadata: Metadata = {
    title: 'Chia sẻ lịch học với bạn bè',
    description: 'Chia sẻ lịch học',
}

async function Page({params}: { params: Promise<{ schedule_id: string }>, searchParams: SearchParams }) {
    const {schedule_id: timeLineId} = await params;
    const timeline = await getTimeLine(timeLineId);

    if (!timeline) {
        return notFound();
    }

    return (
        <>
            <ShareTimelinePage classes={timeline!.data as Prisma.JsonArray}/>
        </>
    );
}

export default Page;