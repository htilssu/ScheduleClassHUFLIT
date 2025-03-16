import React, {useState} from 'react';
import {ComboboxItem, Flex, Input, Select} from "@mantine/core";

const FilterBar = () => {
    const [classType, setClassType] = useState("Tất cả")
    const [day, setDay] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(300)

    function handleTypeChange(e: string | null, _: ComboboxItem) {
        setClassType(e!)
    }

    function handleDayChange(e: string | null, _: ComboboxItem) {
        setDay(e!);
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    function handleSearchByTeacher(e: React.ChangeEvent<HTMLInputElement>) {
        setTeacherName(e.target.value)
    }

    return (
        <div>
            <Flex gap={4} justify={'center'} className={"mt-2 px-5"}>
                <Input onChange={handleSearchChange} placeholder={"Tìm kiếm"}/>
                <Input onChange={handleSearchByTeacher} placeholder={"Tên giáo viên"}/>
                <Select className={''} defaultValue={"Tất cả"} onChange={handleTypeChange}
                        data={["Tất cả", "Lý thuyết", "Thực hành"]}
                        placeholder={"Chọn loại"}/>
                <Select className={''} defaultValue={"Tất cả các ngày"} onChange={handleDayChange}
                        data={["Tất cả các ngày", "T2", "T3", "T4", "T5", "T6", "T7", "CN"]}
                        placeholder={"Chọn ngày"}/>
            </Flex>
        </div>
    );
};

export default FilterBar;