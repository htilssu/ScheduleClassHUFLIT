import {useDndContext} from "@/hook/use-dnd-context";
import {useCallback, useEffect, useRef, useState} from "react";

export function useDroppable() {
    const dndContext = useDndContext();
    const ref = useRef<HTMLElement>({} as HTMLElement);
    const [droppedData, setDroppedData] = useState<any>()
    if (!dndContext) throw new Error("This hook must call inside DndContext")

    function setNodeRef(node: HTMLElement | null) {
        if (!node) return;
        ref.current = node;
    }

    useEffect(() => {
        dndContext.setContextValue(
            (prevState) =>
                ({...prevState, droppableList: [...prevState.droppableList, {ref, setDroppedData}]}));
    }, []);

    const handleMouseUp = useCallback(function (e: MouseEvent) {
        if (dndContext.dataRef.current.data === null) return;
        const refBound = ref.current.getBoundingClientRect();
        if (e.clientX >= refBound.left && e.clientX <= refBound.right
            && e.clientY > refBound.top && e.clientY <= refBound.bottom) {
            setDroppedData(dndContext.dataRef.current.data)
            if (typeof dndContext.onDragEnd === "function") {
                dndContext.onDragEnd(dndContext.dataRef.current.data)
            }
        }
    }, []);

    useEffect(() => {
            document.addEventListener('mouseup', handleMouseUp, {
                capture: true
            })

        return () => {
            document.removeEventListener('mouseup', handleMouseUp, {
                capture: true
            })
        }
    }, [handleMouseUp]);


    useEffect(() => {
        if (dndContext.refDragging !== null) {
            setDroppedData(null)
        }
    }, [dndContext.refDragging]);

    return {
        data: dndContext.data,
        isDragging: dndContext.dataRef.current.data !== null,
        setNodeRef,
        droppedData: droppedData
    }
}


