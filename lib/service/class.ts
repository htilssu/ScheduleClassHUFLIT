import { Class, Prisma } from "@prisma/client";
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
export interface GetClassesParams {
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
  classId?: string | string[];

  /**
   * Tên hoặc một phần tên của giảng viên
   */
  lecturerName?: string | string[];

  /**
   * Mã môn học
   */
  subjectId?: string | string[];

  /**
   * Tên hoặc một phần tên của môn học
   */
  subjectName?: string | string[];

  /**
   * Buổi học trong ngày (sáng/chiều/tối)
   */
  timeOfDay?: string;

  /**
   * Giới hạn số lượng kết quả trả về
   * @default 50
   */
  limit?: number;

  /**
   * Ngày trong tuần
   */
  learningSection?: {
    weekDay: string[];
  };
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
    learningSection,
    lecturerName,
    subjectName,
    timeOfDay,
  } = params;

  // Xây dựng điều kiện tìm kiếm
  const where: Prisma.ClassWhereInput = {};

  // Thêm các điều kiện nếu có
  if (yearStudyId) where.yearStudyId = yearStudyId;
  if (semesterId) where.semesterId = semesterId;

  // Xử lý classId (có thể là string hoặc mảng string)
  if (classId) {
    if (Array.isArray(classId)) {
      where.classId = { in: classId };
      console.log(`DEBUG: Tìm theo nhiều mã lớp: ${classId.join(", ")}`);
    } else {
      where.classId = classId;
      console.log(`DEBUG: Tìm theo mã lớp: ${classId}`);
    }
  }

  // Xử lý learningSection (thông tin về buổi học)
  if (learningSection) {
    where.learningSection = {
      some: {
        weekDay: { in: learningSection.weekDay },
      },
    };
    console.log(`DEBUG: Tìm theo lịch học: ${JSON.stringify(learningSection)}`);
  }

  // Xử lý điều kiện tìm kiếm cho giảng viên
  if (lecturerName) {
    where.Lecturer = {
      OR: Array.isArray(lecturerName)
        ? lecturerName.map((name) => ({
            name: { contains: name, mode: "insensitive" },
          }))
        : [{ name: { contains: lecturerName, mode: "insensitive" } }],
    };
    console.log(`DEBUG: Tìm theo giảng viên: ${lecturerName}`);
  }

  // Xử lý điều kiện tìm kiếm cho môn học
  if (subjectName) {
    where.Subject = {
      OR: Array.isArray(subjectName)
        ? subjectName.map((name) => ({
            name: { contains: name, mode: "insensitive" },
          }))
        : [{ name: { contains: subjectName, mode: "insensitive" } }],
    };
    console.log(`DEBUG: Tìm theo tên môn học: ${subjectName}`);
  }

  // Xử lý tìm kiếm theo buổi học (sáng/chiều/tối)
  if (timeOfDay) {
    // Xác định các tiết học tương ứng với buổi học
    let timeRange: string[] = [];

    if (timeOfDay.toLowerCase() === "sáng") {
      // Tiết 1-6 (6:45 - 12:00)
      timeRange = ["1-2", "1-3", "2-3", "3-4", "3-5", "4-5", "4-6", "5-6"];
    } else if (timeOfDay.toLowerCase() === "chiều") {
      // Tiết 7-12 (12:45 - 18:00)
      timeRange = [
        "7-8",
        "7-9",
        "8-9",
        "9-10",
        "9-11",
        "10-11",
        "10-12",
        "11-12",
      ];
    } else if (timeOfDay.toLowerCase() === "tối") {
      // Tiết 13-15 (18:00 - 19:30)
      timeRange = ["13-14", "13-15", "14-15"];
    }

    if (timeRange.length > 0) {
      // Thêm điều kiện lọc theo tiết học
      where.learningSection = {
        ...where.learningSection,
        some: {
          ...(where.learningSection?.some || {}),
          time: { in: timeRange },
        },
      };
      console.log(
        `DEBUG: Tìm theo buổi học ${timeOfDay}, các tiết: ${timeRange.join(
          ", "
        )}`
      );
    }
  }

  console.log(
    "DEBUG: Câu truy vấn Prisma:",
    JSON.stringify({ where }, null, 2)
  );

  try {
    const results = await prisma.class.findMany({
      where,
      include: {
        Subject: true,
        Lecturer: true,
      },
    });

    console.log(`DEBUG: Tìm thấy ${results.length} kết quả`);

    return results;
  } catch (error) {
    console.error("DEBUG: Lỗi khi tìm kiếm lớp học:", error);
    throw error;
  } finally {
    console.log("===== DEBUG: Kết thúc tìm kiếm lớp học =====");
  }
}
