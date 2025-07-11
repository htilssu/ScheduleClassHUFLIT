import { ChatMessage } from "@/lib/types/chat";
/**
 * Module xử lý chat thông thường với Google Generative AI
 */
import { FunctionCallingMode } from "@google/generative-ai";
import { availableFunctions, generateScheduleResponse } from "./chat-schedule";
import {
  convertToGenerativeAIMessage,
  getDefaultGenerationConfig,
  getSystemInstruction,
  limitChatHistory,
} from "./chat-utils";
import { handleFunctionCall } from "./function-calling";
import ai from "./index";
// Lấy model name từ biến môi trường hoặc sử dụng giá trị mặc định
const defaultModel = process.env.AI_MODEL_NAME || "gemini-pro";

export type ScheduleResponse = {
  response: string;
  schedules: {
    explanation: string;
    classes: string[];
  }[];
};

/**
 * Xử lý chat thông thường với Google Generative AI (không sử dụng function calling)
 * @param currentMessage - Tin nhắn hiện tại của người dùng
 * @param history - Lịch sử chat trước đó
 * @param modelName - Tên model AI (mặc định: từ biến môi trường hoặc "gemini-pro")
 * @returns Promise<string | ReturnType<typeof generateScheduleResponse>> - Phản hồi text từ AI hoặc function call
 */
export async function generateChatResponse(
  currentMessage: string,
  history: ChatMessage[] = [],
  schedules: string,
  modelName: string = defaultModel
): Promise<string | ScheduleResponse> {
  try {
    const limitedHistory = limitChatHistory(history);

    // Tạo model với cấu hình mặc định (có function calling)
    const model = ai.getGenerativeModel({
      model: modelName,
      generationConfig: getDefaultGenerationConfig(),
      tools: [
        {
          functionDeclarations: availableFunctions,
        },
      ],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingMode.ANY,
        },
      },
      systemInstruction: getSystemInstruction(),
    });

    // Tạo chat session
    const chat = model.startChat({
      history: limitedHistory.map(convertToGenerativeAIMessage),
    });

    // Gửi tin nhắn và lấy kết quả
    console.log("currentMessage", currentMessage);
    const result = await chat.sendMessage(`
      LỊCH HỌC HIỆN TẠI CỦA NGƯỜI DÙNG: ${schedules}
      CÂU HỎI CỦA NGƯỜI DÙNG: ${currentMessage}
      `);

    //check function call
    const functionCalls = result.response?.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      if (process.env.NODE_ENV === "development") {
        console.log("=== AI CHAT DEBUG INFO ===");
        console.log("Model:", modelName);
        console.log("Current message:", currentMessage);
        console.log("Using function calling: true");
        console.log("functionCalls", functionCalls);
        console.log("==========================");
      }

      const functionResult = await handleFunctionCall(functionCalls[0]);
      return generateScheduleResponse(currentMessage, functionResult);
    }

    // Debug info
    if (process.env.NODE_ENV === "development") {
      console.log("=== AI CHAT DEBUG INFO ===");
      console.log("Model:", modelName);
      console.log("Current message:", currentMessage);
      console.log("Using function calling: false");
      console.log("==========================");
    }
    return result.response?.text() || "";
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
