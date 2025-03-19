import {createSlice} from '@reduxjs/toolkit'


export interface ClassFilter {
    className: string;
    teacherName: string;
    classType: string;
    weekDay: string;
}

const initialState: ClassFilter = {
    className: '',
    teacherName: '',
    classType: 'Tất cả',
    weekDay: '',
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

export const {setTeacherName, setClassName, setClassType, setWeekDay} = filterSlice.actions

export default filterSlice.reducer