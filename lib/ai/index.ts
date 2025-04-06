import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateChatResponse } from "./chat";
import {
  limitChatHistory,
  convertToGenerativeAIMessage,
  getDefaultGenerationConfig,
  containsProhibitedContent,
  containsProhibitedResponse,
} from "./chat-utils";

// Ưu tiên sử dụng LLM_API_KEY, nếu không có thì sử dụng GEMINI_API_KEY
const apiKey = process.env.LLM_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "LLM_API_KEY hoặc GEMINI_API_KEY không được cấu hình trong biến môi trường"
  );
}

/**
 * Biến toàn cục lưu trữ instance của GoogleGenerativeAI
 * Sử dụng biến toàn cục để tránh việc tạo lại instance mới mỗi khi import
 * @type {GoogleGenerativeAI}
 */
const globalAI = global as unknown as { ai?: GoogleGenerativeAI };
const ai = globalAI.ai || (globalAI.ai = new GoogleGenerativeAI(apiKey));

export default ai;

// Export các hàm công khai để sử dụng từ bên ngoài
export {
  generateChatResponse,
  limitChatHistory,
  convertToGenerativeAIMessage,
  getDefaultGenerationConfig,
  containsProhibitedContent,
  containsProhibitedResponse,
};
