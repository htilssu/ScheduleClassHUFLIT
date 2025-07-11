"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import ClassCard from "@/app/(no-layout)/schedule/components/ClassCard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/state";
import { ClassFilterState } from "@/lib/state/filter";
import { ClassData } from "@/lib/types";

interface SelectSectionProps {
  classes: ClassData[];
}

function SelectSection({ classes }: Readonly<SelectSectionProps>) {
  const filter = useSelector<RootState, ClassFilterState>(
    (state) => state.filter
  );

  const [limit, setLimit] = useState(100);
  const [searchList, setSearchList] = useState<ClassData[]>([...classes]);

  // Hàm lọc chính
  const filterClasses = useCallback(() => {
    return classes.filter((classSection) => {
      const matchesSubject =
        filter.className === "" ||
        classSection.Subject.name.toLowerCase().includes(filter.className);
      const matchesType =
        filter.classType === "Tất cả" || classSection.type === filter.classType;
      const matchesTeacher =
        filter.teacherName === "" ||
        classSection.Lecturer.name.toLowerCase().includes(filter.teacherName);
      const matchesWeekDay =
        filter.weekDay === "Tất cả các ngày" ||
        classSection.learningSection.some(
          (value) => value.weekDay === filter.weekDay[1]
        );

      return matchesSubject && matchesType && matchesTeacher && matchesWeekDay;
    });
  }, [classes, filter]);

  const debouncedSetSearchList = useCallback(
    // eslint-disable-next-line react-compiler/react-compiler
    debounce(
      (filteredList: ClassData[]) => {
        setSearchList(filteredList);
      },
      500,
      { leading: false, trailing: true }
    ),
    []
  );

  const filteredClasses = useMemo(() => filterClasses(), [filterClasses]);

  useEffect(() => {
    debouncedSetSearchList(filteredClasses);
    return () => debouncedSetSearchList.cancel();
  }, [filteredClasses, debouncedSetSearchList]);

  const ClassCardMemo = memo(function ClassCardMemo({
    classData,
  }: {
    classData: ClassData;
  }) {
    return <ClassCard classData={classData} />;
  });

  return (
    <div className={"w-full flex p-2 bg-gray-100 rounded-md z-10"}>
      <div
        className={
          "mt-2 h-screen flex-shrink-0 w-full overflow-y-auto overflow-x-visible"
        }
      >
        {searchList.slice(0, limit).map((value, index) => (
          <ClassCardMemo key={index} classData={value} />
        ))}
      </div>
    </div>
  );
}

export default SelectSection;
