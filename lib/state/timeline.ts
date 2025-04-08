import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  name: "timeLine",
  initialState: initialState,
  reducers: {
    resetTimeLine: (state) => {
      console.log("reset timeLine");
      state.classes = [];
      saveClassToLocal(state.classes);
    },
    addOrUpdateClass: (state, action: PayloadAction<ClassData>) => {
      const existingIndex = state.classes.findIndex(
        (c) => c.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Cập nhật lớp học đã tồn tại
        state.classes[existingIndex] = action.payload;
      } else {
        // Thêm mới lớp học vào state
        state.classes.push(action.payload);
      }
      saveClassToLocal(state.classes);
    },
    removeClass: (state, action: PayloadAction<string>) => {
      state.classes = state.classes.filter((c) => c.id !== action.payload);
      saveClassToLocal(state.classes);
    },
    setClasses: (state, action: PayloadAction<ClassData[]>) => {
      state.classes = action.payload;
      saveClassToLocal(state.classes);
    },
  },
});
