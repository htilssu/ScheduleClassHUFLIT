"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Component hỗ trợ chạy script tạo tài liệu Swagger
 * @returns {JSX.Element} - React component
 */
export function GenerateDocsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /**
   * Xử lý việc tạo tài liệu Swagger
   */
  const handleGenerateDocs = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/generate-docs", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Error generating docs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateDocs}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Đang tạo..." : "Cập nhật tài liệu API"}
    </button>
  );
}
