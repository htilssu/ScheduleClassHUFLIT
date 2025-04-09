import { Prisma } from "@prisma/client";

/**
 * Type biểu diễn dữ liệu của một lớp học với các thông tin liên quan
 * Bao gồm thông tin về môn học và giảng viên
 */
export type ClassData = Prisma.ClassGetPayload<{
  include: {
    /**
     * Thông tin về môn học
     */
    Subject: true;

    /**
     * Thông tin về giảng viên
     */
    Lecturer: true;
  };
}>;
