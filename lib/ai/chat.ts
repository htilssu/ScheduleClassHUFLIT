/**
 * Module xử lý chat với Google Generative AI
 * Re-exports từ các module tách biệt
 */
export { generateChatResponse } from "./chat-regular";
export {
  generateScheduleResponse,
  analyzeAndOptimizeSchedule,
  type ResponseWithFunctionCall,
} from "./chat-schedule";
