/**
 * Định nghĩa kiểu dữ liệu cho tin nhắn chat
 */

/**
 * Enum định nghĩa các vai trò người tham gia chat
 * @property USER - Người dùng
 * @property SYSTEM - Hệ thống
 * @property ASSISTANT - Trợ lý AI
 */
export enum ChatRole {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

/**
 * Interface định nghĩa cấu trúc một tin nhắn chat
 * @property id - ID duy nhất của tin nhắn
 * @property content - Nội dung của tin nhắn
 * @property role - Vai trò của người gửi tin nhắn
 * @property createdAt - Thời điểm tin nhắn được tạo
 * @property updatedAt - Thời điểm tin nhắn được cập nhật
 */
export interface ChatMessage {
  content: string;
  role: ChatRole;
}
