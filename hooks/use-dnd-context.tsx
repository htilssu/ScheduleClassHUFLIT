import {
    createContext,
    Dispatch,
    FC,
    MutableRefObject,
    ReactNode,
    RefObject,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

interface Droppable {
    ref: RefObject<HTMLElement>;
    setDroppedData: Dispatch<SetStateAction<any>>;
}

interface DndContext {
    data: any;
    setRefDragging: (ref: RefObject<HTMLElement>) => void;
    refDragging: MutableRefObject<HTMLElement> | null;
    setContextValue: Dispatch<SetStateAction<DndContext>>;
    droppableList: Droppable[];
    droppedData: any;
}

type DroppedCallback = (dropped: any) => void;

interface DndContextProps {
    children?: ReactNode;
    onDragEnd?: (() => void) | DroppedCallback;
}

const Context = createContext<DndContext>({} as DndContext);
export const useDndContext = () => useContext(Context);
export const DndContext: FC<DndContextProps> = props => {
    const [contextValue, setContextValue] = useState<DndContext>({
        data: null,
        setRefDragging: () => {
        },
        droppedData: null,
        refDragging: null,
        droppableList: [],
        setContextValue: () => {
        }
    } as DndContext)

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.onDragEnd?.(contextValue.droppedData)
        setContextValue(prevState => ({...prevState, droppedData: null}))
    }, [contextValue.droppedData, props.onDragEnd]);

    const handleMouseMove = useCallback(function (e: MouseEvent) {
        if (!ref.current) return;
        const clientRect = ref.current.getBoundingClientRect();
        const x = clientRect.x
        const y = clientRect.y

        const refDragging = contextValue.refDragging;


        if (refDragging) {
            const refDraggingBound = refDragging?.current.getBoundingClientRect()!;
            const refDraggingWidth = refDraggingBound?.width
            const refDraggingHeight = refDraggingBound?.height
            refDragging.current.style.transform = `translate(${e.clientX - x - refDraggingWidth / 2}px,${e.clientY - y - refDraggingHeight / 2}px)`
        }

    }, [contextValue.refDragging]);


    useEffect(() => {
        if (contextValue.refDragging == null) return;

        ref.current?.addEventListener("mousemove", handleMouseMove)


        return () => {
            ref.current?.removeEventListener("mousemove", handleMouseMove)
        }
    }, [contextValue.refDragging, ref.current]);


    return (
        <Context.Provider value={{...contextValue, setContextValue}}>
            <div ref={ref} className={'relative z-10'}>
                {props.children}
            </div>
        </Context.Provider>
    );
};