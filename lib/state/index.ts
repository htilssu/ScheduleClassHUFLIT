import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "@/lib/state/filter";
import {timeLineSlice} from "@/lib/state/timeline";
import {userSlice} from "@/lib/state/user";

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        timeline: timeLineSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export * from './timeline'
export * from './filter'
export * from './user'