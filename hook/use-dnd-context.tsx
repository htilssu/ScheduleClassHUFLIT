'use client'

import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    RefObject,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import {debug} from "@/lib/utils/logging.util";

interface Droppable {
    ref: RefObject<HTMLElement>;
    setDroppedData: Dispatch<SetStateAction<any>>;
}

interface DndContext {
    data: any;
    setContextValue: Dispatch<SetStateAction<DndContext>>;
    droppableList: Droppable[];
    onDragEnd: (() => void) | DroppedCallback | null;
    dataRef: { current: { data: any, refDragging: RefObject<HTMLElement> | null } };
}

type DroppedCallback = (dropped: any) => void;

interface DndContextProps {
    children?: ReactNode;
    onDragEnd: (() => void) | DroppedCallback | null;
}

const Context = createContext<DndContext>({} as DndContext);
export const useDndContext = () => useContext(Context);
export const DndContext: FC<DndContextProps> = props => {
    debug("DndContext render")
    const [contextValue, setContextValue] = useState<DndContext>({
        data: null,
        droppableList: [],
        setContextValue: () => {
        },
        onDragEnd: () => {
        },
        dataRef: {current: {data: null, refDragging: null}}
    } as DndContext)

    const refData = useRef({
        data: null,
        refDragging: {
            current: null
        }
    });

    const ref = useRef<HTMLDivElement>(null);


    const handleMouseMove = useCallback(function (e: MouseEvent) {
        if (!ref.current) return;
        const clientRect = ref.current.getBoundingClientRect();
        const x = clientRect.x
        const y = clientRect.y

        const refDragging: HTMLElement = refData.current.refDragging?.current!;

        if (refDragging) {
            const refDraggingBound = refDragging.getBoundingClientRect();
            const refDraggingWidth = refDraggingBound?.width
            const refDraggingHeight = refDraggingBound?.height
            refDragging.style.transform = `translate(${e.clientX - x - refDraggingWidth / 2}px,${e.clientY - y - refDraggingHeight / 2}px)`
        }

    }, []);


    useEffect(() => {

        ref.current?.addEventListener("mousemove", handleMouseMove)


        return () => {
            ref.current?.removeEventListener("mousemove", handleMouseMove)
        }
    }, [handleMouseMove]);


    return (
        <Context.Provider value={{...contextValue, setContextValue, dataRef: refData, onDragEnd: props.onDragEnd}}>
            <div ref={ref} className={'relative z-10'}>
                {props.children}
            </div>
        </Context.Provider>
    );
};