import {createSlice} from "@reduxjs/toolkit";

export type LoadingState = {
    loading: boolean
    loadingText: string
}


export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false,
        loadingText: "",
    } as LoadingState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoadingText: (state, action) => {
            state.loadingText = action.payload;
        },
    }
})