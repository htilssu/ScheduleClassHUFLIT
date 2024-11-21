import {ClassRoot} from "@/app/(layout)/schedule/page";
import {Badge, Menu} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {IoTrash} from "react-icons/io5";

export const TableClassCard = ({classData, onRemoveClass}: {
    classData: ClassRoot,
    onRemoveClass?: (classId: string) => void
}) => {
    const [isOpenMenuContext, setIsOpenMenuContext] = useState(false)

    function handleContextMenu(e: React.MouseEvent) {
        e.preventDefault()
        setIsOpenMenuContext(true)
    }

    useEffect(() => {
        if (!isOpenMenuContext) return;

        const timeout = setTimeout(() => {
            setIsOpenMenuContext(false)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [isOpenMenuContext]);

    return (
        <Menu opened={isOpenMenuContext} closeDelay={3000} position="right-start" offset={7} withArrow
              arrowPosition="center">
            <Menu.Target>
                <div onContextMenu={handleContextMenu}
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
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={() => {
                    onRemoveClass?.(classData.id)
                }} color={"red"} leftSection={<IoTrash/>} component="button">
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}