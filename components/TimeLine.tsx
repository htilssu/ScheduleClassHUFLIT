import React from 'react';
import {Table} from "@mantine/core";
import {Class} from "@prisma/client";


interface TimeLineProps {
    dragging: Class | null
}

function TimeLine({dragging}: TimeLineProps) {


    return (
        <div className="w-full ml-2">
            <Table className={"border-[1px] border-gray-400"}>
                <Table.Thead className={"bg-amber-50"}>
                    <Table.Tr>
                        <Table.Th className={"text-center border-[1px] border-gray-400"}>Tiết</Table.Th>
                        {Array.from({length: 6}, (_, i) => i).map((i) => (
                            <Table.Th key={i} className={"text-center border-[1px] border-gray-400"}>Thứ {i + 2}</Table.Th>
                        ))}
                        <Table.Th className={"text-center border-[1px] border-gray-400"}>CN</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {Array.from({length: 15}, (_, i) => i).map((i) => (
                        <Table.Tr key={i}>
                            <Table.Td className={"text-center bg-rose-50 border-[1px] border-gray-400"}>{i + 1}</Table.Td>
                            {Array.from({length: 7}, (_, j) => j).map((j) => (
                                i % 3 == 0 && <Table.Td key={j} rowSpan={3} className={"text-center border-[1px] border-gray-400"}>{dragging?.weekDay === (j + 2).toString() && dragging?.time === `${i + 1}-${i + 2}` ? "Dragging" : ""}</Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
}

export default TimeLine;