import {createSlice} from '@reduxjs/toolkit'


export interface ClassFilterState {
    className: string;
    teacherName: string;
    classType: string;
    weekDay: string;
}

const initialState: ClassFilterState = {
    className: '',
    teacherName: '',
    classType: 'Tất cả',
    weekDay: 'Tất cả các ngày',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setClassName: (state, action) => {
            state.className = action.payload
        },
        setTeacherName: (state, action) => {
            state.teacherName = action.payload
        },
        setClassType: (state, action) => {
            state.classType = action.payload
        },
        setWeekDay: (state, action) => {
            state.weekDay = action.payload
        }
    }
})