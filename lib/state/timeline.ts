import { createSlice } from "@reduxjs/toolkit";
import { ClassData } from "../types";
import { loadClassFromLocal, saveClassToLocal } from "@/lib/service/class";

export type TimeLineState = {
  classes: ClassData[];
};

const initialState = (): TimeLineState => {
  const classes = loadClassFromLocal();
  return {
    classes: classes,
  };
};

export const timeLineSlice = createSlice({
  name: "timeline",
  initialState: initialState,
  reducers: {
    resetTimeLine: (state) => {
      console.log("reset timeline");
      state.classes = [];
      saveClassToLocal(state.classes);
    },
    addClass: (state, action) => {
      state.classes = [...state.classes, action.payload];
      saveClassToLocal(state.classes);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter(
        (item) => item.id !== action.payload.id
      );
      saveClassToLocal(state.classes);
    },
  },
});
