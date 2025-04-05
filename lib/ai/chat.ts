/**
 * Module xử lý chat với Google Gemini AI
 */
import ai from "./index";
import { ChatRole, ChatMessage } from "@/app/types/chat";

// Lấy model name từ biến môi trường hoặc sử dụng giá trị mặc định
const defaultModel = process.env.AI_MODEL_NAME || "gemini-pro";

/**
 * Chuyển đổi tin nhắn từ ứng dụng sang định dạng Google Gemini
 * @param message - Tin nhắn từ ứng dụng
 * @returns Object - Tin nhắn định dạng Gemini
 */
function convertToGeminiMessage(message: ChatMessage) {
  // Gemini sử dụng 'user' và 'model', nhưng ứng dụng sử dụng ChatRole enum
  // Nếu là USER thì chuyển thành 'user', còn lại chuyển thành 'model'
  const geminiRole = message.role === ChatRole.USER ? "user" : "model";

  return {
    role: geminiRole,
    parts: [{ text: message.content }],
  };
}

/**
 * Lấy danh sách tin nhắn lịch sử và giới hạn số lượng tin nhắn
 * @param history - Danh sách tin nhắn lịch sử
 * @param maxMessages - Số tin nhắn tối đa cần giữ lại (mặc định là 20)
 * @returns Array - Danh sách tin nhắn đã giới hạn
 */
export function limitChatHistory(
  history: ChatMessage[],
  maxMessages: number = 20
): ChatMessage[] {
  // Nếu lịch sử ít hơn hoặc bằng số tin nhắn tối đa, trả về nguyên danh sách
  if (!history || history.length <= maxMessages) {
    return history || [];
  }

  // Nếu vượt quá, chỉ giữ lại tin nhắn gần đây nhất
  return history.slice(history.length - maxMessages);
}

/**
 * Lấy cấu hình generation mặc định
 * @returns Object - Cấu hình generation mặc định
 */
function getDefaultGenerationConfig() {
  return {
    temperature: parseFloat(process.env.AI_TEMPERATURE || "0.7"),
    topK: parseInt(process.env.AI_TOP_K || "40"),
    topP: parseFloat(process.env.AI_TOP_P || "0.95"),
    maxOutputTokens: parseInt(process.env.AI_MAX_OUTPUT_TOKENS || "2048"),
  };
}

/**
 * Xử lý chat với Gemini AI
 * @param currentMessage - Tin nhắn hiện tại của người dùng
 * @param history - Lịch sử chat trước đó
 * @param modelName - Tên model AI (mặc định: từ biến môi trường hoặc "gemini-pro")
 * @returns Promise<string> - Phản hồi từ AI
 */
export async function generateChatResponse(
  currentMessage: string,
  history: ChatMessage[] = [],
  modelName: string = defaultModel
): Promise<string> {
  try {
    // Giới hạn lịch sử chat (tối đa 20 tin nhắn)
    const limitedHistory = limitChatHistory(history);

    // Tạo model và cấu hình
    const model = ai.getGenerativeModel({
      model: modelName,
      generationConfig: getDefaultGenerationConfig(),
    });

    // Tạo chat session và chuyển đổi tin nhắn sang định dạng Gemini
    const chat = model.startChat({
      history: limitedHistory.map(convertToGeminiMessage),
    });

    // Gửi tin nhắn hiện tại đến model
    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();

    return responseText;
  } catch (error: any) {
    console.error("Lỗi khi gửi tin nhắn đến AI:", error);
    throw new Error(
      error.message || "Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau."
    );
  }
}
