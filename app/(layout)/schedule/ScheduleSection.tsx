'use client'

import React, {useState} from 'react';
import {Class} from "@prisma/client";
import ActionBar from "@/components/ActionBar";
import {DndContext} from "@/hooks/use-dnd-context";
import SelectSection from "@/components/SelectSection";
import TimeLine from "@/components/TimeLine";
import {ClassRoot} from "@/app/(layout)/schedule/page";

const ScheduleSection = ({year, semester, major, classes}: {
    year: string,
    semester: string,
    major: string,
    classes?: ClassRoot[]
}) => {
    const [addedClass, setAddedClass] = useState([])


    const [draggingItem, setDraggingItem] = useState<Class | null>(null)
    return (
        <div className={'select-none'}>
            <div className={"relative"}>
                <ActionBar filters={{
                    year,
                    semester,
                    major
                }}/>
                <DndContext>
                    <div className={"flex p-2 relative z-10 max-h-screen"}>
                        <SelectSection classes={classes || []}/>
                        <TimeLine dragging={draggingItem}/>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default ScheduleSection;