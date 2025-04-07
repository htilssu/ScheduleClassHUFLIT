/**
 * Module xử lý xếp lịch học với Google Generative AI
 */
import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { ClassData } from "../types";
import {
  containsProhibitedContent,
  getDefaultGenerationConfig,
  getScheduleSystemContext,
} from "./chat-utils";
import ai from "./index";

// Lấy model name từ biến môi trường hoặc sử dụng giá trị mặc định
const defaultModel = process.env.AI_MODEL_NAME || "gemini-pro";

/**
 * Định nghĩa cấu trúc của response khi có function call
 */
export interface ResponseWithFunctionCall {
  text: string | null;
  functionCall: {
    name: string;
    arguments: string; // Chuỗi JSON của các tham số
  };
}

/**
 * Định nghĩa các function có thể gọi từ AI
 */
export const availableFunctions: FunctionDeclaration[] = [
  {
    name: "getClassInfo",
    description: "Lấy thông tin lớp học dựa trên các tiêu chí tìm kiếm",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        yearStudyId: {
          type: SchemaType.STRING,
          description: "Năm học cần tìm (ví dụ: '2023-2024')",
        },
        semesterId: {
          type: SchemaType.STRING,
          description: "Học kỳ cần tìm (ví dụ: 'HK01' hoặc 'HK02')",
        },
        lecturerName: {
          type: SchemaType.STRING,
          description: "Tên hoặc một phần tên của giảng viên",
        },
        learningSection: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              weekDay: {
                type: SchemaType.STRING,
                description: "Ngày trong tuần (ví dụ: 'Thứ 2' hoặc 'Thứ 3')",
              },
              time: {
                type: SchemaType.STRING,
                description: "Tiết học (ví dụ: '1-2' hoặc '3-4')",
              },
              room: {
                type: SchemaType.STRING,
                description: "Phòng học (ví dụ: 'A101' hoặc 'B202')",
              },
            },
          },
        },
        subjectName: {
          type: SchemaType.ARRAY,
          description: "Danh sách tên hoặc một phần tên của môn học",
          items: {
            type: SchemaType.STRING,
          },
        },
        subjectId: {
          type: SchemaType.ARRAY,
          description: "Danh sách mã môn học",
          items: {
            type: SchemaType.STRING,
          },
        },
      },
      required: [],
    },
  },
];

/**
 * Xử lý chat với function calling để xếp lịch học
 * @param currentMessage - Tin nhắn hiện tại của người dùng
 * @param history - Lịch sử chat trước đó
 * @param modelName - Tên model AI (mặc định: từ biến môi trường hoặc "gemini-pro")
 * @returns Promise<ResponseWithFunctionCall | string> - Phản hồi từ AI (có thể bao gồm function call)
 */
export async function generateScheduleResponse(
  currentMessage: string,
  classes: ClassData[]
): Promise<string> {
  // ===== BƯỚC 1: LỌC ĐẦU VÀO =====
  if (containsProhibitedContent(currentMessage)) {
    return "Xin lỗi bạn, tôi chỉ có thể trả lời các câu hỏi liên quan đến lịch học, thời khóa biểu, môn học, giáo viên và các vấn đề học tập tại HUFLIT. Vui lòng đặt câu hỏi liên quan đến những chủ đề này.";
  }

  try {
    // Tạo model với cấu hình function calling
    const model = ai.getGenerativeModel({
      model: defaultModel,
      generationConfig: {
        ...getDefaultGenerationConfig(),
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              explanation: {
                type: SchemaType.STRING,
                description: "Giải thích về lịch học được đề xuất",
              },
              classesId: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                  description: "",
                },
              },
            },
          },
        },
      },
      systemInstruction: getScheduleSystemContext(),
    });

    // Debug info
    if (process.env.NODE_ENV === "development") {
      console.log("=== AI SCHEDULE DEBUG INFO ===");
      console.log("Model:", defaultModel);
      console.log("Current message:", currentMessage);
      console.log("Using function calling: true");
      console.log("==============================");
    }

    // Tạo chat session
    const chat = model.startChat();

    // Gửi tin nhắn và lấy kết quả
    const result = await chat.sendMessage(`
      YÊU CẦU NGƯỜI DÙNG CUNG CẤP:
      ${currentMessage}

      DANH SÁCH LỚP HỌC:
      ${JSON.stringify(classes, null, 2)}
      `);

    // Nếu không có function call, trả về text response
    const responseContent = result.response?.text() || "";

    return responseContent;
  } catch (error: any) {
    console.error("Lỗi khi gửi tin nhắn đến AI:", error);
    if (error.message?.includes("Candidate was blocked due to safety")) {
      return "Yêu cầu của bạn không thể được xử lý vì lý do an toàn nội dung.";
    }
    throw new Error(
      error.message || "Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau."
    );
  }
}
