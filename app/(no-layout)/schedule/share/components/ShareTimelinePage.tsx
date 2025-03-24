'use client'

import React, {useEffect, useState} from 'react';
import TimeLine from "@/app/(no-layout)/schedule/components/TimeLine";
import {ClassData} from "@/lib/types";
import {loadClassFromLocal} from "@/lib/service/class.service";

function ShareTimelinePage() {
    const [classes, setClasses] = useState<ClassData[]>([])

    useEffect(() => {
        setClasses(loadClassFromLocal())
    }, []);


    return (
        <TimeLine classes={classes}/>
    );
}

export default ShareTimelinePage;