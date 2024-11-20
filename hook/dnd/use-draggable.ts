import {useEffect, useRef, useState} from "react";
import {useDndContext} from "@/hook/use-dnd-context";

const RefEvent = (data: any) => {
    const ref = useRef<HTMLElement>({} as HTMLElement);
    const [isDragging, setIsDragging] = useState(false);
    const dndContext = useDndContext();


    if (!dndContext) {
        throw new Error("You must call this hook inside DndContext")
    }

    useEffect(() => {
        if (isDragging) {
            ref.current.style.position = 'absolute'
            ref.current.style.top = "0";
            ref.current.style.left = "0";
            ref.current.style.zIndex = '100'
        } else {
            ref.current.style.position = ''
        }
    }, [isDragging]);

    function handeMouseUp(e: MouseEvent) {
        // info("mouse up")
        setIsDragging(false)
        ref.current.style.transform = "none"
        dndContext.dataRef.current.data = null;
        dndContext.dataRef.current.refDragging = null;
    }

    function setNodeRef(target: HTMLElement | null) {
        if (!target) return;
        ref.current = target as HTMLElement;
    }

    function handleMouseDown(e: MouseEvent) {
        // info("mouse down")
        setIsDragging(true)
        // info(data)
        dndContext.dataRef.current.data = data;
        dndContext.dataRef.current.refDragging = ref;
    }


    useEffect(() => {
        ref.current?.addEventListener("mousedown", handleMouseDown)

        if (!isDragging) return () => {
            ref.current?.removeEventListener("mousedown", handleMouseDown)
        };
        document.addEventListener("mouseup", handeMouseUp)

        return () => {
            document.removeEventListener("mouseup", handeMouseUp)
            ref.current?.removeEventListener("mousedown", handleMouseDown)
        }
    }, [ref, isDragging]);

    return {setNodeRef, isDragging};
}

export const useDraggable = (data: any): ReturnType<typeof RefEvent> => {
    return RefEvent(data)
}
