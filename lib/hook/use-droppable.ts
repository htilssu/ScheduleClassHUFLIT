"use client";

import { useDndContext } from "@/lib/hook/use-dnd-context";

import { useCallback, useEffect, useRef } from "react";
import { ClassData } from "@/lib/types";

export function useDroppable({
  setDroppedData,
}: {
  setDroppedData: (data: ClassData) => void;
}) {
  const dndContext = useDndContext();
  const ref = useRef<HTMLElement>({} as HTMLElement);
  if (!dndContext) throw new Error("This hook must call inside DndContext");

  function setNodeRef(node: HTMLElement | null) {
    if (!node) return;
    ref.current = node;
  }

  useEffect(() => {
    dndContext.setContextValue((prevState) => ({
      ...prevState,
      droppableList: [...prevState.droppableList, { ref, setDroppedData }],
    }));
  }, []);

  const handleMouseUp = useCallback(
    function (e: MouseEvent) {
      if (dndContext.refData.current.data === null) return;
      const refBound = ref.current.getBoundingClientRect();
      if (
        e.clientX >= refBound.left &&
        e.clientX <= refBound.right &&
        e.clientY > refBound.top &&
        e.clientY <= refBound.bottom
      ) {
        setDroppedData(dndContext.refData.current.data);
      }
    },
    [dndContext.refData]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp, {
      capture: true,
    });

    return () => {
      document.removeEventListener("mouseup", handleMouseUp, {
        capture: true,
      });
    };
  }, [handleMouseUp]);

  return {
    data: dndContext.data,
    isDragging: dndContext.refData.current.data !== null,
    setNodeRef,
    draggingData: dndContext.refData.current.data !== null,
  };
}
