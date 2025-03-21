import React from 'react';
import {ComboboxItem, Flex, Input, Select} from "@mantine/core";
import {useDispatch} from "react-redux";
import {filterSlice} from '@/lib/state/filter';

const FilterBar = () => {
    const dispatch = useDispatch();
    const actions = filterSlice.actions

    function handleTypeChange(e: string | null, _: ComboboxItem) {
        dispatch(actions.setClassType(e))
    }

    function handleDayChange(e: string | null, _: ComboboxItem) {
        dispatch(actions.setWeekDay(e))
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(actions.setClassName(e.target.value))
    }

    function handleSearchByTeacher(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(actions.setTeacherName(e.target.value))
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