'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import ClassCard from "@/components/ClassCard";
import {ClassRoot} from '@/lib/model/Class';
import {useSelector} from "react-redux";
import {RootState} from "@/lib/state";
import {ClassFilter} from "@/lib/state/filter";

interface SelectSectionProps {
    classes: ClassRoot[]
}

function SelectSection({classes}: Readonly<SelectSectionProps>) {
    const filter = useSelector<RootState, ClassFilter>(state => state.filter);

    const [limit, setLimit] = useState(100)
    const [searchList, setSearchList] = useState<ClassRoot[]>([...classes])

    const debouncedSearch = useCallback(() => debounce(
            () => {
                setSearchList(
                    classes.filter((classSection) => {
                        const matchesSubject = filter.className === ""
                            || classSection.Subject.name
                                           .toLowerCase()
                                           .includes(
                                               filter.className.toLowerCase());
                        const matchesType =
                            filter.classType === "Tất cả" || classSection.type === filter.classType;
                        const matchesTeacher =
                            filter.teacherName === "" ||
                            classSection.Lecturer.name.toLowerCase().includes(filter.teacherName.toLowerCase());

                        const matchesWeekDay = filter.weekDay === "Tất cả các ngày" || classSection.weekDay.includes(
                            filter.weekDay);

                        return matchesSubject && matchesType && matchesTeacher && matchesWeekDay;
                    })
                );
            },
            500,
            {leading: false, trailing: true}
        ),
        [filter]
    );

    useEffect(() => {
        debouncedSearch()

        return debouncedSearch.cancel
    }, [debouncedSearch]);


    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md z-10"}>
            <div className={"mt-2 overflow-y-auto overflow-x-visible"}>
                {searchList.slice(0, limit).map((value, index) => (
                    <ClassCard key={value.classId} classData={value}/>
                ))}
            </div>
        </div>
    );
}

export default SelectSection;
