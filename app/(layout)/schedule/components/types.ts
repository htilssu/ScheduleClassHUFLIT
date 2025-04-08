/**
 * Định nghĩa kiểu dữ liệu cho một Lịch học (Timeline).
 */
export interface Timeline {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
