'use client'

import React from 'react';
import {DndContext} from "@/lib/hook/use-dnd-context";
import TimeLine from "@/app/(no-layout)/schedule/components/TimeLine";
import FilterBar from './FilterBar';
import SelectSection from '@/app/(no-layout)/schedule/components/SelectSection';
import {ClassData} from '@/lib/types';

const ScheduleMain = ({classes}: {
    classes?: ClassData[]
}) => {

    return (
        <div className={"select-none"}>
            <div className={"relative"}>
                <FilterBar/>
                <DndContext>
                    <div className={"flex p-2 relative z-10 max-h-screen"}>
                        <SelectSection classes={classes || []}/>
                        <TimeLine/>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default ScheduleMain;
