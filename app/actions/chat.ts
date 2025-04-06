"use server";

import { ClassData } from "@/lib/types";
import { ChatRole, ChatMessage } from "../../lib/types/chat";
import { revalidatePath } from "next/cache";
import { generateChatResponse } from "@/lib/ai/chat";
import { getClassesByFilter } from "@/lib/service/class";

/**
 * Kết quả trả về từ quá trình xử lý chat
 * @property success - Trạng thái thành công
 * @property reply - Tin nhắn phản hồi từ bot
 * @property error - Thông báo lỗi (nếu có)
 */
export interface ChatResponse {
  success: boolean;
  reply?: ChatMessage;
  classes?: ClassData[];
  error?: string;
}

/**
 * Đối tượng mô tả cấu trúc function call từ AI
 */
interface FunctionCall {
  name: string;
  arguments: string;
}

/**
 * Cấu trúc phản hồi từ AI khi có function call
 */
interface AIChatResponseWithFunctionCall {
  text: string | null;
  functionCall: FunctionCall;
}

/**
 * Xử lý function call từ AI
 * @param functionCall - Thông tin function call
 * @returns Promise<ClassData[]> - Kết quả lớp học tìm được
 */
async function handleFunctionCall(
  functionCall: FunctionCall
): Promise<ClassData[]> {
  try {
    const { name, arguments: argsString } = functionCall;
    const args = JSON.parse(argsString);

    if (name === "getClassInfo") {
      // Gọi hàm lấy thông tin lớp học
      return await getClassesByFilter({
        yearStudyId: args.yearStudyId,
        semesterId: args.semesterId,
        classId: args.classId,
        lecturerName: args.lecturerName,
        subjectName: args.subjectName,
        limit: args.limit || 50,
      });
    }

    return [];
  } catch (error) {
    console.error("Lỗi khi xử lý function call:", error);
    return [];
  }
}

/**
 * Xử lý tin nhắn chat từ người dùng và trả về phản hồi
 * @param message - Nội dung tin nhắn từ người dùng
 * @param history - Lịch sử chat (tối đa 5 tin nhắn gần nhất sẽ được sử dụng)
 * @returns ChatResponse - Kết quả xử lý tin nhắn
 */
export async function processChat(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Gọi hàm xử lý chat từ lib/ai/chat
    const responseData = await generateChatResponse(message, history);

    let responseText = "";
    let classes: ClassData[] = [];

    // Kiểm tra xem response có phải là object với functionCall không
    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "functionCall" in responseData
    ) {
      const response =
        responseData as unknown as AIChatResponseWithFunctionCall;

      // Xử lý function call
      if (
        response.functionCall &&
        response.functionCall.name === "getClassInfo"
      ) {
        classes = await handleFunctionCall(response.functionCall);
      }

      // Lấy text từ phản hồi nếu có
      responseText = response.text || "Đã tìm thấy thông tin lớp học.";
    } else {
      // Nếu không có function call, responsData là string
      responseText = responseData as string;
    }

    // Tạo phản hồi
    const reply: ChatMessage = {
      content: responseText,
      role: ChatRole.ASSISTANT,
    };

    // Cập nhật UI
    revalidatePath("/schedule");

    return {
      success: true,
      reply,
      classes: classes.length > 0 ? classes : undefined,
    };
  } catch (error: any) {
    console.error("Lỗi xử lý tin nhắn:", error);
    return {
      success: false,
      error:
        error.message ||
        "Có lỗi xảy ra khi xử lý tin nhắn. Vui lòng thử lại sau.",
    };
  }
}
