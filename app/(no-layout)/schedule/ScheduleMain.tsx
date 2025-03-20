'use client'

import React, {Profiler, useCallback, useState} from 'react';
import {DndContext} from "@/hook/use-dnd-context";
import SelectSection from "@/components/SelectSection";
import TimeLine from "@/components/TimeLine";
import {ClassRoot} from '@/lib/model/Class';
import FilterBar from './FilterBar';

const ScheduleMain = ({classes}: {
    classes?: ClassRoot[]
}) => {
    const [selectedClass, setSelectedClass] = useState<ClassRoot[]>([])

    const handleOnDragEnd = useCallback((data: ClassRoot) => {
        if (data !== null) {
            if (!selectedClass.includes(data)) {
                setSelectedClass(prevState => [...prevState, data])
            }
        }

    }, [selectedClass]);

    return (
        <div className={'select-none'}>
            <div className={"relative"}>
                <FilterBar/>
                <DndContext onDragEnd={handleOnDragEnd}>
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

