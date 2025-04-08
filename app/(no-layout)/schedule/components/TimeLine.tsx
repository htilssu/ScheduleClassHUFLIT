"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { trim } from "lodash";
import { debug } from "@/lib/utils/logging";
import { SortedSet } from "@/lib/SortedSet";
import { TableClassCard } from "./TableCardClass";
import { ClassData } from "@/lib/types";
import { useDndContext } from "@/lib/hook/use-dnd-context";

const MAX_TIME_SECTION = 15;

const defaultMark = [0, 3, 6, 9, 12];
const mm = Array.from({
  length: 7,
}).map(() => new SortedSet<number>(defaultMark));

type TimeLineProps = {
  classes: ClassData[];
  removeClass?: (classId: string) => void;
};

function TimeLine(props: TimeLineProps) {
  debug("TimeLine render");
  const [mergeMark] = useState(mm);
  const [classes, setClasses] = useState(props.classes);
  const dndContext = useDndContext();

  // State để lưu thông tin class đang được drag
  const [dragClassData, setDragClassData] = useState<ClassData | null>(null);

  const handleUpdateMergeSplit = useCallback(
    (classData: ClassData) => {
      classData.learningSection.forEach(({ weekDay, time }) => {
        const [start, end] = time.split("-").map(trim).map(Number);
        const dayOfWeekMarkSplit = mergeMark[Number(weekDay) - 2];

        dayOfWeekMarkSplit.add(start - 1);
        dayOfWeekMarkSplit.add(end);
        for (let i = start; i < end; i++) dayOfWeekMarkSplit.remove(i);
      });
    },
    [mergeMark]
  );

  useEffect(() => {
    console.log("props.classes", props.classes);
    setClasses(() => {
      if (Array.isArray(props.classes)) {
        props.classes.map((value) => handleUpdateMergeSplit(value));
      }
      return props.classes;
    });
  }, [handleUpdateMergeSplit, props.classes]);

  const getRowSpan = useCallback(
    (dayInWeek: number, section: number) => {
      const arr = Array.from(mergeMark[dayInWeek]);
      const indexOfi = arr.indexOf(section);
      if (indexOfi !== -1) {
        if (indexOfi === arr.length - 1) {
          return MAX_TIME_SECTION - section;
        }
        return arr[indexOfi + 1] - section;
      }
      return 1;
    },
    [mergeMark]
  );

  function getTableClassCard(row: number, col: number) {
    const classData = classes?.find((classItem) =>
      classItem.learningSection.some(({ weekDay, time }) => {
        const [start] = time.split("-").map(trim).map(Number);
        return Number(weekDay) - 2 === col && start - 1 === row;
      })
    );

    if (!classData) return null;

    const learningSection = classData.learningSection.find(
      ({ weekDay }) => Number(weekDay) - 2 === col
    )!;

    return (
      <TableClassCard
        onRemoveClass={props.removeClass}
        classData={{ ...classData, learningSection }}
      />
    );
  }

  // Xử lý sự kiện drag từ ClassCard
  useEffect(() => {
    const handleClassCardDrag = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { isDragging, classData } = customEvent.detail;

      if (isDragging && classData) {
        setDragClassData(classData);
      } else {
        setDragClassData(null);
      }
    };

    document.addEventListener("class-card-drag", handleClassCardDrag);
    return () => {
      document.removeEventListener("class-card-drag", handleClassCardDrag);
    };
  }, []);

  // Kiểm tra xem một ô có cần được highlight do drag không
  const shouldHighlightCellOnDrag = useCallback(
    (row: number, col: number) => {
      if (!dragClassData) return false;

      return dragClassData.learningSection.some((section) => {
        const weekDay = Number(section.weekDay) - 2;
        if (weekDay !== col) return false;

        const [start, end] = section.time.split("-").map(trim).map(Number);
        return row >= start - 1 && row < end;
      });
    },
    [dragClassData]
  );

  // Tạo placeholder component cho cell đang hover
  const PlaceholderCell = ({ classData }: { classData: ClassData }) => {
    if (!classData) return null;

    const badgeColor = classData.type === "Lý thuyết" ? "blue" : "green";

    return (
      <div className="w-full h-full flex flex-col justify-between opacity-90 pointer-events-none select-none p-1 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold text-blue-700 truncate border-b border-blue-100 pb-1">
            {classData.Subject.name}
          </div>
          <div className="text-xs text-indigo-600 font-medium flex items-center gap-1 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {classData.Lecturer.name}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                {classData.learningSection[0].time}
              </div>
            </div>
            <div
              className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${
                badgeColor === "blue"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {classData.type}
            </div>
          </div>

          <div className="bg-blue-500 text-white text-center text-xs py-1 px-2 rounded-md font-medium mt-1 shadow-sm animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 inline mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Thả để thêm vào lịch
          </div>
        </div>
      </div>
    );
  };

  // Thêm style keyframes cho animation hiệu ứng viền
  useEffect(() => {
    // Chỉ thêm style nếu chưa tồn tại
    if (!document.getElementById("highlight-cell-animation")) {
      const style = document.createElement("style");
      style.id = "highlight-cell-animation";
      style.innerHTML = `
        @keyframes highlight-pulse {
          0% { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.8); }
          100% { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes highlight-outline-pulse {
          0% { outline-color: rgba(59, 130, 246, 0.5); }
          50% { outline-color: rgba(59, 130, 246, 0.8); }
          100% { outline-color: rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes bg-pulse {
          0% { background-color: rgba(219, 234, 254, 0.3); }
          50% { background-color: rgba(219, 234, 254, 0.5); }
          100% { background-color: rgba(219, 234, 254, 0.3); }
        }
        
        .highlight-pulse {
          animation: highlight-pulse 1.5s infinite, bg-pulse 1.5s infinite;
          outline: none;
          position: relative;
          z-index: 1;
        }
        
        .highlight-outline-pulse {
          animation: highlight-outline-pulse 1.5s infinite;
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: -2px;
          position: relative;
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="w-full">
      <Table className={"border-[1px] border-gray-400"}>
        <Table.Thead className={"bg-amber-50"}>
          <Table.Tr>
            <Table.Th className={"text-center! border-[1px] border-gray-400"}>
              Tiết
            </Table.Th>
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <Table.Th
                key={i}
                className={"text-center! border-[1px] border-gray-400"}
              >
                Thứ {i + 2}
              </Table.Th>
            ))}
            <Table.Th className={"text-center! border-[1px] border-gray-400"}>
              CN
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: MAX_TIME_SECTION }, (_, i) => i).map((i) => (
            <Table.Tr key={i}>
              <Table.Td
                className={
                  "text-center! bg-rose-50 border-[1px] border-gray-400"
                }
              >
                {i + 1}
              </Table.Td>
              {Array.from({ length: 7 }, (_, j) => j).map(
                (j) =>
                  mergeMark[j].has(i) && (
                    <Table.Td
                      key={j}
                      rowSpan={getRowSpan(j, i)}
                      data-row={i}
                      data-col={j}
                      className={`timeline-cell p-2! text-center border-[1px] border-gray-400 max-w-32`}
                    >
                      <div className={"w-full h-full"}>
                        {getTableClassCard(i, j) ||
                          // Hiển thị placeholder ở các ô tương ứng với lớp học đang kéo
                          (shouldHighlightCellOnDrag(i, j) &&
                          dndContext.refData.current.data ? (
                            <PlaceholderCell
                              classData={dndContext.refData.current.data}
                            />
                          ) : null)}
                      </div>
                    </Table.Td>
                  )
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default TimeLine;
