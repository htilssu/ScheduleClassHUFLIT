'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Table} from "@mantine/core";
import {trim} from "lodash";
import {debug} from "@/lib/utils/logging";
import {SortedSet} from '@/lib/SortedSet';
import {TableClassCard} from './TableCardClass';
import {ClassData} from '@/lib/types';

const MAX_TIME_SECTION = 15;

const defaultMark = [0, 3, 6, 9, 12]
const mm = Array.from({
    length: 7
}).map(() => new SortedSet<number>(defaultMark))


type TimeLineProps = {
    classes: ClassData[]
    removeClass?: (classId: string) => void
}

function TimeLine(props: TimeLineProps) {
    debug('TimeLine render')
    const [mergeMark] = useState(mm);
    const [classes, setClasses] = useState(props.classes)

    const handleUpdateMergeSplit = useCallback((classData: ClassData) => {
        classData.learningSection.forEach(({weekDay, time}) => {
            const [start, end] = time.split('-').map(trim).map(Number);
            const dayOfWeekMarkSplit = mergeMark[Number(weekDay) - 2];
            console.log(JSON.stringify(mergeMark));

            dayOfWeekMarkSplit.add(start - 1)
            dayOfWeekMarkSplit.add(end);
            for (let i = start; i < end; i++) dayOfWeekMarkSplit.remove(i);
        });

    }, [mergeMark])

    useEffect(() => {
        setClasses(() => {
            props.classes.map(value => handleUpdateMergeSplit(value))
            return props.classes;
        })
    }, [handleUpdateMergeSplit, props.classes]);


    const getRowSpan = useCallback((dayInWeek: number, section: number) => {
        const arr = Array.from(mergeMark[dayInWeek]);
        const indexOfi = arr.indexOf(section);
        if (indexOfi !== -1) {
            if (indexOfi === arr.length - 1) {
                return MAX_TIME_SECTION - section
            }
            return arr[indexOfi + 1] - section
        }
        return 1
    }, [mergeMark]);


    function getTableClassCard(row: number, col: number) {
        const classData = classes?.find(classItem =>
            classItem.learningSection.some(({weekDay, time}) => {
                const [start] = time.split('-').map(trim).map(Number);
                return Number(weekDay) - 2 === col && start - 1 === row;
            })
        );

        if (!classData) return null;

        const learningSection = classData.learningSection.find(({weekDay}) => Number(weekDay) - 2 === col)!;

        return <TableClassCard onRemoveClass={props.removeClass} classData={{...classData, learningSection}}/>;
    }


    return (
        <div className="w-full">
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