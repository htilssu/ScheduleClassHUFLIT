import {Prisma} from "@prisma/client";

export interface WeekResponse {
    Week: number
    DisPlayWeek: number
    WeekOfYear: number
}

export type ClassData = Prisma.ClassGetPayload<{
    include: {
        Subject: true,
        Lecturer: true,
    }
}>

export type AuthenticateErrorCode = "invalid_credentials" | "user_not_found" | "user_disabled" | "too_many_requests"
                                    | "unexpected_error" | "email_not_verified" | "email_already_exists"
                                    | "username_already_exists" | "password_too_weak" | "invalid_password"
                                    | "invalid_email" | "invalid_username" | "invalid_phone_number" | "invalid_code"
                                    | "invalid_token" | "expired_token"