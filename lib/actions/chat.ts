"use server";

import { ClassData } from "@/lib/types";
import { ChatMessage } from "../types/chat";
import { encode } from "gpt-tokenizer";
import { generateChatResponse } from "@/lib/ai/chat";

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
  schedules: ClassData[],
  chatHistory: ChatMessage[] = []
): Promise<{
  reply: string;
  success: boolean;
  error?: string;
}> {
  try {
    // Tính số token của message
    const messageTokens = encode(message).length;
    const MAX_TOKENS = 2000;

    if (messageTokens > MAX_TOKENS) {
      return {
        reply: "",
        success: false,
        error: "Tin nhắn của bạn quá dài.",
      };
    }

    const aiResponse = await generateChatResponse(
      message,
      chatHistory,
      JSON.stringify(schedules)
    );
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
