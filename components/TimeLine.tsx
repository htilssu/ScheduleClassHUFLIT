import React from 'react';
import {Table} from "@mantine/core";

type Class = {
    name: string,
    time: string,
    weekday: string,
    location: string,
    lecturer: string,
}

type TimeLineProps = {
    data: Class[],
}

function TimeLine() {


    return (
        <div className="w-full ml-2">
            <Table withTableBorder withColumnBorders>
                <Table.Thead className={"bg-amber-50"}>
                    <Table.Tr>
                        <Table.Th className={"text-center"}>Tiết</Table.Th>
                        {Array.from({length: 6}, (_, i) => i).map((i) => (
                            <Table.Th key={i} className={"text-center"}>Thứ {i + 2}</Table.Th>
                        ))}
                        <Table.Th className={"text-center"}>CN</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>

                </Table.Tbody>
            </Table>
        </div>
    );
}

export default TimeLine;