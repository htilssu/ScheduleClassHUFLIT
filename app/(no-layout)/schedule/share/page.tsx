import React from 'react';
import ShareTimelinePage from "@/app/(no-layout)/schedule/share/components/ShareTimelinePage";


export const metadata: Metadata = {
    title: 'Chia sẻ lịch học với bạn bè',
    description: 'Chia sẻ lịch học',
}

function Page() {
    return (
        <ShareTimelinePage/>
    );
}

export default Page;