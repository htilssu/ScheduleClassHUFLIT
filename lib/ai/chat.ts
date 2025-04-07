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
        mode: FunctionCallingMode.ANY,
      },
    },
  });
}

export async function generateChatResponse(
  message: string,
  chatHistory: ChatMessage[],
  schedules: string
): Promise<string> {
  const model = createModel();
  const aiChatHistory: Content[] = chatHistory.map((message) =>
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

  // Gửi message
  const result = await chat.sendMessage(message);

  // Kiểm tra function calls
  const functionCalls = result.response.functionCalls();
  if (functionCalls && functionCalls.length > 0) {
    // Xử lý từng function call và thêm response
    for (const call of functionCalls) {
      try {
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
