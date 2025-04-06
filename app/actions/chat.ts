"use server";

import { ClassData } from "@/lib/types";
import { ChatRole, ChatMessage } from "../../lib/types/chat";
import { revalidatePath } from "next/cache";
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
    const responseText = await generateChatResponse(message, history);

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
