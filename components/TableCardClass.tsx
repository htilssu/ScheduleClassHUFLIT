import {ClassRoot} from "@/app/(layout)/schedule/page";
import {Badge} from "@mantine/core";
import React from "react";

export const TableClassCard = ({classData}: { classData: ClassRoot }) => {
    return (
        <div
            className={"border-2 hover:cursor-grabbing flex flex-col gap-2 py-3 px-2 w-full h-full border-violet-600 border-dashed"}>
            <h1 className={'font-bold text-base'}>{classData.subject.name}</h1>
            <div className={'flex text-center flex-wrap gap-2 items-center justify-center'}>
                <Badge color={'teal'}>{classData.type}</Badge>
                <Badge color={'red'}>{classData.room}</Badge>
                <Badge color={'yellow'}>{classData.time}</Badge>
            </div>
            <h2 className={'text-base'}>{classData.lecturer.name}</h2>
            <p className={'select-text'}>{classData.id}</p>
        </div>
    )
}