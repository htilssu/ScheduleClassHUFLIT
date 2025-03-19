import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "@/lib/state/filter";

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']