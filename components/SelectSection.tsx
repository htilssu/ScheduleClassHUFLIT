'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Button, ComboboxItem, Flex, Input, Select, Stack} from "@mantine/core";
import {ClassRoot} from "@/app/(layout)/schedule/page";
import {debounce} from 'lodash';
import ClassCard from "@/components/ClassCard";
import {IconAdjustmentsHorizontal} from '@tabler/icons-react';
import {Class} from "@prisma/client";

interface SelectSectionProps {
    classes: ClassRoot[]
}

function SelectSection({classes}: SelectSectionProps) {
    const [classType, setClassType] = useState("Tất cả")
    const [teacherName, setTeacherName] = useState("")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(300)
    const [searchList, setSearchList] = useState<ClassRoot[]>([...classes])

    const debouncedSearch = useCallback(
        debounce(
            (searchString: string) => {
                if (searchString === "") {
                    setSearchList([...classes]);
                    return;
                }

                setSearchList(
                    classes.filter((value) => {
                        const matchesSubject = value.Subject.name
                                                    .toLowerCase()
                                                    .includes(searchString.toLowerCase());
                        const matchesType =
                            classType === "Tất cả" || value.type === classType;
                        const matchesTeacher =
                            teacherName === "" ||
                            value.Lecturer.name.toLowerCase().includes(teacherName.toLowerCase());

                        return matchesSubject && matchesType && matchesTeacher;
                    })
                );
            },
            500,
            { leading: false, trailing: true }
        ),
        [classType, classes, teacherName]
    );

    useEffect(() => {
        setSearchList(_ => [])
        debouncedSearch(search)

        return debouncedSearch.cancel
    }, [debouncedSearch, search]);

    function handleTypeChange(e: string | null, _: ComboboxItem) {
        setClassType(e!)
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    function handleSearchByTeacher(e: React.ChangeEvent<HTMLInputElement>) {
        setTeacherName(e.target.value)
    }

    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md z-10"}>
            <h1 className={"text-center text-lg font-bold text-amber-800"}>Tùy chọn</h1>
            <Stack className={"mt-2"}>
                <Input onChange={handleSearchChange} placeholder={"Tìm kiếm"}/>
                <Input onChange={handleSearchByTeacher} placeholder={"Tên giáo viên"}/>
                <Flex gap={'xs'} justify={'end'}>
                    <Select className={'w-full'} defaultValue={classType} onChange={handleTypeChange}
                            data={["Tất cả", "Lý thuyết", "Thực hành"]}
                            placeholder={"Chọn loại"}/>
                    <Button variant={'gradient'}
                            color={'blue'}
                            className={'w-auto'}><IconAdjustmentsHorizontal/></Button>
                </Flex>

            </Stack>

            <div className={"mt-2 overflow-y-auto overflow-x-visible"}>
                {searchList.slice(0, limit).map((value, index) => (
                    <ClassCard key={index} classData={value}/>
                ))}
            </div>
        </div>
    );
}

export default SelectSection;
