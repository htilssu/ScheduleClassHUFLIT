import { FunctionCall } from "@google/generative-ai";
import { getClassesByFilter, GetClassesParams } from "../service/class";

/**
 * Xử lý function call từ AI
 * @param functionCall - Đối tượng function call từ AI
 * @returns Promise<any> - Kết quả từ function đã gọi
 */
export async function handleFunctionCall(
  functionCall: Omit<FunctionCall, "args"> & { args: GetClassesParams }
): Promise<ReturnType<typeof getClassesByFilter>> {
  try {
    const { name, args } = functionCall;

    // Kiểm tra loại function và gọi hàm tương ứng
    if (name === "getClassInfo") {
      const {
        learningSection,
        subjectId,
        subjectName,
        yearStudyId,
        semesterId,
        limit,
      } = args;

      // Gọi service để lấy dữ liệu từ database
      const classes = await getClassesByFilter({
        yearStudyId,
        semesterId,
        learningSection,
        subjectId,
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
