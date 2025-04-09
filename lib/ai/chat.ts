/**
 * Module xử lý chat với Google Generative AI
 * Re-exports từ các module tách biệt
 */

import { Content, FunctionCallingMode } from "@google/generative-ai";
import ai, {
  convertToGenerativeAIMessage,
  getDefaultGenerationConfig,
  MODEL_NAME,
} from ".";

import { availableFunctions, handleFunctionCall } from "./function-calling";
import { ChatMessage, ChatRole, ClassData } from "../types";
import { getScheduleSystemInstruction } from "./chat-utils";
export function createModel() {
  return ai.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      ...getDefaultGenerationConfig(),
    },
    tools: [
      {
        functionDeclarations: availableFunctions,
      },
    ],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingMode.AUTO,
      },
    },
    systemInstruction: getScheduleSystemInstruction(),
  });
}

/**
 * Phân tích message để xác định yêu cầu về thời gian trong ngày (buổi sáng/chiều/tối)
 * @param message Tin nhắn của người dùng
 * @returns Buổi học được yêu cầu hoặc undefined nếu không có
 */
function detectTimeOfDay(message: string): string | undefined {
  const lowerMessage = message.toLowerCase();

  // Kiểm tra từ khóa về buổi học
  if (
    lowerMessage.includes("buổi sáng") ||
    lowerMessage.includes("sáng") ||
    lowerMessage.includes("tiết sáng") ||
    lowerMessage.includes("học sáng")
  ) {
    return "sáng";
  }

  if (
    lowerMessage.includes("buổi chiều") ||
    lowerMessage.includes("chiều") ||
    lowerMessage.includes("tiết chiều") ||
    lowerMessage.includes("học chiều")
  ) {
    return "chiều";
  }

  if (
    lowerMessage.includes("buổi tối") ||
    lowerMessage.includes("tối") ||
    lowerMessage.includes("tiết tối") ||
    lowerMessage.includes("học tối")
  ) {
    return "tối";
  }

  return undefined;
}

export async function generateChatResponse(
  message: string,
  chatHistory: ChatMessage[],
  schedules: string
): Promise<string> {
  const model = createModel();
  let aiChatHistory: Content[] = chatHistory.map((message) =>
    convertToGenerativeAIMessage(message)
  );

  // Thêm message của user vào history
  aiChatHistory.push({
    role: "user",
    parts: [{ text: message }],
  });

  // Bắt đầu chat với history
  const chat = model.startChat({
    history: aiChatHistory,
  });

  // Phân tích yêu cầu về thời gian trong ngày
  const timeOfDay = detectTimeOfDay(message);

  // Bổ sung thông tin về thời gian trong ngày vào tin nhắn nếu có
  let messageToSend = message;
  if (timeOfDay) {
    console.log(`Phát hiện yêu cầu về buổi học: ${timeOfDay}`);
    messageToSend = `${message}`;
  }

  // Gửi message
  const result = await chat.sendMessage(messageToSend);

  // Kiểm tra function calls
  const functionCalls = result.response.functionCalls();
  if (functionCalls && functionCalls.length > 0) {
    // Xử lý từng function call và thêm response
    for (const call of functionCalls) {
      try {
        // Bổ sung timeOfDay vào tham số của function call nếu được phát hiện
        // và nếu trong args chưa có timeOfDay
        if (timeOfDay && call.name === "getClassByFilter") {
          // Sử dụng any để có thể thêm thuộc tính động
          const args = call.args as any;
          if (!args.timeOfDay) {
            args.timeOfDay = timeOfDay;
          }
        }

        const functionResult = await handleFunctionCall(call);

        // Thêm function response vào history
        aiChatHistory.push({
          role: "function",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: { result: functionResult },
              },
            },
          ],
        });
      } catch (error) {
        console.error(`Error handling function call ${call.name}:`, error);
      }
    }

    // Tạo chat mới với history đã cập nhật
    const updatedChat = model.startChat({
      history: aiChatHistory,
    });

    // Gửi lại message để có được phản hồi
    try {
      const finalResult = await updatedChat.sendMessage("");
      return finalResult.response.text();
    } catch (error) {
      console.error("Error getting final response:", error);
      return "Có lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại.";
    }
  }

  // Trả về text response nếu không có function calls
  return result.response.text();
}
