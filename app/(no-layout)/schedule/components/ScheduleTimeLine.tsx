'use client'

import React from 'react';
import TimeLine from './TimeLine';
import {ClassData} from "@/lib/types";
import {useDroppable} from "@/lib/hook/use-droppable";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "@/lib/state";
import {timeLineSlice, TimeLineState} from '@/lib/state/timeline';

function ScheduleTimeLine() {
    const {classes} = useSelector<RootState, TimeLineState>(state => state.timeline);
    const dispatch = useDispatch();
    const actions = timeLineSlice.actions;
    const {setNodeRef} = useDroppable({setDroppedData: handleAddClass});


    function handleAddClass(classData: ClassData) {
        dispatch(actions.addClass(classData))
    }

    function handleRemoveClass(classId: string) {
        dispatch(actions.removeClass({id: classId}))
    }

    return (
        <div ref={setNodeRef} className={"w-full hover:cursor-grabbing ml-2"}>
            <TimeLine classes={classes} removeClass={handleRemoveClass}/>
        </div>
    );
}

export default ScheduleTimeLine;