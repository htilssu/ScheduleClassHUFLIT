import { ClassData } from "@/lib/types";

/**
 * Hàm xử lý dữ liệu thời gian từ chuỗi thành mảng [start, end]
 * @param timeStr - Chuỗi thời gian cần xử lý (ví dụ: "1-3", "1 đến 3", "1")
 * @returns Mảng [start, end] hoặc null nếu không thể xử lý
 */
export const parseTimeSection = (timeStr: string): [number, number] | null => {
  try {
    // Xử lý nhiều định dạng khác nhau
    const cleanedTimeStr = timeStr.replace(/\s+/g, ""); // Loại bỏ tất cả khoảng trắng

    // Trường hợp có dấu -
    if (cleanedTimeStr.includes("-")) {
      const parts = cleanedTimeStr
        .split("-")
        .map((s) => parseInt(s.trim(), 10));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    }

    // Trường hợp có dấu đến
    if (cleanedTimeStr.includes("đến")) {
      const parts = cleanedTimeStr
        .split("đến")
        .map((s) => parseInt(s.trim(), 10));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
      }
    }

    // Nếu là một số duy nhất (giả sử là một tiết)
    const singleValue = parseInt(cleanedTimeStr, 10);
    if (!isNaN(singleValue)) {
      return [singleValue, singleValue + 1]; // Giả sử kéo dài 1 tiết
    }

    return null;
  } catch (e) {
    console.error("Error parsing time:", timeStr, e);
    return null;
  }
};

/**
 * Hàm kiểm tra xung đột giữa hai khoảng thời gian
 * @param newStart - Thời gian bắt đầu của lớp mới
 * @param newEnd - Thời gian kết thúc của lớp mới
 * @param existingStart - Thời gian bắt đầu của lớp hiện có
 * @param existingEnd - Thời gian kết thúc của lớp hiện có
 * @returns true nếu có xung đột, false nếu không có xung đột
 */
export const hasTimeConflict = (
  newStart: number,
  newEnd: number,
  existingStart: number,
  existingEnd: number
): boolean => {
  return (
    (newStart >= existingStart && newStart < existingEnd) || // Tiết bắt đầu của lớp mới nằm trong lớp hiện có
    (newEnd > existingStart && newEnd <= existingEnd) || // Tiết kết thúc của lớp mới nằm trong lớp hiện có
    (newStart <= existingStart && newEnd >= existingEnd) // Lớp mới bao trùm lớp hiện có
  );
};

/**
 * Hàm kiểm tra xung đột lịch học giữa lớp mới và các lớp hiện có
 * @param newClass - Lớp học mới cần kiểm tra
 * @param existingClasses - Danh sách các lớp học hiện có
 * @returns Lớp học xung đột hoặc null nếu không có xung đột
 */
export const checkScheduleConflict = (
  newClass: ClassData,
  existingClasses: ClassData[]
): ClassData | null => {
  if (!newClass.learningSection || newClass.learningSection.length === 0) {
    return null;
  }

  // Kiểm tra xem subjectId có trùng không (môn học đã tồn tại)
  const existingClassWithSameSubject = existingClasses.find(
    (existingClass) =>
      existingClass.subjectId === newClass.subjectId &&
      existingClass.id !== newClass.id // Bỏ qua nếu là cùng một lớp
  );

  if (existingClassWithSameSubject) {
    return existingClassWithSameSubject;
  }

  for (const existingClass of existingClasses) {
    // Bỏ qua nếu đang so sánh với chính mình
    if (existingClass.id === newClass.id) {
      continue;
    }

    if (
      !existingClass.learningSection ||
      existingClass.learningSection.length === 0
    ) {
      continue;
    }

    // Kiểm tra từng buổi học của lớp mới
    for (const newSection of newClass.learningSection) {
      if (!newSection.weekDay || !newSection.time) {
        continue;
      }

      // Kiểm tra từng buổi học của lớp hiện có
      for (const existingSection of existingClass.learningSection) {
        if (!existingSection.weekDay || !existingSection.time) {
          continue;
        }

        // Chỉ kiểm tra nếu cùng thứ trong tuần
        if (newSection.weekDay === existingSection.weekDay) {
          // Phân tích thời gian
          const newTimeParsed = parseTimeSection(newSection.time);
          const existingTimeParsed = parseTimeSection(existingSection.time);

          if (!newTimeParsed || !existingTimeParsed) {
            continue;
          }

          const [newStart, newEnd] = newTimeParsed;
          const [existingStart, existingEnd] = existingTimeParsed;

          if (hasTimeConflict(newStart, newEnd, existingStart, existingEnd)) {
            return existingClass;
          }
        }
      }
    }
  }

  return null;
};
