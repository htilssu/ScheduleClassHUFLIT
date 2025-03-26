'use client'

import React from 'react';
import TimeLine from "@/app/(no-layout)/schedule/components/TimeLine";
import {ClassData} from "@/lib/types";

interface ShareTimelinePageProps {
    classes: ClassData[]
}

function ShareTimelinePage({classes}: ShareTimelinePageProps) {

    return (
        <>
            <TimeLine classes={classes}/>
        </>
    );
}

export default ShareTimelinePage;