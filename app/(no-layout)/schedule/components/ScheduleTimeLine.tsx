'use client'

import React, {useCallback, useEffect, useState} from 'react';
import TimeLine from './TimeLine';
import {ClassData} from "@/lib/types";
import {loadClassFromLocal, saveClassToLocal} from "@/lib/service/class.service";
import {useDroppable} from "@/lib/hook/use-droppable";

function ScheduleTimeLine() {
    const [classes, setClasses] = useState<ClassData[]>([])
    const {setNodeRef} = useDroppable({setDroppedData: handleAddClass});


    function handleAddClass(classData: ClassData) {
        setClasses((prevClasses) => {
            const newClasses = [...prevClasses, classData];
            saveClassToLocal(newClasses);
            return newClasses;
        });
    }

    const removeClass = useCallback(
        function removeClass(classId: string) {
            setClasses(prevState => {
                const newClassList = prevState.filter(value => value.id !== classId);
                saveClassToLocal(newClassList)
                return newClassList;
            })
        }
        , []);

    useEffect(() => {
        const localData = loadClassFromLocal();
        setClasses(() => localData)
    }, []);

    return (
        <div ref={setNodeRef} className={"w-full hover:cursor-grabbing ml-2"}>
            <TimeLine classes={classes} removeClass={removeClass}/>
        </div>
    );
}

export default ScheduleTimeLine;