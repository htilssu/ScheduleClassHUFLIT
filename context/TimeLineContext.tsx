import {ClassRoot} from "@/lib/model/Class";
import {createContext, useContext} from "react";

export interface TimeLineContextType {
    classList?: ClassRoot[],
    setClassList?: (value: ClassRoot[]) => void,
    selectedClass?: ClassRoot[],
    setSelectedClass?: (value: ClassRoot[]) => void,
}

const TimeLineContext = createContext<TimeLineContextType>({});
export const useTimeLineContext = () => useContext(TimeLineContext);
export const TimeLineContextProvider = TimeLineContext.Provider;