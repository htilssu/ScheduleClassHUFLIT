import {
  FunctionCall,
  FunctionDeclaration,
  SchemaType,
} from "@google/generative-ai";
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
    if (name === "getClassByFilter") {
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

export const availableFunctions: FunctionDeclaration[] = [
  {
    name: "getClassByFilter",
    description: "Lấy danh sách lớp học theo các tiêu chí được cung cấp",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        learningSection: {
          type: SchemaType.OBJECT,
          description: "Mã tiết học",
          properties: {
            weekDay: {
              type: SchemaType.ARRAY,
              description: "Ngày trong tuần",
              items: {
                type: SchemaType.STRING,
                description: "Ngày trong tuần giá trị là 2, 3, 4, 5, 6, 7",
              },
            },
          },
        },
        subjectId: {
          type: SchemaType.STRING,
          description: "Mã môn học",
        },
        subjectName: {
          type: SchemaType.STRING,
          description: "Tên môn học",
        },
        lectureName: {
          type: SchemaType.STRING,
          description: "Tên giảng viên hoặc một phần tên giảng viên",
        },
      },
    },
  },
];
