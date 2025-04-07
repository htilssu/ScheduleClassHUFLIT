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
   * Giới hạn số lượng kết quả trả về
   * @default 50
   */
  limit?: number;

  /**
   * Ngày trong tuần
   */
  learningSection?: {
    weekDay: string;
    time: string;
    room: string;
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
  console.log("===== DEBUG: Bắt đầu tìm kiếm lớp học =====");
  console.log("Tham số tìm kiếm:", JSON.stringify(params, null, 2));

  const {
    yearStudyId,
    semesterId,
    classId,
    learningSection,
    lecturerName,
    subjectName,
    limit = 50,
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
        weekDay: learningSection.weekDay,
        ...(learningSection.time && { time: learningSection.time }),
        ...(learningSection.room && { room: learningSection.room }),
      },
    };
    console.log(`DEBUG: Tìm theo lịch học: ${JSON.stringify(learningSection)}`);
  }

  // Xử lý điều kiện tìm kiếm cho giảng viên
  if (lecturerName) {
    where.Lecturer = {
      name: Array.isArray(lecturerName)
        ? { in: lecturerName }
        : { contains: lecturerName, mode: "insensitive" },
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

  console.log(
    "DEBUG: Câu truy vấn Prisma:",
    JSON.stringify({ where, limit }, null, 2)
  );

  try {
    const results = await prisma.class.findMany({
      where,
      include: {
        Subject: true,
        Lecturer: true,
      },
      take: limit,
    });

    console.log(`DEBUG: Tìm thấy ${results.length} kết quả`);

    if (process.env.NODE_ENV === "development" && results.length > 0) {
      console.log(
        `DEBUG: Mẫu kết quả đầu tiên: ${JSON.stringify(results[0], null, 2)}`
      );
    }

    return results;
  } catch (error) {
    console.error("DEBUG: Lỗi khi tìm kiếm lớp học:", error);
    throw error;
  } finally {
    console.log("===== DEBUG: Kết thúc tìm kiếm lớp học =====");
  }
}
