import { Prisma } from "@prisma/client";

export interface WeekResponse {
  Week: number;
  DisPlayWeek: number;
  WeekOfYear: number;
}

export type ClassData = Prisma.ClassGetPayload<{
  include: {
    Subject: true;
    Lecturer: true;
  };
}>;

export type Role = "admin" | "user" | "student" | "teacher";

/**
 * Mã lỗi xác thực.
 */
export type AuthenticateErrorCode =
  | "user_not_found"
  | "invalid_password"
  | "account_locked"
  | "default";
