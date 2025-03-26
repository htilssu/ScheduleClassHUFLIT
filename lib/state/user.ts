import {createSlice} from "@reduxjs/toolkit";

export type UserState = {
                            id: string;
                            name: string;
                            email: string;
                            image: string;
                            role: string;
                        } | null


export const userSlice = createSlice(
    {
        name: "user",
        initialState: null as UserState,
        reducers: {
            setUser: (state, action) => {
                return action.payload;
            },
            clearUser: (state) => {
                return null;
            }
        }
    })