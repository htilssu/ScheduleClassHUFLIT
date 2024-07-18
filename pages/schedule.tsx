import React, {useCallback, useEffect, useState} from 'react';
import TimeLine from "@/components/TimeLine";
import ActionBar from "@/components/ActionBar";
import SelectSection from "@/components/SelectSection";
import {DndContext, DragStartEvent} from "@dnd-kit/core";
import {apiRequest} from "@/services/apiRequest";


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

function Schedule() {
    const [currentYear, setCurrentYear] = useState<string>("")
    const [currentSemester, setCurrentSemester] = useState<string>("")
    const [currentMajor, setCurrentMajor] = useState<string>("")
    const [dragging, setDragging] = useState<any>(null)
    const [classes, setClasses] = useState<ClassRoot[]>([])
    const onDndContextDragStart = useCallback((event: DragStartEvent) => {
        return setDragging({...event.active.data});
    }, []);


    useEffect(() => {
        apiRequest.get(`/api/class?studyYear=${currentYear}&semester=${currentSemester}&major=${currentMajor}`).then(res => {
            setClasses(res.data)
        });
    }, [currentMajor, currentSemester, currentYear]);


    function dragHandler(e: {
        active: {
            data: React.SetStateAction<{
                id: string;
                weekDay: string;
                time: string;
                roomId: string;
                lecturerId: string;
                subjectId: string;
            } | null>;
        };
    }) {
        setDragging(e.active.data)
    }


    function onDndContextDragEnd() {
        setDragging(null)
    }

    return (
        <div>
            <div className={"relative"}>
                <ActionBar setCurrentYear={setCurrentYear} setCurrentSemester={setCurrentSemester}
                           setCurrentMajor={setCurrentMajor}/>
                <div className={"flex p-2"}>
                    <DndContext onDragStart={onDndContextDragStart} onDragEnd={onDndContextDragEnd}>
                        <SelectSection classes={classes} />
                        <TimeLine dragging={dragging}/>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
