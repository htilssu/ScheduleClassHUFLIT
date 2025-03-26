import {createSlice} from "@reduxjs/toolkit";
import {ClassData} from "../types";
import {loadClassFromLocal, saveClassToLocal} from "@/lib/service/class";

export type TimeLineState = {
    classes: ClassData[]
}

export const initialState: TimeLineState = {
    classes: loadClassFromLocal()
}

export const timeLineSlice = createSlice({
    name: "timeline",
    initialState: initialState,
    reducers: {
        resetTimeLine: (state, action) => {
            console.log("reset timeline")
            state.classes = []
            saveClassToLocal(state.classes)
        },
        addClass: (state, action) => {
            state.classes = [...state.classes, action.payload]
            saveClassToLocal(state.classes)
        },
        removeClass: (state, action) => {
            state.classes = state.classes.filter((item) => item.id !== action.payload.id)
            saveClassToLocal(state.classes)
        },
    }
})