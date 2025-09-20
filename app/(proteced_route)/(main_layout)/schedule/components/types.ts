/**
 * Định nghĩa kiểu dữ liệu cho một Lịch học (Timeline).
 */
export interface Timeline {
  id: string;
  name: string;
  description?: string;
  userId: string;
  classes?: string;
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}
