"use client";

import { updateTimeLine } from "@/lib/actions/timeline-actions";
import { useDroppable } from "@/lib/hook/use-droppable";
import { RootState } from "@/lib/state";
import { timeLineSlice, TimeLineState } from "@/lib/state/timeline";
import { ClassData } from "@/lib/types";
import {
  checkScheduleConflict,
  parseTimeSection,
} from "@/lib/utils/schedule-utils";
import { Alert } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TimeLine as TimeLineType } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConflictModal from "./ConflictModal";
import TimeLine from "./TimeLine";

interface ScheduleTimeLineProps {
  timeLine: TimeLineType | null;
}

function ScheduleTimeLine({ timeLine }: ScheduleTimeLineProps) {
  const { classes: reduxClasses } = useSelector<RootState, TimeLineState>(
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
  const isSendRequest = useRef(false);

  // State để theo dõi xem đã có thay đổi trạng thái chưa
  const [hasCheckedForConflicts, setHasCheckedForConflicts] = useState(false);

  // Set classes từ timeline vào redux state khi component mount hoặc timeline thay đổi
  useEffect(() => {
    if (timeLine?.classes) {
      dispatch(actions.setClasses(timeLine.classes as unknown as ClassData[]));
    }
  }, [timeLine, dispatch, actions]);

  // Hàm cập nhật timeline
  const updateTimelineData = useCallback(async () => {
    if (!timeLine || !isSendRequest.current) return;

    try {
      const result = await updateTimeLine({
        id: timeLine.id,
        name: timeLine.name || "",
        description: timeLine.description || undefined,
        classes: reduxClasses,
      });

      if (!result.success) {
        notifications.show({
          title: "Lỗi",
          message: "Không thể cập nhật lịch học. " + (result.error || ""),
          color: "red",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật timeline:", error);
    } finally {
      isSendRequest.current = false;
    }
  }, [reduxClasses, timeLine]);

  // Theo dõi thay đổi redux state để cập nhật timeline
  useEffect(() => {
    if (timeLine) {
      updateTimelineData();
    }
  }, [reduxClasses, updateTimelineData, timeLine]);

  const handleAddClass = useCallback(
    (classData: ClassData) => {
      setErrorMessage(null);

      if (!classData.id) {
        setErrorMessage("Lớp học thiếu ID");
        return;
      }

      if (!classData.Subject || !classData.Subject.name) {
        setErrorMessage("Lớp học thiếu thông tin môn học");
        return;
      }

      if (
        !classData.learningSection ||
        !Array.isArray(classData.learningSection) ||
        classData.learningSection.length === 0
      ) {
        setErrorMessage("Lớp học thiếu thông tin lịch học");
        return;
      }

      const invalidSections = classData.learningSection.filter(
        (section) =>
          !section.weekDay || !section.time || !parseTimeSection(section.time)
      );

      if (invalidSections.length > 0) {
        setErrorMessage("Lớp học có lịch học không hợp lệ");
        return;
      }

      const conflict = checkScheduleConflict(classData, reduxClasses);
      if (conflict) {
        setConflictingClass(conflict);
        setNewClass(classData);
        setModalOpened(true);
        setHasCheckedForConflicts(true);
      } else if (errorMessage) {
        // Đã có lỗi được hiển thị, không làm gì thêm
      } else {
        dispatch(actions.addOrUpdateClass(classData));
        isSendRequest.current = true;
      }
    },
    [reduxClasses, dispatch, actions, errorMessage]
  );

  const handleAddClassRef = useRef(handleAddClass);

  useEffect(() => {
    handleAddClassRef.current = handleAddClass;
  }, [handleAddClass]);

  const handleDroppedData = useCallback((data: ClassData) => {
    handleAddClassRef.current(data);
  }, []);

  const { setNodeRef } = useDroppable({ setDroppedData: handleDroppedData });

  useEffect(() => {
    if (
      hasCheckedForConflicts &&
      !modalOpened &&
      conflictingClass &&
      newClass
    ) {
      setModalOpened(true);
    }
  }, [hasCheckedForConflicts, modalOpened, conflictingClass, newClass]);

  const handleReplaceClass = useCallback(() => {
    if (newClass && conflictingClass) {
      dispatch(actions.removeClass(conflictingClass.id));
      dispatch(actions.addOrUpdateClass(newClass));
      setModalOpened(false);
      setHasCheckedForConflicts(false);
      setConflictingClass(null);
      setNewClass(null);
      isSendRequest.current = true;
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
      dispatch(actions.removeClass(classId));
      isSendRequest.current = true;
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
        <TimeLine classes={reduxClasses} removeClass={handleRemoveClass} />
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
