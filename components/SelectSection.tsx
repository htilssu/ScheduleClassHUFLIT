'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {ComboboxItem, Input, Select, Stack} from "@mantine/core";
import {ClassRoot} from "@/app/(layout)/schedule/page";
import {debounce} from 'lodash';
import ClassCard from "@/components/ClassCard";

interface SelectSectionProps {
    classes: ClassRoot[]
}

function SelectSection({classes}: SelectSectionProps) {
    const [classType, setClassType] = useState("Tất cả")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(100)
    const [searchList, setSearchList] = useState<ClassRoot[]>([...classes])


    // eslint-disable-next-line react-compiler/react-compiler,react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce((searchString: string) => {
        if (searchString !== "") {
            if (classType !== "Tất cả") {
                setSearchList(
                    classes.filter(value => {
                        return value.subject.name.toLowerCase().includes(
                            searchString.toLowerCase()) && value.type === classType
                    }))

            } else {
                setSearchList(
                    classes.filter(value => value.subject.name.toLowerCase().includes(searchString.toLowerCase())));
            }
        } else {
            setSearchList([...classes])
        }
    }, 500, {leading: false, trailing: true}), [classType, classes]);

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

    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md z-10"}>
            <h1 className={"text-center text-lg font-bold text-amber-800"}>Tùy chọn</h1>
            <Stack className={"mt-2"}>
                <Input onChange={handleSearchChange} placeholder={"Tìm kiếm"}/>
                <Select defaultValue={classType} onChange={handleTypeChange} data={["Tất cả", "Lý thuyết", "Thực hành"]}
                        placeholder={"Chọn loại"}/>
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
