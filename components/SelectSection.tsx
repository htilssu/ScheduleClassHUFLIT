import React, {useEffect, useState} from 'react';
import {ComboboxItem, Input, ScrollArea, Select, Stack} from "@mantine/core";
import ClassCard from "@/components/ClassCard";
import {ClassRoot} from "@/pages/schedule";

interface SelectSectionProps {
    classes: ClassRoot[]
}

function SelectSection({classes}: SelectSectionProps) {

    const [classType, setClassType] = useState("Lý thuyết")
    const [classList, setClassList] = useState<ClassRoot[]>(classes)
    const [search, setSearch] = useState("")
    const [displayCount, setDisplayCount] = useState(20)
    const [searchList, setSearchList] = useState<ClassRoot[]>(classes)


    useEffect(() => {
        const debounce = setTimeout(() => {
            if (search !== "") {
                setSearchList(searchList.filter(value => value.subject.name.toLowerCase().includes(search.toLowerCase())))
            } else {
                setSearchList([...classes])
            }
            if (classType === "Tất cả") {
                setClassList([...searchList])
            } else {
                setClassList(_ => searchList.filter(value => value.type === classType))
            }

            setDisplayCount(20)

        },5000);

        return () => clearTimeout(debounce)
    }, [search]);

    function handleTypeChange(e: string | null, _: ComboboxItem) {
        setClassType(e!)
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
        if (bottom) {
            setDisplayCount(displayCount + 20);
        }
    }

    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md"}>
            <h1 className={"text-center text-lg font-bold text-amber-800"}>Tùy chọn</h1>
            <Stack className={"mt-2"}>
                <Input onChange={handleSearchChange} placeholder={"Tìm kiếm"}/>
                <Select defaultValue={classType} onChange={handleTypeChange} data={["Tất cả", "Lý thuyết", "Thực hành"]}
                        placeholder={"Chọn loại"}/>
            </Stack>

            <ScrollArea scrollbars={"y"} className={"overflow-x-hidden mt-4 scroll-hide-thumb"} onScroll={handleScroll}>
                {classList.map((value, index) => <ClassCard key={index} classData={value}/>)}
            </ScrollArea>

        </div>
    );
}

export default SelectSection;
