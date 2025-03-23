import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import ClassCard from "@/app/(no-layout)/schedule/components/ClassCard";
import {ClassRoot} from '@/lib/model/Class';
import {useSelector} from "react-redux";
import {RootState} from "@/lib/state";
import {ClassFilter} from "@/lib/state/filter";
import {getClass} from "@/lib/actions/class";

interface SelectSectionProps {
    classes: ClassRoot[]
}

function SelectSection({classes}: Readonly<SelectSectionProps>) {
    const filter = useSelector<RootState, ClassFilter>(state => state.filter);

    const [limit, setLimit] = useState(100)
    const [searchList, setSearchList] = useState<ClassRoot[]>([...classes])

    // Hàm lọc chính
    const filterClasses = useCallback(() => {
        return classes.filter((classSection) => {
            const matchesSubject = filter.className === ""
                || classSection.Subject.name.toLowerCase().includes(filter.className);
            const matchesType = filter.classType === "Tất cả" || classSection.type === filter.classType;
            const matchesTeacher = filter.teacherName === ""
                || classSection.Lecturer.name.toLowerCase().includes(filter.teacherName);
            const matchesWeekDay = filter.weekDay === "Tất cả các ngày"
                || classSection.learningSection.some(value => value.weekDay === filter.weekDay[1]);

            return matchesSubject && matchesType && matchesTeacher && matchesWeekDay;
        });
    }, [classes, filter]);

    const debouncedSetSearchList = useCallback(
        // eslint-disable-next-line react-compiler/react-compiler
        debounce((filteredList: ClassRoot[]) => {
            setSearchList(filteredList);
        }, 500, {leading: false, trailing: true}),
        []
    );

    const filteredClasses = useMemo(() => filterClasses(), [filterClasses]);

    useEffect(() => {
        debouncedSetSearchList(filteredClasses);
        return () => debouncedSetSearchList.cancel();
    }, [filteredClasses, debouncedSetSearchList]);


    return (
        <div className={"w-1/3 max-h-[100vh] flex flex-col p-2 bg-gray-100 rounded-md z-10"}>
            <div className={"mt-2 overflow-y-auto overflow-x-visible"}>
                {searchList.slice(0, limit).map((value, index) => (
                    <ClassCard key={index} classData={value}/>
                ))}
            </div>
        </div>
    );
}

export default SelectSection;
