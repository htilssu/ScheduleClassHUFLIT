import React, {useCallback, useEffect, useState} from 'react';
import {Table} from "@mantine/core";
import {Class} from "@prisma/client";
import {useDroppable} from "@/hooks/dnd/use-droppable";
import {trim} from "lodash";


interface TimeLineProps {
    dragging: Class | null
}

const MAX_TIME_SECTION = 15;

const defaultMark = [0, 3, 6, 9, 12]
const mm = Array.from({
    length: 7
}).map(() => new Set<number>(defaultMark))


function TimeLine({dragging}: TimeLineProps) {
    const {data, setNodeRef, droppedData, isDragging} = useDroppable();
    const [classList, setClassList] = useState<Class[]>([])
    const [mergeMark, setMergeMark] = useState(mm);

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
        setClassList([...classList, classData])
    }

    const getRowSpan = useCallback((col: number, i: number) => {
        const arr = Array.from(mergeMark[col]);
        if (arr.includes(i)) {
            if (arr.indexOf(i) === arr.length - 1) {
                return MAX_TIME_SECTION - i
            }
            return arr[arr.indexOf(i) + 1] - i
        }
        return 1
    }, [mergeMark]);

    useEffect(() => {
        if (droppedData) {
            handleAddClass(droppedData)
        }
    }, [droppedData]);


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
                                              className={"text-center border-[1px] border-gray-400"}></Table.Td>
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