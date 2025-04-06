import { FunctionCall } from "@google/generative-ai";
import { getClassesByFilter } from "../service/class";

/**
 * Xử lý function call từ AI
 * @param functionCall - Đối tượng function call từ AI
 * @returns Promise<any> - Kết quả từ function đã gọi
 */
export async function handleFunctionCall(
  functionCall: FunctionCall
): Promise<ReturnType<typeof getClassesByFilter>> {
  try {
    const { name, args } = functionCall;

    // Kiểm tra loại function và gọi hàm tương ứng
    if (name === "getClassInfo") {
      const {
        yearStudyId,
        semesterId,
        classId,
        lecturerName,
        subjectName,
        limit,
      } = args as any;

      // Gọi service để lấy dữ liệu từ database
      const classes = await getClassesByFilter({
        yearStudyId,
        semesterId,
        classId,
        lecturerName,
        subjectName,
        limit: limit || 50,
      });

      return classes;
    }

    throw new Error(`Function "${name}" không được hỗ trợ.`);
  } catch (error: any) {
    console.error("Lỗi khi xử lý function call:", error);
    throw new Error(`Lỗi khi xử lý function call: ${error.message}`);
  }
}
