import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export async function fetchUserData() {
  try {
    const response = await fetch("/v1/user");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Không thể lấy thông tin người dùng: ${response.status} ${errorText}`
      );
    }

    const userData = await response.json();

    if (!userData) {
      throw new Error("Dữ liệu người dùng nhận được không hợp lệ");
    }

    return userData;
  } catch (error: any) {
    return null;
  }
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  username: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  role: "DEFAULT_USER" | "PREMIUM_USER" | "ADMIN";
  status?: "active" | "inactive";
  isLocked: boolean;
}

export interface UserState {
  data: User | null | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: undefined,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading: (state) => {
      state.data = null;
      state.loading = true;
      state.error = null;
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    resetUser: (state) => {
      state.data = undefined;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setUserLoading,
  setUserSuccess,
  setUserError,
  clearUser,
  resetUser,
} = userSlice.actions;
