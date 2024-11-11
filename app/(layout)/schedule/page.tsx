'use client';

import React, {useState} from 'react';
import ActionBar from "@/components/ActionBar";
import SelectSection from "@/components/SelectSection";
import {DndContext} from "@dnd-kit/core";
import {useQuery} from "@tanstack/react-query";
import TimeLine from "@/components/TimeLine";
import useFilter from "@/hooks/use-filter";
import {getClass} from "@/services/class.service";


export type ClassRoot = {
    id: string
    weekDay: string
    time: string
    type: string
    room: string
    lecturerId: string
    subjectId: string
    yearStudyId: string
    semesterId: string
    subject: {
        id: string
        name: string
        majorId: string
        classId: Array<any>
        yearStudyId: string
        semesterId: string
    }
    lecturer: {
        id: string
        name: string
    }
}


function Page() {
    const {filters, setFilters} = useFilter();
    const [dragCard, setDragCard] = useState(null)

    const {data: classes, isLoading} = useQuery({
        queryKey: ['classes', filters],
        queryFn: () => getClass(filters.major, filters.semester, filters.year),
        staleTime: 1000 * 60 * 60 * 24
    });

    const [draggingItem, setDraggingItem] = useState(null)

    return (
        <div>
            <div className={"relative"}>
                <ActionBar filters={filters} setFilters={setFilters}/>
                <div className={"flex p-2 relative"}>
                    <DndContext >
                        <SelectSection classes={classes}/>
                        <TimeLine dragging={draggingItem}/>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}

export default Page;
