'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Table} from "@mantine/core";
import {Class} from "@prisma/client";
import {useDroppable} from "@/hook/dnd/use-droppable";
import {trim} from "lodash";
import {ClassRoot} from "@/app/(layout)/schedule/page";
import {TableClassCard} from './TableCardClass';
import {debug} from "@/util/logging.util";
import {loadClassFromLocal, saveClassToLocal} from "@/service/class.service";

const MAX_TIME_SECTION = 15;

const defaultMark = [0, 3, 6, 9, 12]
const mm = Array.from({
    length: 7
}).map(() => new Set<number>(defaultMark))


function TimeLine() {
    debug('TimeLine render')

    const {setNodeRef, droppedData} = useDroppable();
    const [mergeMark, setMergeMark] = useState(mm);
    const [classes, setClasses] = useState<ClassRoot[]>(loadClassFromLocal);

    useEffect(() => {
        saveClassToLocal(classes)
    }, [classes]);

    useEffect(() => {
        classes?.map(value => handleAddClass(value))
    }, [classes]);

    function handleAddClass(classData: Class) {
        const weekDay = Number(classData.weekDay[1]);
        const time = classData.time.split('-').map(trim).map(Number);
        const start = time[0];
        const end = time[1];
        setMergeMark(prevState => {
            return prevState.map((value, index) => {
                if (index === weekDay - 2) {
                    for (let i = start; i < end; i++) {
                        value.delete(i)
                    }
                    value.add(start - 1)
                    value.add(end)
                }
                return new Set<number>(Array.from(value).sort((a, b) => a - b))
            })
        })
    }

    const getRowSpan = useCallback((col: number, i: number) => {
        const arr = Array.from(mergeMark[col]);
        const indexOfi = arr.indexOf(i);
        if (indexOfi !== -1) {
            if (indexOfi === arr.length - 1) {
                return MAX_TIME_SECTION - i
            }
            return arr[indexOfi + 1] - i
        }
        return 1
    }, [mergeMark]);

    useEffect(() => {
        if (droppedData) {
            setClasses(prevState => [...prevState, droppedData])
        }
    }, [droppedData]);

    const removeClass = useCallback(
        function removeClass(classId: string) {
            setClasses(prevState => prevState.filter(value => value.id !== classId))
        }
        , []);


    function getTableClassCard(row: number, col: number) {
        const classData = classes?.find(value => {
            const weekDay = Number(value.weekDay[1]);
            const time = value.time.split('-').map(trim).map(Number);
            const start = time[0];
            return weekDay - 2 === col && start - 1 == row
        })
        if (classData) {
            return <TableClassCard onRemoveClass={removeClass} classData={classData}/>
        }
    }

    return (
        <div ref={setNodeRef} className="w-full ml-2">
            <Table className={"border-[1px] border-gray-400"}>
                <Table.Thead className={"bg-amber-50"}>
                    <Table.Tr>
                        <Table.Th className={"!text-center border-[1px] border-gray-400"}>Tiết</Table.Th>
                        {Array.from({length: 6}, (_, i) => i).map((i) => (
                            <Table.Th key={i}
                                      className={"!text-center border-[1px] border-gray-400"}>Thứ {i + 2}</Table.Th>
                        ))}
                        <Table.Th className={"!text-center border-[1px] border-gray-400"}>CN</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {Array.from({length: MAX_TIME_SECTION}, (_, i) => i).map((i) => (
                        <Table.Tr key={i}>
                            <Table.Td
                                className={"!text-center bg-rose-50 border-[1px] border-gray-400"}>{i + 1}</Table.Td>
                            {
                                Array.from({length: 7}, (_, j) => j).map((j) => (
                                    mergeMark[j].has(i) &&
                                    <Table.Td key={j} rowSpan={getRowSpan(j, i)}
                                              className={"!p-2 text-center border-[1px] border-gray-400 max-w-32"}>
                                      <div className={'w-full h-full'}>
                                          {getTableClassCard(i, j)}
                                      </div>
                                    </Table.Td>
                                ))
                            }
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
}

export default TimeLine;