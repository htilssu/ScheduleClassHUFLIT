"use client";

import { AppDispatch, RootState } from "@/lib/state";
import {
  fetchUserData,
  setUserError,
  setUserLoading,
  setUserSuccess,
  UserState,
} from "@/lib/state/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook tùy chỉnh để fetch và quản lý dữ liệu người dùng
 * @returns state user từ Redux store
 */
export function useUser() {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector<RootState, UserState>((state) => state.user);

  useEffect(() => {
    if (userState.data === undefined && !userState.loading) {
      const fetchUser = async () => {
        try {
          dispatch(setUserLoading());
          const userData = await fetchUserData();

          if (userData) {
            dispatch(setUserSuccess(userData));
          } else {
            dispatch(setUserError("Không thể lấy thông tin người dùng"));
          }
        } catch (error: any) {
          dispatch(setUserError(error.message || "Đã xảy ra lỗi"));
        }
      };

      fetchUser();
    }
  }, [dispatch, userState.data, userState.loading]);

  return userState;
}

export default useUser;
