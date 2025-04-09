import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassData } from "../types";

export type TimeLineState = {
  classes: ClassData[];
};

const initialState = (): TimeLineState => {
  return {
    classes: [],
  };
};

export const timeLineSlice = createSlice({
  name: "timeLine",
  initialState: initialState,
  reducers: {
    resetTimeLine: (state) => {
      state.classes = [];
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
    },
    removeClass: (state, action: PayloadAction<string>) => {
      state.classes = state.classes.filter((c) => c.id !== action.payload);
    },
    setClasses: (state, action: PayloadAction<ClassData[]>) => {
      state.classes = action.payload;
    },
  },
});
