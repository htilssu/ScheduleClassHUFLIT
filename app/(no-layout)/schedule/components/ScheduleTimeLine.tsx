"use client";

import { useDroppable } from "@/lib/hook/use-droppable";
import { RootState } from "@/lib/state";
import { timeLineSlice, TimeLineState } from "@/lib/state/timeline";
import { ClassData } from "@/lib/types";
import { Alert } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConflictModal from "./ConflictModal";
import TimeLine from "./TimeLine";

function ScheduleTimeLine() {
  const { classes } = useSelector<RootState, TimeLineState>(
    (state) => state.timeline
  );
  const dispatch = useDispatch();
  const actions = timeLineSlice.actions;

  // State cho modal xác nhận
  const [modalOpened, setModalOpened] = useState(false);
  const [conflictingClass, setConflictingClass] = useState<ClassData | null>(
    null
  );
  const [newClass, setNewClass] = useState<ClassData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State để theo dõi xem đã có thay đổi trạng thái chưa
  const [hasCheckedForConflicts, setHasCheckedForConflicts] = useState(false);

  // Hàm xử lý dữ liệu thời gian đề phòng lỗi định dạng
  const parseTimeSection = useCallback(
    (timeStr: string): [number, number] | null => {
      try {
        // Xử lý nhiều định dạng khác nhau
        const cleanedTimeStr = timeStr.replace(/\s+/g, ""); // Loại bỏ tất cả khoảng trắng

        // Trường hợp có dấu -
        if (cleanedTimeStr.includes("-")) {
          const parts = cleanedTimeStr
            .split("-")
            .map((s) => parseInt(s.trim(), 10));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return [parts[0], parts[1]];
          }
        }

        // Trường hợp có dấu đến
        if (cleanedTimeStr.includes("đến")) {
          const parts = cleanedTimeStr
            .split("đến")
            .map((s) => parseInt(s.trim(), 10));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return [parts[0], parts[1]];
          }
        }

        // Nếu là một số duy nhất (giả sử là một tiết)
        const singleValue = parseInt(cleanedTimeStr, 10);
        if (!isNaN(singleValue)) {
          return [singleValue, singleValue + 1]; // Giả sử kéo dài 1 tiết
        }

        return null;
      } catch (e) {
        console.error("Error parsing time:", timeStr, e);
        return null;
      }
    },
    []
  );

  // Hàm kiểm tra trùng lịch
  const checkScheduleConflict = useCallback(
    (newClass: ClassData): ClassData | null => {
      if (!newClass.learningSection || newClass.learningSection.length === 0) {
        setErrorMessage("Lớp học không có thông tin lịch học");
        return null;
      }
      console.log("Checking conflict for:", newClass);
      console.log("Current classes:", classes.length);

      for (const existingClass of classes) {
        // Bỏ qua nếu đang so sánh với chính mình
        if (existingClass.id === newClass.id) {
          console.log("Skipping same class", existingClass.id);
          continue;
        }

        if (
          !existingClass.learningSection ||
          existingClass.learningSection.length === 0
        ) {
          console.error(
            "Missing learningSection in existingClass:",
            existingClass
          );
          continue;
        }

        console.log(
          `Comparing with class ${existingClass.id} - ${existingClass.Subject.name}`
        );

        // Kiểm tra từng buổi học của lớp mới
        for (const newSection of newClass.learningSection) {
          if (!newSection.weekDay || !newSection.time) {
            console.error("Invalid newSection:", newSection);
            continue;
          }

          // Kiểm tra từng buổi học của lớp hiện có
          for (const existingSection of existingClass.learningSection) {
            if (!existingSection.weekDay || !existingSection.time) {
              console.error("Invalid existingSection:", existingSection);
              continue;
            }

            // Chỉ kiểm tra nếu cùng thứ trong tuần
            if (newSection.weekDay === existingSection.weekDay) {
              console.log(`Same day found: Thứ ${newSection.weekDay}`);

              // Phân tích thời gian
              const newTimeParsed = parseTimeSection(newSection.time);
              const existingTimeParsed = parseTimeSection(existingSection.time);

              if (!newTimeParsed || !existingTimeParsed) {
                console.error("Could not parse time sections:", {
                  newTime: newSection.time,
                  existingTime: existingSection.time,
                  newParsed: newTimeParsed,
                  existingParsed: existingTimeParsed,
                });
                continue;
              }

              const [newStart, newEnd] = newTimeParsed;
              const [existingStart, existingEnd] = existingTimeParsed;

              console.log("Time ranges:", {
                newTime: `${newStart}-${newEnd}`,
                existingTime: `${existingStart}-${existingEnd}`,
              });

              // Kiểm tra xung đột thời gian:
              // 1. Tiết bắt đầu của lớp mới nằm trong khoảng thời gian của lớp hiện có
              // 2. Tiết kết thúc của lớp mới nằm trong khoảng thời gian của lớp hiện có
              // 3. Lớp mới bao trùm lớp hiện có
              const hasConflict =
                (newStart >= existingStart && newStart < existingEnd) || // Tiết bắt đầu của lớp mới nằm trong lớp hiện có
                (newEnd > existingStart && newEnd <= existingEnd) || // Tiết kết thúc của lớp mới nằm trong lớp hiện có
                (newStart <= existingStart && newEnd >= existingEnd); // Lớp mới bao trùm lớp hiện có

              if (hasConflict) {
                console.log(
                  `Conflict detected! Class ${existingClass.id} (${existingClass.Subject.name}) conflicts with new class at day ${newSection.weekDay}, time ${newSection.time}`
                );
                return existingClass;
              } else {
                console.log(
                  `No conflict on day ${newSection.weekDay} between time ${newSection.time} and ${existingSection.time}`
                );
              }
            }
          }
        }
      }
      console.log("No conflict found after checking all classes");
      return null;
    },
    [classes, parseTimeSection, setErrorMessage]
  );

  // Sử dụng useCallback để tạo version mới của handleAddClass khi dependencies thay đổi
  const handleAddClass = useCallback(
    (classData: ClassData) => {
      setErrorMessage(null);
      console.log("Classes length in handleAddClass:", classes.length);

      // Kiểm tra cấu trúc lớp
      if (!classData.id) {
        console.error("Class missing ID:", classData);
        setErrorMessage("Lớp học thiếu ID");
        return;
      }

      if (!classData.Subject || !classData.Subject.name) {
        console.error("Class missing Subject data:", classData);
        setErrorMessage("Lớp học thiếu thông tin môn học");
        return;
      }

      if (
        !classData.learningSection ||
        !Array.isArray(classData.learningSection) ||
        classData.learningSection.length === 0
      ) {
        console.error("Class missing learningSection data:", classData);
        setErrorMessage("Lớp học thiếu thông tin lịch học");
        return;
      }

      // Kiểm tra tất cả các buổi học có định dạng thời gian hợp lệ không
      const invalidSections = classData.learningSection.filter(
        (section) =>
          !section.weekDay || !section.time || !parseTimeSection(section.time)
      );

      if (invalidSections.length > 0) {
        console.error("Class has invalid time sections:", invalidSections);
        setErrorMessage("Lớp học có lịch học không hợp lệ");
        return;
      }

      const conflict = checkScheduleConflict(classData);
      if (conflict) {
        console.log("Conflict detected, showing modal");
        setConflictingClass(conflict);
        setNewClass(classData);
        setModalOpened(true);
        setHasCheckedForConflicts(true);
      } else if (errorMessage) {
        console.log("Error detected:", errorMessage);
        // Đã có lỗi được hiển thị, không làm gì thêm
      } else {
        console.log("No conflict, adding class directly");
        dispatch(actions.addClass(classData));
      }
    },
    [
      classes,
      checkScheduleConflict,
      dispatch,
      actions,
      errorMessage,
      parseTimeSection,
      setErrorMessage,
      setConflictingClass,
      setNewClass,
      setModalOpened,
      setHasCheckedForConflicts,
    ]
  );

  // Lưu trữ hàm handleAddClass mới nhất vào một ref để có thể cập nhật cho useDroppable
  const handleAddClassRef = useRef(handleAddClass);

  // Cập nhật ref mỗi khi hàm thay đổi
  useEffect(() => {
    handleAddClassRef.current = handleAddClass;
  }, [handleAddClass]);

  // Wrapper function để truyền vào useDroppable, luôn gọi version mới nhất của handleAddClass
  const handleDroppedData = useCallback((data: ClassData) => {
    handleAddClassRef.current(data);
  }, []);

  // Sử dụng wrapper function với useDroppable
  const { setNodeRef } = useDroppable({ setDroppedData: handleDroppedData });

  // Kiểm tra nếu đã có cập nhật trạng thái nhưng modal không mở
  useEffect(() => {
    if (
      hasCheckedForConflicts &&
      !modalOpened &&
      conflictingClass &&
      newClass
    ) {
      console.log("Modal should be open but isn't. Re-opening...");
      console.log("Current state:", {
        hasCheckedForConflicts,
        modalOpened,
        conflictingClass: conflictingClass?.id,
        newClass: newClass?.id,
      });
      setModalOpened(true);
    }
  }, [hasCheckedForConflicts, modalOpened, conflictingClass, newClass]);

  // Logging changes to modal state
  useEffect(() => {
    console.log(`Modal state changed: ${modalOpened ? "opened" : "closed"}`);
  }, [modalOpened]);

  useEffect(() => {
    console.log(
      `Conflict class state changed: ${
        conflictingClass ? conflictingClass.id : "none"
      }`
    );
  }, [conflictingClass]);

  useEffect(() => {
    console.log(`New class state changed: ${newClass ? newClass.id : "none"}`);
  }, [newClass]);

  const handleReplaceClass = useCallback(() => {
    console.log("Replacing class");
    if (newClass && conflictingClass) {
      dispatch(actions.removeClass({ id: conflictingClass.id }));
      dispatch(actions.addClass(newClass));
      setModalOpened(false);
      setHasCheckedForConflicts(false);
      setConflictingClass(null);
      setNewClass(null);
    }
  }, [newClass, conflictingClass, dispatch, actions]);

  const handleCancelReplace = useCallback(() => {
    setModalOpened(false);
    setHasCheckedForConflicts(false);
    setConflictingClass(null);
    setNewClass(null);
  }, []);

  const handleRemoveClass = useCallback(
    (classId: string) => {
      dispatch(actions.removeClass({ id: classId }));
    },
    [dispatch, actions]
  );

  return (
    <>
      <div ref={setNodeRef} className={"w-full hover:cursor-grabbing ml-2"}>
        {errorMessage && (
          <Alert
            color="red"
            title="Lỗi"
            className="mb-4"
            withCloseButton
            onClose={() => setErrorMessage(null)}
          >
            {errorMessage}
          </Alert>
        )}
        <TimeLine classes={classes} removeClass={handleRemoveClass} />
      </div>

      <ConflictModal
        opened={modalOpened}
        onClose={handleCancelReplace}
        onReplace={handleReplaceClass}
        conflictingClass={conflictingClass}
        newClass={newClass}
      />
    </>
  );
}

export default ScheduleTimeLine;
