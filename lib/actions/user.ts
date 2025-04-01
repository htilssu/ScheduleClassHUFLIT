import { prisma } from "../prisma";
import { store } from "@/lib/state";
import { userSlice } from "@/lib/state/user";

function isEmail(username: string) {
  return username.includes("@");
}

export async function getUserFromDb(username: string) {
  if (isEmail(username)) {
    return prisma.user.findUnique({ where: { email: username } });
  } else {
    return prisma.user.findUnique({ where: { username: username } });
  }
}

export async function fetchUserData() {
  try {
    const response = await fetch("/v1/user");

    if (!response.ok) {
      throw new Error("Không thể lấy thông tin người dùng");
    }

    const userData = await response.json();

    // Cập nhật thông tin user vào Redux store
    store.dispatch(userSlice.actions.setUser(userData));

    return userData;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return null;
  }
}
