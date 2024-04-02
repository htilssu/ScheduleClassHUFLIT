import React, {useCallback, useState} from 'react';
import TimeLine from "@/components/TimeLine";
import ActionBar from "@/components/ActionBar";
import SelectSection from "@/components/SelectSection";
import {DndContext, DragStartEvent} from "@dnd-kit/core";

function Schedule() {
    const [dragging, setDragging] = useState<any | null>(null)
    const onDndContextDragStart = useCallback((event: DragStartEvent) => {
        return setDragging({...event.active.data});
    }, []);


    function dragHandler(e: { active: { data: React.SetStateAction<{ id: string; weekDay: string; time: string; roomId: string; lecturerId: string; subjectId: string; } | null>; }; }) {
        setDragging(e.active.data)
    }

    function onDndContextDragEnd() {
        setDragging(null)
    }

    return (
        <div>
            <div>
                <ActionBar/>
                <div className={"flex p-2"}>
                    <DndContext onDragStart={onDndContextDragStart} onDragEnd={onDndContextDragEnd}>
                        <SelectSection/>
                        <TimeLine dragging={dragging}/>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}

export default Schedule;