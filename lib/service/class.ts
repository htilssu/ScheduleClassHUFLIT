import { Class } from "@prisma/client";
import { ClassData } from "../types";
import prisma from "../prisma";

/**
 * Save scheduled classes to local storage.
 * @param classes Array of classes to save.
 */
export function saveClassToLocal(classes: Class[]) {
  localStorage.setItem("classes", JSON.stringify(classes));
}

/**
 * Load scheduled classes from local storage.
 */
export function loadClassFromLocal(): ClassData[] {
  if (typeof window !== "undefined") {
    const classes = localStorage.getItem("classes");
    if (classes) {
      return JSON.parse(classes);
    }
  }

  return [];
}

/**
 * Interface định nghĩa các tham số tìm kiếm cho lớp học
 */
interface GetClassesParams {
  /**
   * Năm học cần tìm
   */
  yearStudyId?: string;

  /**
   * Học kỳ cần tìm
   */
  semesterId?: string;

  /**
   * Mã lớp học
   */
  classId?: string;

  /**
   * Tên hoặc một phần tên của giảng viên
   */
  lecturerName?: string;

  /**
   * Tên hoặc một phần tên của môn học
   */
  subjectName?: string;

  /**
   * Giới hạn số lượng kết quả trả về
   * @default 50
   */
  limit?: number;
}

/**
 * Lấy thông tin các lớp học dựa trên các tiêu chí tìm kiếm
 *
 * @param params Tham số tìm kiếm
 * @returns Danh sách các lớp học thỏa mãn điều kiện tìm kiếm
 */
export async function getClassesByFilter(
  params: GetClassesParams
): Promise<ClassData[]> {
  const {
    yearStudyId,
    semesterId,
    classId,
    lecturerName,
    subjectName,
    limit = 50,
  } = params;

  return await prisma.class.findMany({
    where: {
      // Lọc theo năm học và học kỳ
      ...(yearStudyId && {
        yearStudyId,
      }),
      ...(semesterId && {
        semesterId,
      }),

      // Lọc theo mã lớp học
      ...(classId && {
        classId: {
          contains: classId,
        },
      }),

      // Lọc theo tên giảng viên
      ...(lecturerName && {
        Lecturer: {
          name: {
            contains: lecturerName,
            mode: "insensitive",
          },
        },
      }),

      // Lọc theo tên môn học
      ...(subjectName && {
        Subject: {
          name: {
            contains: subjectName,
            mode: "insensitive",
          },
        },
      }),
    },
    include: {
      Subject: true,
      Lecturer: true,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
}
