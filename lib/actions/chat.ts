"use server";

import { generateChatResponse } from "@/lib/ai/chat";
import { ClassData } from "@/lib/types";
import { ScheduleResponse } from "../ai/chat-regular";
import { ChatMessage } from "../types/chat";

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
 * Xử lý tin nhắn chat từ người dùng
 * @param message - Tin nhắn từ người dùng
 * @param chatHistory - Lịch sử chat trước đó
 * @returns Promise<{response: string, classes?: any[]}> - Phản hồi từ AI và dữ liệu lớp học nếu có
 */
export async function processChat(
  message: string,
  chatHistory: ChatMessage[] = []
): Promise<{
  reply: string | ScheduleResponse;
  success: boolean;
  error?: string;
}> {
  try {
    // Gọi generateChatResponse - sẽ tự động chuyển qua generateScheduleResponse nếu cần
    const aiResponse = await generateChatResponse(message, chatHistory);

    return { reply: aiResponse, success: true };
  } catch (error: any) {
    console.error("Lỗi khi xử lý chat:", error);
    return {
      reply:
        "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
      success: false,
      error: error.message,
    };
  }
}
