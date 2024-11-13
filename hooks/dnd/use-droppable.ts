import {useDndContext} from "@/hooks/use-dnd-context";
import {useEffect, useRef, useState} from "react";

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

    function handleMouseUp(e: MouseEvent) {
        const refBound = ref.current.getBoundingClientRect();
        if (e.clientX >= refBound.left && e.clientX <= refBound.right
            && e.clientY > refBound.top && e.clientY <= refBound.bottom) {
            setDroppedData(dndContext.data)
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp, {
            capture: true
        })

        return () => {
            document.removeEventListener('mouseup', handleMouseUp, {
                capture: true
            })
        }
    }, [ref.current, handleMouseUp]);


    useEffect(() => {
        if (dndContext.refDragging !== null) {
            setDroppedData(null)
        }
    }, [dndContext.refDragging]);

    return {
        data: dndContext.data,
        isDragging: dndContext.refDragging !== null && dndContext.refDragging !== undefined,
        setNodeRef,
        droppedData
    }
}


